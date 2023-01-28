// A component representing a single slider or knob
// It exports a function that can be called to update its value (via MIDI)
// And has a passed-in function it calls whenever its value changes
//
// We do need to attach it to the DOM in order to attach event handlers
// so there's an optional ID to not attach it to document

export default function inputComponent(
  channel: number,
  send: (name: string, calculatedValue: number) => void,
  parentSelector: string = "body"
): (number) => void {
  let raw: number = -1;
  let computed: number = -1;
  let name: string = `channel ${channel}`;

  const el = document.createElement("div");
  el.id = `input-${channel}`;
  el.className = "component";

  el.innerHTML = `
<h2>${channel}</h2>
<div>
  <label for="name-${channel}">Key:</label>
  <input id="name-${channel}" /><br/>

  <label for="min-${channel}">Min:</label>
  <input id="min-${channel}" /><br/>

  <label for="max-${channel}">Max:</label>
  <input id="max-${channel}" /><br/>

  <h3 id="raw-${channel}">1.0</h3>
  <h3 id="computed-${channel}">263</h3>

</div>
`;
  document.querySelector(parentSelector)?.appendChild(el);

  const updateDisplay = () => {
    document.getElementById(`raw-${channel}`)!.innerText = "" + raw;
    document.getElementById(`computed-${channel}`)!.innerText = "" + computed;
  };

  const compute = () => {
    const min = parseFloat(
      (document.getElementById(`min-${channel}`) as HTMLInputElement).value
    );
    const max = parseFloat(
      (document.getElementById(`max-${channel}`) as HTMLInputElement).value
    );

    name = (document.getElementById(`name-${channel}`) as HTMLInputElement)
      .value;

    computed = min + raw * (max - min);

    return computed;
  };

  return function (newRawValue: number) {
    raw = newRawValue;
    compute();
    updateDisplay();
    send(name, computed);
  };
}
