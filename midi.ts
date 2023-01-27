import { WebMidi } from "webmidi";

export default function () {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));

  // Function triggered when WEBMIDI.js is ready
  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      document.body.innerHTML += "No device detected.";
    } else {
      WebMidi.inputs.forEach((device, index) => {
        document.body.innerHTML += `${index}: ${device.name} <br>`;
      });
    }

    const mySynth = WebMidi.inputs[0];
    // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")

    mySynth.channels[1].addListener("controlchange", (e) => {
      const input = e.controller.number;
      const value = e.value;
      document.body.innerHTML += `${input}: ${value} <br/>`;
    });
  }
}
