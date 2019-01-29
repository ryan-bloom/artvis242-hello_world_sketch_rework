/*Base functions - setup runs once, draw is continuous*/
let tree1;
let tree2;
let tree3;
let tree4; 
let tree5;
let goggles;
let mountain;
let trees = [];
let treesDisp = [];
let snowflakes = []; // array to hold snowflake objects

function preload(){
    for(var i=1; i<6; i++){
        var temp = "tree" + i.toString();
        temp = loadImage('images/' + temp + '.png');
        trees.push(temp);
    }
    mountain = loadImage('images/mountain.jpg');
    goggles = loadImage('images/ski_goggles.png');
}

function setup(){
    createCanvas(800, 800);
}

function draw(){
    background(87, 165, 198);
    imageMode(CENTER);
    image(goggles, mouseX, mouseY, goggles.width/1.5, goggles.height/1.5);
    let t = frameCount/60;
    // create a random number of snowflakes each frame
    for (var i = 0; i < random(5); i++) {
        snowflakes.push(new snowflake()); // append snowflake object
      }
    if(mouseIsPressed){
        for(var i=0; i<random(10); i++){
            snowflakes.push(new snowflake());
        }
    }

    keyPressed();

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        if((flake.posX < mouseX - (goggles.width/3.5))){
            flake.display(); // draw snowflake
        }
        if((flake.posX > mouseX + (goggles.width/3.5))){
            flake.display();
        }
        if((flake.posY<mouseY-(goggles.height/3.5))){
            flake.display();
        }
        if((flake.posY>mouseY+(goggles.height/3.5))){
            flake.display();
        }
    }
}

function keyPressed() {
    if(keyCode == LEFT_ARROW) {
        image(mountain, 400, 400, 800, 800);
    }
}

// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    if(mouseIsPressed){
        this.size = random(8, 12);
    }
    else{
        this.size = random(3, 8);
    }
  
    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    if(mouseIsPressed){
        this.radius = sqrt(random(pow(width, 2)));
    }
    else{
        this.radius = sqrt(random(pow(width / 2, 2)));
    }
  
    this.update = function(time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = width / 2 + this.radius * sin(angle);
  
      // different size snowflakes fall at slightly different y speeds
      this.posY += pow(this.size, 0.5) + (mouseY*0.01);
  
      // delete snowflake if past end of screen
      if (this.posY > height) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.display = function() {
        if(mouseIsPressed){
            fill(random(0, 255), random(0, 255), random(0,255));
        }
        else{
            fill(240);
        }
        noStroke();
        ellipse(this.posX, this.posY, this.size);
    };
  }
  