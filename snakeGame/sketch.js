var s;
var numFood = 0;
var createFood = 15;
var foodLocations;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	frameRate(10);
	s = new Snake();
	canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function draw() {
	background("black");
	s.update();
	s.show();
	s.death();
	generateFoods();
	drawFoods();
	eat();
}

function keyPressed() {
	if (keyCode === UP_ARROW && (s.xspeed != 0 && s.yspeed != 1)) {
	  s.dir(0, -1);
	} else if (keyCode === DOWN_ARROW && (s.xspeed != 0 && s.yspeed != -1)) {
	  s.dir(0, 1);
	} else if (keyCode === RIGHT_ARROW && (s.xspeed != -1 && s.yspeed != 0)) {
	  s.dir(1, 0);
	} else if (keyCode === LEFT_ARROW && (s.xspeed != 1 && s.yspeed != 0)) {
	  s.dir(-1, 0);
	}
}

function randomLocations(){
	locations = [];
	for (i = 0; i < createFood; i++){
		locations.push([Math.floor(Math.random() * windowWidth / s.gridSize) * s.gridSize,
			Math.floor(Math.random() * windowHeight / s.gridSize) * s.gridSize]);
	}
	return locations;
}

function generateFoods(){
	if (numFood == 0){
		numFood = createFood;
		foodLocations = randomLocations();
	}
}

function drawFoods(){
	console.log(foodLocations);
	foodLocations.forEach(location => {
		fill("green");
		rect(location[0], location[1], s.gridSize, s.gridSize);
	});
}

function removeFood(foodPos){
	foodLocations.forEach(location => {
		if (location[0] == foodPos[0] && location[1] == foodPos[1]){
			delete foodLocations[foodLocations.indexOf(location)];
		}
	});
}

function eat(){
	snakePos = [s.x, s.y];
	foodLocations.forEach(location => {
		if (location[0] == snakePos[0] && location[1] == snakePos[1]){
			lastSnakeBody = s.snakeBody[s.snakeBody.length-1];
			s.snakeBody.push([lastSnakeBody[0]-s.gridSize, lastSnakeBody[1]-s.gridSize]);
			removeFood(location);
			numFood -= 1;
		}
	});
}

