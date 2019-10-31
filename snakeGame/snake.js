function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
    this.yspeed = 0;
    this.gridSize = 10;
    this.snakeBody = [[this.x, this.y]];

	this.update = function(){
        for (i = this.snakeBody.length-1; i >= 1; i--){
            this.snakeBody[i] = this.snakeBody[i-1];
        }

        this.x += this.xspeed * this.gridSize;
        this.y += this.yspeed * this.gridSize;
        this.snakeBody[0] = [this.x, this.y];

        // not allow passing the canvas size
        // parameters : number to constrain, min, max
        this.x = constrain(this.x, 0-this.gridSize, 600);
        this.y = constrain(this.y, 0-this.gridSize, 600);
	};

	this.show = function(){
        fill("white");
        this.snakeBody.forEach(block => {
            rect(block[0], block[1], this.gridSize, this.gridSize);
        });
	};

    this.dir = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    };

    this.death = function(){
        if (this.x >= 600 || this.y >= 600 ||
            this.x < 0 || this.y < 0 || this.hitOwnBody()){
            this.x = 0;
            this.y = 0;
            this.xspeed = 1;
            this.yspeed = 0;
            this.snakeBody = [[this.x, this.y]];
            numFood = 0;
            createFood = 15;
            foodLocations =[];
        }
    };

    this.hitOwnBody = function(){
        for (i = 1; i <= this.snakeBody.length-1; i++){
            if (this.x == this.snakeBody[i][0] &&
                this.y == this.snakeBody[i][1])
                return true;
        }
        return false;
    };

}