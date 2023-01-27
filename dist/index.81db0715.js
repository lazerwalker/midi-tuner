function e(){const e=new WebSocket(`ws://${window.location.host}`);e.addEventListener("open",(n=>{e.send("Hello Server!")})),e.addEventListener("message",(e=>{console.log(e)}))}window.addEventListener("DOMContentLoaded",(()=>{e()}));
//# sourceMappingURL=index.81db0715.js.map
