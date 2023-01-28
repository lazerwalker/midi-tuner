export default function () {
  const ws = new WebSocket(`ws://${window.location.host}`);
  ws.addEventListener("open", (event) => {
    ws.send("Hello Server!");
  });
  ws.addEventListener("message", (event) => {
    console.log(event.data);
  });

  return function send(message: string) {
    ws.send(message);
  };
}
