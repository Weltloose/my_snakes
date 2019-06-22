function Food(){
	this.generate_food = function(){
		while(1){
			this.foodx = floor(random(rows)) * sol;
			this.foody = floor(random(cols)) * sol;
			var temp = floor(random(10));
			if(temp == 0){
				this.color = 'pink';
			}
			else {
				this.color = 'yellow';
			}
			if(maps[this.foody / sol][this.foodx / sol] == 0){
				return;
			}
		}
	}
	this.show = function (){	
		fill(this.color);
		rect(food.foodx, food.foody, sol, sol);
	}

}