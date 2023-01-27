function e(){const e=new WebSocket(`ws://${window.location.host}`);e.addEventListener("open",(n=>{e.send("Hello Server!")})),e.addEventListener("message",(e=>{console.log(e.data)}))}window.addEventListener("DOMContentLoaded",(()=>{e()}));
//# sourceMappingURL=index.b289f3df.js.map
