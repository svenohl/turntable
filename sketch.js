var recording;

var ph;
var ph2;
var maskImage;
var maskImage2;
var bg;
var bg2;
var bg3;
var bg3small;
var bg5;
var bg5small;
var y;
var state;
var speed;
var outspeed;
var myText;

var fillval1;
var fillval2;
 
var bx;
var by;
var boxSize;
var overBox;
var locked;
var xOffset; 
var yOffset; 
var boxnum;
var canvas;

function preload() {
   bg = loadImage("disc1.png");
   bg2 = loadImage("disc1.png");  
   bg3 = loadImage("disc3.jpeg");
   bg3small = loadImage("disc3.jpeg");
   bg5 = loadImage("disc5.png");
   bg5small = loadImage("disc5.png");   
 }

function setup() {
  canvas = createCanvas(1000, 650);
  canvas.drop(gotfile);

  frameRate(60);

  bg.resize(500, 500);
  bg2.resize(80, 80);
  bg3.resize(500, 500);
  bg3small.resize(80, 80);
  bg5.resize(500, 500);
  bg5small.resize(80, 80);

  fillval1 = color(0,200,0,80);
  fillval2 = color(0,200,0);

  boxSize = 80;
  xOffset = 0.0; 
  yOffset = 0.0; 
  state   = 0;
  speed   = 0;
  bx      = 50;
  by      = 50;

  recording = false;
  overBox   = false;
  locked    = false;

  // creat and apply masks
  maskImage = createGraphics(500,500);
  
  // maskImage.beginDraw();
  //maskImage.triangle(30, 480, 256, 30, 480, 480);
  maskImage.ellipse(500/2,500/2,500,500);
  //maskImage.endDraw();
  // apply mask; mask and image needs to be the same size
  bg.mask(maskImage); 
  bg3.mask(maskImage);
  bg5.mask(maskImage); 
  bg3small.mask(maskImage); 
  bg5small.mask(maskImage); 

  maskImage2 = createGraphics(500,500);
  // maskImage.beginDraw();
  //maskImage.triangle(30, 480, 256, 30, 480, 480);
  maskImage2.ellipse(500/2,500/2,500,500);
  //maskImage.endDraw();
  // apply mask; mask and image needs to be the same size  
}

function draw() {  
  background(255,200,50);

  strokeWeight(10);
  stroke(0);
  noFill();  
  rect(0,0,width,height);
  
  
  // some text
  strokeWeight(0.5);
  textFont('Helvetica');
  textSize(24);
  fill(0);  
  outspeed = 60*speed/(2*PI);
  myText = "Speed: " + nf(outspeed,1,2) + " rotations/s";
  text(myText, 700, 30); 

  // small disks
  image(bg2,bx-bg2.width/2,by-bg2.height/2);
  image(bg3small,bx-bg3small.width/2,by+100-bg3small.height/2);
  image(bg5small,bx-bg5small.width/2,by+200-bg5small.height/2);
  if (ph){
    ph.mask(maskImage2);  
    image(ph, 10,310,80,80);      
}
  
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
    
   if(!locked  | boxnum==0){ 
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
   
// rotaing disk
translate(width/2, height/2);
rotate(state);
if(locked==true){
  if(boxnum == 1){
image(bg,  -bg.width/2,-bg.height/2, bg.width/1, bg.height/1);
  } else if(boxnum == 2){
image(bg3,  -bg3.width/2,-bg3.height/2, bg3.width/1, bg3.height/1);    
} else if(boxnum == 3){
image(bg5,  -bg5.width/2,-bg5.height/2, bg5.width/1, bg5.height/1);    
} else if(ph && boxnum==4){  
image(ph,  -250,-250, 500, 500);    
}
 state = state+(speed);
}
    if (recording) {
    saveFrame("frames/frames####.png");
  }

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

// add speed control via keys up and down
function mousePressed() {
    if (mouseX > bx-boxSize/2 && mouseX < bx+boxSize/2 && 
      mouseY > by-boxSize/2 && mouseY < by+boxSize/2) {
    overBox = true; 
    boxnum  = 1;
    locked = true;
    speed = 0;
    } else   if (mouseX > bx-boxSize/2 && mouseX < bx+boxSize/2 && 
      mouseY > by+100-boxSize/2 && mouseY < by+100+boxSize/2) {
    overBox = true; 
    boxnum  = 2;
    locked = true;   
    speed = 0;
  } else   if (mouseX > bx-boxSize/2 && mouseX < bx+boxSize/2 && 
      mouseY > by+200-boxSize/2 && mouseY < by+200+boxSize/2) {
    overBox = true; 
    boxnum  = 3;
    locked = true;   
    speed = 0;
  } else   if (mouseX > bx-boxSize/2 && mouseX < bx+boxSize/2 && 
      mouseY > by+300-boxSize/2 && mouseY < by+300+boxSize/2) {
    overBox = true; 
    boxnum  = 4;
    locked = true;   
    speed = 0;    
  } else   if (mouseX > 800 && mouseX < 1000 && 
      mouseY > 450 && mouseY < 650 && locked) {
    overBox = true; 
    locked = true;   
    speed = speed + 0.1;  }
  else {
   locked = false;
   speed = 0;
  }
  //xOffset = mouseX-bx; 
  //yOffset = mouseY-by; 
}

function mouseDragged() {
  if(locked) {
    //bx = mouseX-xOffset; 
    //by = mouseY-yOffset; 
  }
}

function mouseReleased() {
  //locked = false;
}

function gotfile(file){
ph = loadImage(file.data);
}