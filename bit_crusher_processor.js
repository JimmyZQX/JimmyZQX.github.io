// bit_crusher_processor.js
class Bit_crusher_processor extends AudioWorkletProcessor {
    static get parameterDescriptors() {
        return [{ name: 'bitDepth', defaultValue: 16 }];
    }

    // constructor() { super(); }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];
        const bitDepth = parameters['bitDepth'];

        for (let i = 0; i < input.length; i++) { // loop through each input channel
            for (let j = 0; j < output[i].length; j++) { // loop through the render quantum (audio processing frame)
                output[i][j] = Math.round(input[i][j] * 2 ** (bitDepth - 1)) / 2 ** (bitDepth - 1);
            }
        }
        return true;
    }
}

registerProcessor('bit-crusher-processor', Bit_crusher_processor);