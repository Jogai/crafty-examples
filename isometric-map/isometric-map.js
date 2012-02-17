/**
 * Crafty Examples
 * >> Isometric Map example code
 *
 * This code provides an example of how to use the Crafty.js game library
 * to create an isometric map.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @version 1.0 */
/*globals $, Crafty, console */
$(document).ready(function() {

	var width = 1280, height = 800, spriteSize = 64, iso = Crafty.isometric.size(spriteSize);

	// Create the Crafty context, with a frame rate of 50 ips, and a window size of 130px * 130px
	Crafty.init(width, height);

	/*
	 * Declare sprite resources
	 */
	Crafty.sprite(spriteSize, "../resources/images/map.png", {
		grass0 : [0, 0, 1, 1],
		grass1 : [1, 0, 1, 1],
		grass2 : [2, 0, 1, 1],
		grass3 : [3, 0, 1, 1],
		grass4 : [0, 1, 1, 1],
		grass5 : [1, 1, 1, 1],
		grass6 : [2, 1, 1, 1],
		grass7 : [3, 1, 1, 1],
		grass8 : [0, 2, 1, 1],
		grass9 : [1, 2, 1, 1],
		grass10 : [2, 2, 1, 1],
		grass11 : [3, 2, 1, 1],
		grass12 : [0, 3, 1, 1],
		grass13 : [1, 3, 1, 1],
		grass14 : [2, 3, 1, 1],
		grass15 : [3, 3, 1, 1],
		grass16 : [0, 4, 1, 1],
		grass17 : [1, 4, 1, 1],
		grass18 : [2, 4, 1, 1],
		grass19 : [3, 4, 1, 1],
		grass20 : [0, 5, 1, 1],
		grass21 : [1, 5, 1, 1],
		grass22 : [2, 5, 1, 1],
		grass23 : [3, 5, 1, 1]
	});
	
	/*
	 * Declare visible heights of the vertices for correct mapping
	 * As with css its a clockwise declaration. 1 for hi, 0 for low.  
	 */
	var tileVisuals = [
						[1, 1, 1, 1], 
						[1, 1, 1, 1], 
						[1, 1, 1, 1], 
						[1, 1, 1, 1], 
						[1, 1, 0, 1], 
						[1, 1, 1, 0], 
						[0, 1, 1, 1], 
						[1, 0, 1, 1], 
						[1, 0, 0, 0], 
						[0, 1, 0, 0], 
						[0, 0, 1, 0], 
						[0, 0, 0, 1], 
						[1, 1, 0, 0], 
						[0, 1, 1, 0], 
						[0, 0, 1, 1], 
						[1, 0, 0, 1], 
						[1, 1, 0, 0], 
						[0, 1, 1, 0], 
						[0, 0, 1, 1], 
						[1, 0, 0, 1], 
						[1, 0, 1, 0], 
						[0, 1, 0, 1], 
						[0, 0, 0, 0], 
						[0, 0, 0, 0]
					];

	/*
	 * This multidimensional array will hold the visuals for the whole map.
	 * You can store this per tile, but I dont know how to read it out based on position.
	 */
	var mapArray = [];

	for(var y = 0; y < height / spriteSize * 3; y++) {
		mapArray[y] = [];
		for(var x = 0; x < width / spriteSize - 1; x++) {
			var noMatch = false;
			var tileNumber = 0;

			do {
				noMatch = false; //reset to false to avoid infinite loop and too much elses.
				tileNumber = Crafty.math.randomInt(0, 23);

				//horizontal x-direction matching
				if(x > 0) {
					if(mapArray[y][x-1][1] != tileVisuals[tileNumber][3]) {
						noMatch = true;
					}
				}

				//vertical y-direction matching
				if(y > 1) {
					if(mapArray[y-2][x][2] != tileVisuals[tileNumber][0]) {
						noMatch = true;
					}
				}

				//skip matching if its already clear there is no match and if its the first line(y=0)
				if(!noMatch && y > 0) {
					/* 
					 * On even lines, match to the upper neighbour 3th edge (visuals 3 and 2)
					 */
					if(y % 2 === 0) {

						if(mapArray[y-1][x][3] != tileVisuals[tileNumber][0]) {
							noMatch = true;
						}
						if(mapArray[y-1][x][2] != tileVisuals[tileNumber][1]) {
							noMatch = true;
						}
					}
					/*
					 * On odd lines, do some odd logic. 
					 */					 
					if(y % 2 === 1) {
						if(x === 0 || !mapArray[y-1][x + 1]) {
							if(mapArray[y-1][x][2] != tileVisuals[tileNumber][3]) {
								noMatch = true;
							}
						}
						if(mapArray[y-1][x + 1]) {
							if(mapArray[y-1][x+1][3] != tileVisuals[tileNumber][0]) {
								noMatch = true;
							}
							if(mapArray[y-1][x+1][2] != tileVisuals[tileNumber][1]) {
								noMatch = true;
							}
						}
					}
				}
			} while(noMatch)

			mapArray[y][x] = tileVisuals[tileNumber];

			var tileType = 'grass' + tileNumber;

			var tile = Crafty.e('2D, DOM,' + tileType)
								.addComponent("Mouse")
								.attr("id", String(y) + "-" + String(x))
								.attr("name", tileType)
								.areaMap([32, 16], [64, 32], [32, 48], [0, 32])
								.bind('Click', function() {
									console.log(this.attr("id"));
								this.destroy();
			});
			iso.place(x, y, 0, tile);
		}
	}
});
