let canvas = document.getElementById("canvi");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.innerHeight = 400;
window.innerWidth = 400;

let ctx = canvas.getContext("2d");

function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4)
{
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        seg1: ua >= 0 && ua <= 1,
        seg2: ub >= 0 && ub <= 1
    };
}

function ray(x, y, r, length) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.length = length;
  this.x2 = this.x + Math.cos(this.r) * this.length;
  this.y2 = this.y + Math.sin(this.r) * this.length;
  this.draw = function() {
    
  }
  this.checkIntersect = function(line) {
    ctx.font = "50px Arial";
    ctx.strokeText(line_intersect(this.x, this.y, this.x2, this.y2, line.x, line.y, line.x2, line.y2).x, 100, 80);
    ctx.strokeText(line_intersect(this.x, this.y, this.x2, this.y2, line.x, line.y, line.x2, line.y2).y, 100, 180);
    ctx.strokeText(line_intersect(this.x, this.y, this.x2, this.y2, line.x, line.y, line.x2, line.y2).seg1, 100, 280);
    ctx.strokeText(line_intersect(this.x, this.y, this.x2, this.y2, line.x, line.y, line.x2, line.y2).seg2, 100, 380);
  }
}


setInterval(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(Math.random() * 100, 0, 50, 50);
}, 17);
