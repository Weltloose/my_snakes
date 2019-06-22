
var s1, s2;
var foodx, foody;
var rows, cols;
var tpx, tpy;
var maps;   // for the gird map 
var whole_width;
var whole_height;
var sol;
var mutex;
var pause;
var food;

function setup(){
	whole_width = 400;
	whole_height = 400;
	sol = 40;
	rows = whole_width / sol;
	cols = whole_height / sol;
	mutex = 1;
	pause = 0;
	createCanvas(whole_width, whole_width);
	frameRate(10);
	//Here I first use maps = Array(40).fill(Array(40).fill(0));
	//And this would cause https://segmentfault.com/q/1010000010443463
	maps = Array(rows);
	for(var i = 0; i < rows; i++)
		maps[i] = Array(cols).fill(0);
	s1 = new Snake(sol, 0, 'green', 1);
	maps[0][1] = 1;
	maps[0][0] = 1;
	s2 = new Snake(sol, whole_width - sol, 'blue', 2);
	maps[cols - 1][1] = 2;
	maps[cols - 1][0] = 2;
	food = new Food();
	food.generate_food();
}

function draw(){
	background(51);
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			if(maps[i][j] == -1){
				fill('white');
				rect(j * sol, i * sol, sol, sol);
			}
		}
	}
	food.show();
	s1.cut();
	s2.cut();
	s1.update();
	s2.update();
	s1.show();
	s2.show();
}



function keyPressed (){
	if(keyCode == LEFT_ARROW && !(s1.posx == 1 && s1.posy == 0)){
		if(s1.x / sol == 0) return;
		if(maps[s1.y / sol][s1.x / sol - 1] != 0 && maps[s1.y / sol][s1.x / sol - 1] != s1.self_num) {return;}
		s1.posx = -1;
		s1.posy = 0;
	}
	if(keyCode == RIGHT_ARROW && !(s1.posx == -1 && s1.posy == 0)){
		if(s1.x / sol == cols - 1) return;
		if(maps[s1.y / sol][s1.x / sol + 1] != 0 && maps[s1.y / sol][s1.x / sol + 1] != s1.self_num) {return;}
		s1.posx = 1;
		s1.posy = 0;
	}
	if(keyCode == UP_ARROW && !(s1.posx == 0 && s1.posy == 1)){
		if(s1.y / sol == 0) return;
		if(maps[s1.y / sol - 1][s1.x / sol] != 0 && maps[s1.y / sol - 1][s1.x / sol] != s1.self_num) {return;}
		s1.posx = 0;
		s1.posy = -1;
	}
	if(keyCode == DOWN_ARROW && !(s1.posx == 0 && s1.posy == -1)){
		if(s1.y / sol == rows - 1) return;
		if(maps[s1.y / sol + 1][s1.x / sol] != 0 && maps[s1.y / sol + 1][s1.x / sol] != s1.self_num) {return;}
		s1.posx = 0;
		s1.posy = 1;
	}
	if(keyCode == 190){
		s1.exuviate();
	}
	if(keyCode == 191){
		s1.fire();
	}
	if(keyCode == 65 && !(s2.posx == 1 && s2.posy == 0)){
		if(s2.x / sol == 0) return;
		if(maps[s2.y / sol][s2.x / sol - 1] != 0 && maps[s2.y / sol][s2.x / sol - 1] != s2.self_num) {return;}
		s2.posx = -1;
		s2.posy = 0;
	}
	if(keyCode == 68 && !(s2.posx == -1 && s2.posy == 0)){
		if(s2.x / sol == cols - 1) return;
		if(maps[s2.y / sol][s2.x / sol + 1] != 0 && maps[s2.y / sol][s2.x / sol + 1] != s2.self_num) {return;}
		s2.posx = 1;
		s2.posy = 0;
	}
	if(keyCode == 87 && !(s2.posx == 0 && s2.posy == 1)){
		if(s2.y / sol == 0) return;
		if(maps[s2.y / sol - 1][s2.x / sol] != 0 && maps[s2.y / sol - 1][s2.x / sol] != s2.self_num) {return;}
		s2.posx = 0;
		s2.posy = -1;
	}
	if(keyCode == 83 && !(s2.posx == 0 && s2.posy == -1)){
		if(s2.y / sol == rows - 1) return;
		if(maps[s2.y / sol + 1][s2.x / sol] != 0 && maps[s2.y / sol + 1][s2.x / sol] != s2.self_num) {return;}
		s2.posx = 0;
		s2.posy = 1;
	}
	if(keyCode == 32){
		s2.exuviate();
	}
	if(keyCode == 66){
		s2.fire();
	}
	if(keyCode == ENTER && !pause){
		tpx2 = s2.posx;
		tpy2 = s2.posy;
		tpx1 = s1.posx;
		tpy1 = s1.posy;
		s1.posx = 0;
		s1.posy = 0;
		s1.pause();
		s2.posx = 0;
		s2.posy = 0;
		s2.pause();
		pause = 1;
	}
	else if(keyCode == ENTER && pause){
		s1.posx = tpx1;
		s1.posy = tpy1;
		s1.continue();
		s2.posx = tpx2;
		s2.posy = tpy2;
		s2.continue();
		pause = 0;
	}
}


