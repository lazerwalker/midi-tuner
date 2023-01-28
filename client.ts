import inputComponent from "./inputComponent";
import midi from "./midi";
import websocket from "./websocket";
window.addEventListener("DOMContentLoaded", () => {
  const channelRows = [
    [16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 4, 5, 6, 7],
  ];

  const channelChangers: { [channel: number]: (number) => void } = {};

  const ws = websocket();
  const send = (name: string, value: number) => {
    if (!name || name.length === 0 || isNaN(value)) return;
    ws(`${name}=${value}`);
  };

  channelRows.forEach((i, idx) => {
    const row = document.createElement("div");
    row.id = `row-${idx}`;
    document.body.appendChild(row);

    i.forEach((c) => {
      const fn = inputComponent(c, send, "#" + row.id);
      channelChangers[c] = fn;
    });
  });

  midi((channel, value) => {
    channelChangers[channel](value);
  });
});
