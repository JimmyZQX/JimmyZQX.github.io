"use strict";

const SAMPLE_FOLDER = "string_samples"; // the folder where our samples reside
const SAMPLE_EXTENSION = ".wav"; // the extension of the sample file names
const START_SAMPLE = 60; // the starting sample midi note number (and filename)
const END_SAMPLE = 72; // the ending sample midi note number (and filename)

const FADE_TIME = 0.15; // the time of the convolver fades

let audioContext;
let masterGain;

let analyser; // our analyser node
let bufferLength; // the number of bins
let dataArray; // an array to store bin values

// create an array of sample file names
let sample = [];
for (let i = START_SAMPLE; i <= END_SAMPLE; i++) {
    sample.push(SAMPLE_FOLDER + "/" + i + SAMPLE_EXTENSION);
}

let convolver = []; // a variable to store our Convolver
let response; // a variable to store our impulse response audio file
let arraybuffer; // a variable to store an ArrayBuffer representing our impulse response audio file

let convolverGain = []; // an array of gains for our convolvers to fade in and fade out

let currentConvolverGain; // store the current convolver that is playing
let currentMIDINote; // store the midi note of the current convolver

let mic; // our microphone input
let mic_source; // our microphone input converted to an AudioNode

let findMaxInterval; // a variable to keep track of the looped findMax function

let started = false; // keep track if the javascript sound system has started
let playing = false; // keep track if sound is playing

let start_button = document.getElementById("start_button"); // our start button
let bin = document.getElementById("bin_num_label"); // our bin index label
let bin_freq = document.getElementById("bin_freq_label"); // our bin frequency label
let bin_midi_note = document.getElementById("bin_midi_note"); // our bin midi note label
let bin_amp = document.getElementById("bin_amp_label"); // our bin ampplitude label


// do this when the start button is clicked
start_button.onclick = async function() {

    // if the sound system is not started, start the carrier and modulator osciallators
    if (!started) {
        audioContext = new AudioContext(); // create an audio context to host our sound making

        masterGain = audioContext.createGain(); // create a gain to sum all the filters
        masterGain.gain.value = .5; // set the output gain

        // try to get the user audio input or else print an error
        try {
            mic = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); // get the user audio input
        } catch (e) {
            console.log(e);
        }

        mic_source = audioContext.createMediaStreamSource(mic); // create an AudioNode from our user audio input stream

        for (let i = 0; i < sample.length; i++) {
            convolver.push(audioContext.createConvolver()); // create a Convolver
            response = await fetch(sample[i]); // read audio file that will be our Convolver impulse response
            arraybuffer = await response.arrayBuffer(); // convert the audio file impulse response to an ArrayBuffer
            convolver[i].buffer = await audioContext.decodeAudioData(arraybuffer); // set convolver buffer as the preceding ArrayBuffer

            convolverGain.push(audioContext.createGain()); // create a gain for the convolver
            convolverGain[i].gain.value = 0; // set the gain's level

            mic_source.connect(convolver[i]); // connect the microphone to the convolver
            convolver[i].connect(convolverGain[i]); // connect the convolver to its corresponding gain
            convolverGain[i].connect(masterGain); // connect the gain to the master gain
        }

        analyser = audioContext.createAnalyser(); // create our spectral analyser
        analyser.fftSize = 4096; // set the FFT size for the analyser

        bufferLength = analyser.frequencyBinCount; // get the number of bins that our analyser will return
        dataArray = new Float32Array(bufferLength); // create a float array to store our bin values

        mic_source.connect(analyser); // Connect the source to be analysed
        analyser.connect(masterGain); // connect oscillator to output

        started = true; // keep track that the sound system has started
    }

    // if we are starting playback
    if (!playing) {
        masterGain.connect(audioContext.destination); // connect the gain to audio output
        findMaxInterval = setInterval(() => { findMax() }); // start looping the findMax function
        playing = true; // keep track that we are playing
        start_button.value = "Stop"; // change our start button label
        start_button.style.backgroundColor = "red"; // change our start button color
    }
    // otherwise we are stopping playback
    else {
        masterGain.disconnect(audioContext.destination); // disconnect analyser from output
        clearInterval(findMaxInterval); // stop looping the findMax function
        playing = false; // keep track that we are not playing
        start_button.value = "Start"; // change our start button label
        start_button.style.backgroundColor = "green"; // change our start button color
    }
};


async function findMax() {
    await wait(analyser.fftSize / audioContext.sampleRate * 1000); // wait for one window of time to pass

    analyser.getFloatFrequencyData(dataArray); // perform the FFT and get bin values

    let max_bin_amp = [dataArray[0], dataArray[1], dataArray[2], dataArray[3], dataArray[4]]; // set the max bin amp to the first bin
    let max_bin_num = [0, 1, 2, 3, 4]; // set the max bin num to the first bin

    // insertion sort max_bin_amp and corresponding max_bin_num
    for (let i = 1; i < 5; i++) {
        let key = max_bin_amp[i];

        let j = i - 1;
        while (j >= 0 && max_bin_amp[j] > key) {
            max_bin_amp[j+1] = max_bin_amp[j];
            max_bin_num[j+1] = max_bin_num[j];
            j = j - 1;
        }
        max_bin_amp[j+1] = key;
        max_bin_num[j+1] = i;
    }

    // loop through all the bins to find the bin that can be inserted to max_bin_amp
    for (let i = 5; i < bufferLength; i++) {
        for (let j = 4; j >= 0; j--) { // iterate through max bin array from largest to smallest
            if (dataArray[i] >= max_bin_amp[j]) { // if the new number is larger than current number
                max_bin_amp.splice(j+1, 0, dataArray[i]); // insert new number behind current number
                max_bin_amp.shift(); // remove the smallest element from the array
                max_bin_num.splice(j+1, 0, i); // insert new number's index at the same location in index array
                max_bin_num.shift(); // remove the index of the smallest element from the index array
                break; // jump out of the loop after inserting
            }
        }
    }

    let lowest_frequency = Number.MAX_VALUE; // lowest frequency in the list
    let max_bin_freq = []; // all the frequencies in the list

    for (let i = 0; i < 5; i++) { // iterate through all elements in the list
        let frequency = audioContext.sampleRate / 2 / bufferLength * max_bin_num[i]; // calculate the frequency of the element
        if (frequency < lowest_frequency) {
            lowest_frequency = frequency; // keep track of the lowest frequency
        }
        max_bin_freq.push(frequency); // add the frequency to the list
    }

    let frequencyCenter = true;

    for (let i = 0; i < 5; i++) { // iterate through all the elements in the frequency list
        // if the other frequency with a margin of error of quarter tone is not divisible by the lowest frequency, this is not the frequency center
        let upper_quarter = max_bin_freq[i] * (2 ** (1.0 / 24));
        let lower_quarter = max_bin_freq[i] / (2 ** (1.0 / 24));
        let upper_bound = upper_quarter / lowest_frequency;
        if (!(Math.ceil(lower_quarter) < upper_bound)) {
            frequencyCenter = false;
        }
    }

    let midi_note;
    if (frequencyCenter == true) { // if we found the frequency center by the previous method
        midi_note = Math.round((12 * Math.log(lowest_frequency / 220.0) / Math.log(2.0) ) + 57.01); // convert that frequency to MIDI note
    }
    else {
        midi_note = Math.round((12 * Math.log(max_bin_freq[4] / 220.0) / Math.log(2.0) ) + 57.01); // convert frequency with largest amplitude to MIDI note
    }

    // update the HTML labels
    bin_num_label.innerHTML =  max_bin_num;
    bin_freq_label.innerHTML = max_bin_freq;
    bin_midi_note.innerHTML = midi_note;
    bin_amp_label.innerHTML = max_bin_amp;

    if (max_bin_amp > -50 && midi_note - START_SAMPLE != currentMIDINote && midi_note >= START_SAMPLE && midi_note <= END_SAMPLE) {
        if (currentConvolverGain) {
            // fade out the current convolver
            currentConvolverGain.gain.setValueAtTime(currentConvolverGain.gain.value, audioContext.currentTime);
            currentConvolverGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + FADE_TIME);
        }

        // set the current convolver and midi note
        currentConvolverGain = convolverGain[midi_note - START_SAMPLE];
        currentMIDINote = midi_note - START_SAMPLE;

        // fade in the current convolver
        currentConvolverGain.gain.setValueAtTime(currentConvolverGain.gain.value, audioContext.currentTime);
        currentConvolverGain.gain.linearRampToValueAtTime(.5, audioContext.currentTime + FADE_TIME);
    }
}


const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay)); // a function to wait some amount of time