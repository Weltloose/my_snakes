function Snake(x, y){
	this.x = x;
	this.y = y;
	this.total = 1;
	this.tail = [createVector(this.x - 1, this.y)];
	this.posx = 1;
	this.posy = 0;
	this.pause_temp = [];

	this.show = function (){
		for(var i = 0; i < this.tail.length; i++){
			fill(255);
			rect(this.tail[i].x, this.tail[i].y, 10, 10);	
		}
		fill('red');
		rect(this.x, this.y, 10, 10);
	}

	this.update = function (){
		maps[this.tail[this.tail.length - 1].y / 10][this.tail[this.tail.length - 1].x / 10] = 0;
		for(var i = this.tail.length - 1; i >= 1; i--){
			this.tail[i].x = this.tail[i - 1].x;
			this.tail[i].y = this.tail[i - 1].y;
		}
		this.tail[0].x = this.x;
		this.tail[0].y = this.y;
		this.x += this.posx * 10;
		this.y += this.posy * 10;
		maps[this.y / 10][this.x / 10] = 1;
		if(this.x == foodx && this.y == foody){
			this.total ++ ;
			this.tail.push(createVector(this.tail[this.total - 2].x - this.posx * 10, this.tail[this.total - 2].y - this.posy * 10));
			generate_food();
		}
	}

	this.dead = function(){
		for(var i = 0; i < this.tail.length; i++)
			if(this.x == this.tail[i].x && this.y == this.tail[i].y){
				for(var j = 0; j < this.tail.length; j++){
					maps[this.tail[j].y / 10][this.tail[j].x / 10] = 0;
				}
				this.total = 1;
				this.tail = [createVector(this.x - this.posx * 10, this.y - this.posy * 10)];
				maps[(this.x - this.posx * 10) / 10][(this.y - this.posy * 10) / 10] = 1;
				return;
			}
	}

	this.pause = function(){
		this.pause_temp = this.tail;
	}

	this.continue = function(){
		this.tail = this.pause_temp;
	}

	
}