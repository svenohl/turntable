var recording;

var maskImage;
var bg;
var bg2;
var y;
var state;
var speed;

var fillval1;
var fillval2;
 
var bx;
var by;
var boxSize;
var overBox;
var locked;
var xOffset; 
var yOffset; 

function preload() {
   bg = loadImage("disc1.png");
   bg2 = loadImage("disc1.png");   
 }

function setup() {
  createCanvas(1000, 650);
  frameRate(60);
  //noLoop();
//bg = loadImage("disc1.jpg");
  bg.resize(500, 500);
  bg2.resize(50, 50);

  fillval1 = color(0,200,0,80);
  fillval2 = color(0,200,0);

boxSize = 75;
xOffset = 0.0; 
yOffset = 0.0; 
state = 0;
speed = 0;

recording = false;
overBox = false;
locked = false;

bx = 50;
by=50;
}

function draw() {  
  background(255,200,50);
  strokeWeight(10);
  stroke(0);
  noFill();  
  rect(0,0,width,height);

  // small disks
  image(bg2,bx,by);

    // needle
  strokeWeight(10);
  stroke(0);
  rect(800,100,50,100); 
  line(825,150,825,450);
  line(825,450,725,550);
  
  // turntable
    strokeWeight(5);
    if (speed == 0) {
      fill(fillval1);
      rect(900,600,50,20);
    } else {
      fill(fillval2);
      rect(900,600,50,20);
    }
    
   if(!locked){ 
  // empty player
  strokeWeight(20);
  stroke(0);
  fill(0);
  ellipse(width/2,height/2,500,500);

  strokeWeight(2);
  stroke(255);
  ellipse(width/2,height/2,400,400);
  ellipse(width/2,height/2,300,300);
  ellipse(width/2,height/2,200,200);
  fill(color(255,0,0));
  ellipse(width/2,height/2,100,100);
  fill(127);
  ellipse(width/2,height/2,10,10);  
   }

  // Test if the cursor is over the box 
  if (mouseX > bx-boxSize && mouseX < bx+boxSize && 
      mouseY > by-boxSize && mouseY < by+boxSize) {
    overBox = true;  
    if(!locked) { 
      stroke(255); 
      fill(153);
    } 
  } else {
    stroke(153);
    fill(153);
    overBox = false;
  }
  
  
// rotaing disk
translate(width/2, height/2);
rotate(state);
if(locked==true){
image(bg,  -bg.width/2,-bg.height/2, bg.width/1, bg.height/1);
}
 state = state+(speed);

 //   if (recording) {
 //   saveFrame("frames/frames####.png");
 // }
//image(bg,100,100,500,500);
}


// add speed control via keys up and down
function keyPressed() {
    if (keyCode == UP_ARROW) {
      speed = speed + 0.1;
    } else if (keyCode == DOWN_ARROW) {
      speed = speed - 0.1;
    } else if (keyCode == RIGHT_ARROW) {
      speed = speed + 0.01;
    } else if (keyCode == LEFT_ARROW) {
      speed = speed - 0.01;
    }     

  if (key == '0') {
    speed=0;
  }
  // If we press q, stop demo
  if (key == 'q') {
    exit();
  }
}

function mousePressed() {
  if(overBox) { 
    locked = true; 
    fill(255, 255, 255);
  } else {
    locked = false;
  }
  xOffset = mouseX-bx; 
  yOffset = mouseY-by; 

}

function mouseDragged() {
  if(locked) {
    bx = mouseX-xOffset; 
    by = mouseY-yOffset; 
  }
}

function mouseReleased() {
  //locked = false;
}
