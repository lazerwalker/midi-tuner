import midi from "./midi";
import websocket from "./websocket";
window.addEventListener("DOMContentLoaded", () => {
  websocket();
  midi();
});
