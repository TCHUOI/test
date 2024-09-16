let canvas = document.getElementById("canvi");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.innerHeight = 400;
window.innerWidth = 400;

let ctx = canvas.getContext("2d");


setInterval(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(Math.random() * 100, 0, 50, 50);
}, 17);
