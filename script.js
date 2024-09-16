let canvas = document.getElementById("canvi");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.innerHeight = 400;
window.innerWidth = 400;

let ctx = canvas.getContext("2d");
let rays = [];
let cars = [];

function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4)
{
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) {
        return {
            x: 0,
            y: 0,
            seg1: false,
            seg2: false
        };
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

function ray(x, y, r, length, owner, i) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.owner = owner;
  this.i = i;
  this.length = length;
  this.x2 = this.x + Math.cos(this.r) * this.length;
  this.y2 = this.y + Math.sin(this.r) * this.length;
  this.changePos = function(x, y, r) {
  	this.x = x;
    this.y = y;
    this.r = r;
    this.x2 = this.x + Math.cos(this.r) * this.length;
    this.y2 = this.y + Math.sin(this.r) * this.length;
  }
  this.draw = function() {
    ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x2, this.y2);
	ctx.stroke();
  }
  this.checkIntersect = function(line) {
    ctx.font = "50px Arial";
    let intersection = line_intersect(this.x, this.y, this.x2, this.y2,line.x, line.y, line.x2, line.y2);
    if(intersection.seg1 && intersection.seg2) {
    	ctx.fillRect(intersection.x - 2.5, intersection.y - 2.5, 5, 5);
        if(this.owner !== rays) {
          this.owner.rayInters-=this.i;
        }
    }
  }
  this.checkIntersects = function() {
  	for(let j = 0; j < rays.length; j++) {
    	if(rays[j] !== this) {
            this.checkIntersect(rays[j]);
        }
    }
  }
}

function car(x, y, r) {
	this.x = x;
    this.y = y;
    this.r = r;
    this.aX = 0;
    this.aY = 0;
    this.rayInters = 0;
    this.rays = [];
    this.makeRays = function() {
    	for(let i = 0; i < 31; i++) {
        	let newRay = new ray(this.x, this.y, this.r + (-15.5 + i) * Math.PI/30, 50, this, -15.5 + i);
            rays.push(newRay);
            this.rays.push(newRay);
        }
    }
    this.update = function() {
    	this.x+=Math.cos(this.r);
        this.y+=Math.sin(this.r);
        this.r+=this.rayInters/1000;
        for(let i = 0; i < this.rays.length; i++) {
        	let newR = this.r + (-15.5 + i) * Math.PI/30;
        	this.rays[i].changePos(this.x + Math.cos(newR), this.y + Math.sin(newR), newR);
        }
        this.rayInters = 0;
    }
    this.draw = function() {
    	ctx.fillRect(this.x - 10, this.y - 2.5, 10, 5);
    }
}

for(let i = 0; i < 5; i++) {
	let newCar = new car(canvas.width/4 + Math.random() * canvas.width/2, canvas.height/4 + Math.random() * canvas.height/2, Math.random() * Math.PI * 2);
    newCar.makeRays();
    cars.push(newCar);
}

rays.push(new ray(0, 0, 0, canvas.width, rays, 0));
rays.push(new ray(0, 0, Math.PI/2, canvas.height, rays, 1));
rays.push(new ray(0, canvas.height, 0, canvas.width, rays, 2));
rays.push(new ray(canvas.width, 0, Math.PI/2, canvas.height, rays, 3));
rays.push(new ray(canvas.width/2, 0, Math.PI/2, canvas.height/2 - 100, rays, 3));
rays.push(new ray(canvas.width/2, canvas.height/2 + 50, Math.PI/2, canvas.height/2 - 100, rays, 3));

let framecount = 100;
setInterval(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, Math.random() * 50, 50);
  for(let c = 0; c < cars.length; c++) {
  	cars[c].draw();
    cars[c].update();
  }
  for(let i = 0; i < rays.length; i++) {
    rays[i].draw();
    rays[i].checkIntersects();
  }
  framecount+=1;
}, 17);
