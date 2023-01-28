import { WebMidi } from "webmidi";

export default function (changed: (channel: number, value: number) => void) {
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

    mySynth.channels[1].addListener("controlchange", (e) => {
      // "Channel" is not an accurate term, but shrug
      const channel = e.controller.number;
      const value = e.value;
      changed(channel, value as number);
    });
  }
}
