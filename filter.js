"use strict";

let context;
let audio; // a variable to reference our HTML audio entities
let source; // a variable to reference our HTML audio entity as an AudioNode
let masterGain;
let filter = {};

let started = false;
let playing = false;

let start_button = document.getElementById("start_button"); // our start button
let gain_slider = document.getElementById("gain"); // our gain slider

start_button.onclick = async function() {
	if (!started) {
		context = new AudioContext(); // create our AudioContext

    	masterGain = context.createGain();

		// try to get the user audio input or else print an error
		try {
			audio = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); // get the user audio input
		} catch (e) {
			console.log(e);
		}

		source = context.createMediaStreamSource(audio); // create an AudioNode from our user audio input stream

		// check to see if Web MIDI is supported by the browser
		if (navigator.requestMIDIAccess) {
			console.log('This browser supports WebMIDI!');
		} else {
			console.log('WebMIDI is not supported in this browser.');
			// barf entirely here
		}

		// request access to the MIDI system and run the appropriate function if it does or doesn't
		navigator.requestMIDIAccess()
			.then(onMIDISuccess, onMIDIFailure);

		// setup the MIDI system
		function onMIDISuccess(midiAccess) {
			for (var input of midiAccess.inputs.values()) {
				// msg is an array:
				//      element 0: midi message type (look for 129 for noteOn and 145 for noteOff)
				//    	element 1: midi note
				// 		element 2: velocity
				input.onmidimessage = (msg) => {
					if (msg.data[0] == 144) {	// if note is on
						filter[msg.data[1].toString()] = context.createBiquadFilter(); // create a biquad filter
						filter[msg.data[1].toString()].type = "bandpass"; // set our Biquad filter type to a peaking filter
						filter[msg.data[1].toString()].frequency.value = 440 * (2 ** ((msg.data[1] - 69) / 12)); // set the center frequency of our Biquad peaking filter
						filter[msg.data[1].toString()].Q.value = 100; // set the Q of our Biquad peaking filter

						source.connect(filter[msg.data[1].toString()]); // connect our AudioNode to our Biquad filter
						filter[msg.data[1].toString()].connect(masterGain); // connect our Biquad filter to the masterGain
					}
					else if (msg.data[0] == 128) {	// if note is off
						source.disconnect(filter[msg.data[1].toString()]);
						filter[msg.data[1].toString()].disconnect(masterGain);	// disconnect filter from master gain
						filter.delete(msg.data[1].toString());	// delete the filter
					}

				}
			}
		}

		// what we do if we can't start the MIDI system
		function onMIDIFailure() {
			console.log('Could not access your MIDI devices.');
		}

		started = true; // set that we have initialized our sound setup
	}

	// if we are starting playback
	if (!playing) {
		masterGain.connect(context.destination);
		playing = true; // keep track that we are playing
		start_button.value = "Stop"; // change our start button label
		start_button.style.backgroundColor = "red"; // change our start button color
	}
	// otherwise we are stopping playback
	else {
		masterGain.disconnect(context.destination);
		playing = false; // keep track that we are not playing
		start_button.value = "Start"; // change our start button label
		start_button.style.backgroundColor = "green"; // change our start button color
	}
}

gain_slider.oninput = async function () {
	if (started) {
		masterGain.gain.value = Number(gain_slider.value);
	}
}
