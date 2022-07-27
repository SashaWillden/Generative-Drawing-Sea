/* Sasha Willden
  18/04/2019 */


/*

The goal of this example was to create a relation to all types of 1D, 2D and 3D noise with a realistic theme. On the idea of what we can see is an eye level of the sky, sea level and under the sea.

The moon uses a 2D Perlin Noise to make the moon stand out and shimmer from the black background. The Perlin Noise uses two for loops and is multiplied in the last for loop to scale the difference to shape the Perlin Noise.

For the sea, a 3D Perlin Noise was used to in a blue setting colour, x and y values to according the noise in a loop, vectors, map as well as incrementation.

The stars in the sky were created by global point variables and declared point functions of two points each.

The use of sand had been created for use in a 2D random Particle at the bottom of the sea. It was randomised in an ellipse and was incremented.

A Rock got created in 2D Noise to rigid the edges by a loop and inside the loop was a calculation of sin, cos in radians for the circle and use of a vertex.

It is possible that the program can get improved such as using clouds and more. However, from how small the canvas is of 512 in the width and height feel any more appealing noise or code would ruin the theme and am happy with everything the way it is. 

*/


// Increament values
let yoff = 0.0; //Sea
let xoff = 1.0; //Sea and Sand
let xincrement = 0.01; //Sand

// Noise Details and values etc
let noiseScale = 1.82; //Moon
let pixelScale = 20; //Moon

// Star Points
let d = 70;
let p1 = d;
let p2 = p1 + d;
let p3 = p2 + d;
let p4 = p3 + d;
let p5 = p4 + d;
let p6 = p5 + d;


function setup(){
	createCanvas(512, 512); //Size of Canvas
	background(0, 0, 39); // Background colour
    frameRate(0); // frameRate set to 0
}

function draw(){
    moon() // 2D Moon Perlin Noise
    sea() // 3D Sea Perlin Noise
    stars() // Drawing 1D
    sand() //2D random Particle
    rock() // 2D Perlin Noise
}   

function moon(){
  var numCols = width/pixelScale; //Scale width by pixel
  var numRows = height/pixelScale; //Scale height by pixel

  // For loop for width
  for (var x=0; x < numCols; x++) 
  {   // For loop for height
      for (var y=0; y < numRows; y++) 
      {
      // Noise declared and data processed into noiseVal
      var noiseVal = noise(x * noiseScale, y * noiseScale, frameCount * 0.05);
      //Fills the detail above and colour
      fill(noiseVal*255);
      //Circle of moon
      ellipse(60, 60, 120, 120);
      }
  }
}

function sea(){
  //Shape starts
  beginShape();
    
  // Fill color of the sea    
  fill(color(20, 10, 200,1));
    
  //xoff set to 0
  let xoff = 0;

  // For loop for width by addition 10
  for (let x = 0; x <= width; x += 10) {
    //maps noise of xoff as x and yoff, height, width, location etc.
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);
    //Vertex displays the noise from the map by x and y
    vertex(x, y);
    //Type of noise by x
    xoff += 0.05;
  }
  //Type of noise by y
  yoff += 0.01;
  //Vertex displays the noise of width and height
  vertex(width, height);
  //Vertex displays the noise as 0 for x and height by height
  vertex(0, height);
  //Shape ends
  endShape(CLOSE);
}

function stars(){
  //Colour of stars
  stroke(255);
  //Point p1 to p2 row,col
  point(p1, p2);
  //Point p5 to p1 row,col
  point(p5,p1);
  //Point p1 to p3 row,col
  point(p1,p3);
  //Point p2 to p2 row,col
  point(p2,p2);
  //Point p4 to p3 row,col
  point(p4,p3);
  //Point p3 to p1 row,col
  point(p3, p1);
  //Point p4 to p2 row,col
  point(p4, p2);
  //Point p6 to p3 row,col
  point(p6,p3);


}

function rock(){
  //Location of rock
  translate(width/122, height/1);

  //Shape starts
  beginShape();
    
  //For loop to shape rock by theta and 360 degrees
  for (var theta=0; theta < 360; theta++) 
  {
      //NoiseVal variable equals to calculation of 2 plus sin of radians in theta and again but in cos
      var noiseVal = noise(
        2 + sin(radians(theta)),
        2 + cos(radians(theta))
        );
      //Variable rho equals to 100 plus noiseVal above and times by 50
      var rho = 100 +  noiseVal * 50;
      //Vertex calculation in sin, radians and theta from loop times by rho variable, cos, radians theta and times again by rho
      vertex(sin(radians(theta)) * rho,cos(radians(theta)) * rho );
      //Fills Rock grey
      fill(96,96,96);
      
  }
  //Shape Ends
  endShape();
}

function sand(){
  //Without this fill the whole canvas will be blue
  fill(10, 10);
  // n becomes a random value of 0 and in width
  let n = random(0,width);
  //xoff is incremented
  xoff += xincrement;
  //Fills the sand to orange
  fill(194, 178, 128);
  //Ellipse is a circle from n variable, height /1 of position, width and heigh by size of circle
  ellipse(n, height / 1, 10, 10);
}