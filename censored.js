// censored.js
let button = document.getElementById('button');
let headers = document.getElementsByClassName('header');
let paragraphs = [];
// get a list of HTMLCollection of paragraph0s, paragraph1s, paragraph2s, etc.
for (let i = 0; i < 11; i++) {
    paragraphs.push(document.getElementsByClassName('paragraph'+i));
}
let wiki = document.getElementsByClassName('wiki');
let ps = document.getElementsByClassName('p');

let started = false;
let playing = false;
let audio;
let audioNode;
let audioContext;
let bitCrusherNode;
let gainNode;
let bitDepth = 12;

// once the button is clicked, remove the overlay and enable the scroll bar
button.onclick = async function () {
    // initialize and start the audio engine and make all audio connections
    if (!started) {
        audioContext = new AudioContext(); // create our AudioContext

        await audioContext.audioWorklet.addModule('bit_crusher_processor.js');
        bitCrusherNode = new AudioWorkletNode(audioContext, 'bit-crusher-processor');

        audio = document.getElementById("protest"); // grab the HTML audio entity;
        audio.loop = true; // make it loop itself
        audioNode = audioContext.createMediaElementSource(audio); // convert our HTML audio entitiy into an AudioNode
        gainNode = audioContext.createGain();

        audioNode.connect(bitCrusherNode);
        bitCrusherNode.connect(gainNode);
        gainNode.gain.value = 1;

        started = true; // remember that we have started our audio initialization
    }

    // if not playing, play the sound
    if (!playing) {
        gainNode.connect(audioContext.destination);
        audio.currentTime = 0; // rewind our audio file
        audio.play(); // play our audio file
        playing = true; // keep track that we are playing
    }

    document.body.removeChild(document.getElementById('overlay'));
    document.body.style.overflow = 'visible';
}


let count = 0;
// detect if the page is scrolled near the bottom, if it is, copy the original text and duplicate it to a new page. Censor accordingly
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        if (count === 0) {
            for (let i = 0; i < headers.length; i++) {
                headers[i].innerHTML = 'DO NOT SCROLL DOWN';
            }
        }
        else if (count === 1) {
            for (let i = 0; i < wiki.length; i++) {
                wiki[i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="'+ wiki[i].innerHTML +'"></being-censored>';
            }
        }
        else if (count === 2) {
            for (let i = 0; i < paragraphs[0].length; i++) {
                paragraphs[0][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[0][i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 3) {
            for (let i = 0; i < paragraphs[0].length; i++) {
                paragraphs[1][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[1][i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 4) {
            for (let i = 0; i < paragraphs[0].length; i++) {
                paragraphs[2][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[2][i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 5) {
            for (let i = 0; i < paragraphs[0].length; i++) {
                paragraphs[3][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[3][i].innerHTML + '"></being-censored>';
                paragraphs[4][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[4][i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 6) {
            for (let i = 0; i < paragraphs[0].length; i++) {
                paragraphs[5][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[5][i].innerHTML + '"></being-censored>';
                paragraphs[6][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[6][i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 7) {
            for (let i = 0; i < paragraphs[0].length; i++) {
                paragraphs[7][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[7][i].innerHTML + '"></being-censored>';
                paragraphs[8][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[8][i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 8) {
            for (let i = 0; i < paragraphs[0].length; i++) {
                paragraphs[9][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[9][i].innerHTML + '"></being-censored>';
                paragraphs[10][i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + paragraphs[10][i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 9) {
            for (let i = 0; i < headers.length; i++) {
                headers[i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + headers[i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 10) {
            for (let i = 0; i < ps.length; i++) {
                ps[i].innerHTML =
                    '<being-censored censorship-type="square" censorship-color="" dissapear-on-hover="false" ' +
                    'active-hover="true" censorship-text="' + ps[i].innerHTML + '"></being-censored>';
            }
        }
        else if (count === 11) {
            document.body.style.backgroundColor = 'red';
            audio.pause();
            gainNode.disconnect(audioContext.destination);
        }

        // clone and add the cloned page
        let node = document.getElementById('page'+count);
        let clone = node.cloneNode(true);
        clone.id = 'page'+(count+1);
        document.body.appendChild(clone);
        count += 1;

        // change the value of the bit crusher
        bitCrusherNode.parameters.get('bitDepth').value = (bitDepth - count);
    }
});
