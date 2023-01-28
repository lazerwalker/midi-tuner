export default function () {
  const ws = new WebSocket(`ws://${window.location.host}`);
  ws.addEventListener("open", (event) => {});
  ws.addEventListener("message", (event) => {
    console.log(event.data);
  });

  return function send(message: string) {
    if (ws.readyState === ws.OPEN) ws.send(message);
  };
}
