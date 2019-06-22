function Snake(x, y, col, self_num){
	this.x = x;
	this.y = y;
	this.col = col;
	this.self_num = self_num;
	this.total = 1;
	this.tail = [createVector(this.x - sol, this.y)];
	this.posx = 1;
	this.posy = 0;
	this.loaded = 0;
	this.pause_temp = [];
	this.goal = 0;

	this.show = function (){
		for(var i = 0; i < this.tail.length; i++){
			fill(this.col);
			rect(this.tail[i].x, this.tail[i].y, sol, sol);	
		}
		fill('red');
		rect(this.x, this.y, sol, sol);
	}

	this.update = function (){
		if(this.x + this.posx * sol < 0 || this.x + this.posx * sol >= whole_width || this.y + this.posy * sol < 0 || this.y + this.posy * sol >= whole_height || maps[(this.y + this.posy * sol) / sol][(this.x + this.posx * sol) / sol] != 0){
			return;
		}
		if(this.x + this.posx * sol == food.foodx && this.y + this.posy * sol == food.foody){
			this.tail.push(createVector(this.tail[this.total - 1].x, this.tail[this.total - 1].y));   //this is for appending last point to snake
		}
		maps[this.tail[this.total - 1].y / sol][this.tail[this.total - 1].x / sol] = 0;
		for(var i = this.total - 1; i >= 1; i--){
			this.tail[i].x = this.tail[i - 1].x;
			this.tail[i].y = this.tail[i - 1].y;
		}
		this.tail[0].x = this.x;
		this.tail[0].y = this.y;
		this.x += this.posx * sol;
		this.y += this.posy * sol;
		maps[this.y / sol][this.x / sol] = this.self_num;
		if(this.x == food.foodx && this.y == food.foody){
			this.total ++ ;
			maps[this.tail[this.tail.length - 1].y / sol][this.tail[this.tail.length - 1].x / sol] = this.self_num;
			if(food.color == 'pink'){
				this.loaded = 1;
			}
			food.generate_food();
		}
	}

	this.cut = function(){
		for(var i = 0; i < this.tail.length; i++){
			if((this.x + this.posx * sol == this.tail[i].x) && (this.y + this.posy * sol == this.tail[i].y)){
				for(var j = i; j < this.tail.length; j++){
					maps[this.tail[j].y / sol][this.tail[j].x / sol] = 0;
				}
				this.tail = this.tail.slice(0, i);
				this.total = i;
			}
		}
	}

	this.exuviate = function(){
		for(var i = 1; i < this.tail.length; i++){
			maps[this.tail[i].y / sol][this.tail[i].x / sol] = -1;
		}
		this.tail = this.tail.slice(0, 1);
		this.total = 1;
	}

	this.fire = function() {   //将蛇头所对方向的墙清掉
		if(this.loaded == 0) return;
		if(this.posx == 1 && this.posy == 0){   //此时在往右走
			for(var i = this.x / sol + this.posx; i < cols; i++){
				if(maps[this.y / sol][i] == -1){
					maps[this.y / sol][i] = 0; 
				}
				console.log(1);
			}
		}
		if(this.posx == -1 && this.posy == 0){   //此时在往左走
			for(var i = 0; i < this.x / sol; i++){
				if(maps[this.y / sol][i] == -1){
					maps[this.y / sol][i] = 0; 
				}
				console.log(1);
			}
		}
		if(this.posx == 0 && this.posy == 1){   //此时在往下走
			for(var i = this.y / sol + this.posy; i < rows; i++){
				if(maps[i][this.x / sol] == -1){
					maps[i][this.x / sol] = 0; 
				}
				console.log(1);
			}
		}
		if(this.posx == 0 && this.posy == -1){   //此时在往上走
			for(var i = 0; i < this.y / sol; i++){
				if(maps[i][this.x / sol] == -1){
					maps[i][this.x / sol] = 0; 
				}
				console.log(1);
			}
		}
		this.loaded = 0;
	}

	this.pause = function(){
		this.pause_temp = this.tail;
	}

	this.continue = function(){
		this.tail = this.pause_temp;
	}

	
}