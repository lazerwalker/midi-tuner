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
  const localStorageKey = `component-${channel}`;

  let raw: number = -1;
  let computed: number = -1;
  let name: string = `channel ${channel}`;

  let min: number = 0;
  let max: number = 10;

  const storedJSON = localStorage.getItem(localStorageKey);
  console.log("Fetched", storedJSON);
  if (storedJSON) {
    const storedData = JSON.parse(storedJSON);
    if (storedData) {
      raw = storedData.raw;
      computed = storedData.computed;
      name = storedData.name;
      min = storedData.min;
      max = storedData.max;
    }
  }

  const el = document.createElement("div");
  el.id = `input-${channel}`;
  el.className = "component";

  el.innerHTML = `
  <div class="input">
  <div id="computed-${channel}" class="computed">${computed}</div>
  <div id="raw-${channel}" class="raw">${raw}</div>

  <input id="name-${channel}" value="${name}" class="name"/><br/>

  <label for="min-${channel}" class="num">Min:</label>
  <input id="min-${channel}" value="${min}" class="num"/><br/>

  <label for="max-${channel}" class="num">Max:</label>
  <input id="max-${channel}" value="${max}" class="num" /><br/>

</div>
`;
  document.querySelector(parentSelector)?.appendChild(el);

  function updateDisplay() {
    const rawEl = document.getElementById(`raw-${channel}`)!;
    const rawPercentage = Math.floor(raw * 100);

    rawEl.innerText = "" + raw.toPrecision(5);
    rawEl.style.background = `linear-gradient(90deg, rgba(204,204,204,1) 0%, rgba(204,204,204,1) ${rawPercentage}%, rgba(255,255,255,1) ${rawPercentage}%)`;

    document.getElementById(`computed-${channel}`)!.innerText =
      "" + computed.toPrecision(5);
  }

  function update() {
    compute();
    updateDisplay();
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ raw, computed, name, min, max })
    );
    send(name, computed);
  }

  const compute = () => {
    min = parseFloat(
      (document.getElementById(`min-${channel}`) as HTMLInputElement).value
    );
    max = parseFloat(
      (document.getElementById(`max-${channel}`) as HTMLInputElement).value
    );

    name = (document.getElementById(`name-${channel}`) as HTMLInputElement)
      .value;

    computed = min + raw * (max - min);

    return computed;
  };

  update();

  return function (newRawValue: number) {
    raw = newRawValue;
    update();
  };
}
