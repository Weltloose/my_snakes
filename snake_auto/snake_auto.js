
var s;
var foodx, foody;
var rows, cols;
var tpx, tpy;
var maps;   // for the gird map 

function setup(){
	createCanvas(400, 400);
	frameRate(60);
	maps = new Array(width / 10);
	for(var i = 0; i < width / 10; i++){
		maps[i] = new Array(width / 10).fill(0);
	}
	rows = width / 10;
	cols = height / 10;
	s = new Snake(10, 0);
	maps[0][0] = 1;
	maps[0][1] = 1;
	generate_food();
}

function draw(){
	background(51);
	fill(255, 204, 0);
	rect(foodx, foody, 10, 10);
	A_star(s.x / 10 + s.y / 10 * 40, foodx / 10 + foody / 10 * 40);
	s.update();
	s.dead();
	s.show();
}

function generate_food(){
	while(1){
		foodx = floor(random(rows)) * 10;
		foody = floor(random(cols)) * 10;
		if(maps[foody / 10][foodx / 10] == 0) return;
	}
}

function heuristic_cost_estimate(from, to){
	return Math.sqrt((from / 40 - to / 40) * (from / 40 - to / 40) + (from % 40 - to % 40) * (from % 40 - to % 40));
}

function dist_between(from, to){
	return (Math.abs(from / 40 - to / 40) + Math.abs(from % 40 - to % 40));
}

function A_star(start, goal){
	var dirx = [1, -1, 0, 0];
	var diry = [0, 0, 1, -1];
	var current;
	closedSet = new Set();
	openSet = new Set();
	openSet.add(start);
	cameFrom = new Array(40 * 40).fill(Infinity);
	gScore = new Array(40 * 40).fill(Infinity);
	gScore[start] = 0;
	fScore = new Array(40 * 40).fill(Infinity);
	fScore[start] = heuristic_cost_estimate(start, goal);
	// return;
	var temp = 100;
	while(openSet.size != 0){
		var lowest = Infinity;
		openSet.forEach(function (elem){
			if(lowest > fScore[elem]){
				lowest = fScore[elem];
				current = elem;
			}	
		});
		if(current == goal){	
			while(cameFrom[current] != start){
				current = cameFrom[current];
			}
			s.posx = current % 40 - s.x / 10;
			s.posy = floor(current / 40) - s.y / 10;
			return ;
		}
		openSet.delete(current);
		closedSet.add(current);
		for(var i = 0; i < 4; i++){
			var tx = current % 40 + dirx[i];
			var ty = floor(current / 40) + diry[i];
			if(tx < 0 || tx >= cols || ty < 0 || ty >= rows)
				continue;
			var neighbor = tx + ty * 40;
			if(closedSet.has(neighbor)) continue;
			if(maps[ty][tx] == 1) continue;
			var temp_Score = gScore[current] + dist_between(current, neighbor);
			if(!openSet.has(neighbor))
				openSet.add(neighbor);
			else if(temp_Score >= gScore[neighbor]){
				continue;
			}
			cameFrom[neighbor] = current;
			gScore[neighbor] = temp_Score;
			fScore[neighbor] = gScore[neighbor] + heuristic_cost_estimate(neighbor, goal);
		} 	
	}
}


