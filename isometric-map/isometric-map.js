/**
 * Crafty Examples
 * >> Isometric Map example code
 *
 * This code provides an example of how to use the Crafty.js game library
 * to create an isometric map.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @version 1.0 */
/*globals $, Crafty, console, window */
/*jslint plusplus: true, vars: true, browser: true */


$(document).ready(function () {
    "use strict";
    window.width = 1280;
    window.height = 800;
    window.spriteSize = 64;
    window.iso = Crafty.isometric.size(window.spriteSize);

    /*
     * Declare sprite resources
     */
    Crafty.sprite(window.spriteSize, "../resources/images/map.png", {
        grass0: [0, 0, 1, 1],
        grass1: [1, 0, 1, 1],
        grass2: [2, 0, 1, 1],
        grass3: [3, 0, 1, 1],
        grass4: [0, 1, 1, 1],
        grass5: [1, 1, 1, 1],
        grass6: [2, 1, 1, 1],
        grass7: [3, 1, 1, 1],
        grass8: [0, 2, 1, 1],
        grass9: [1, 2, 1, 1],
        grass10: [2, 2, 1, 1],
        grass11: [3, 2, 1, 1],
        grass12: [0, 3, 1, 1],
        grass13: [1, 3, 1, 1],
        grass14: [2, 3, 1, 1],
        grass15: [3, 3, 1, 1],
        grass16: [0, 4, 1, 1],
        grass17: [1, 4, 1, 1],
        grass18: [2, 4, 1, 1],
        grass19: [3, 4, 1, 1],
        grass20: [0, 5, 1, 1],
        grass21: [1, 5, 1, 1],
        grass22: [2, 5, 1, 1],
        grass23: [3, 5, 1, 1]
    });

    /*
     * Declare visible heights of the vertices for correct mapping
     * As with css its a clockwise declaration. 1 for hi, 0 for low.
     */
    window.tileVisuals = [
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
    window.mapArray = [];

    var generateRandomFitinTile = function (x, y, noMatch) {
        var tileNumber = Crafty.math.randomInt(0, 23);

        //horizontal x-direction matching
        if (x > 0) {
            if (window.mapArray[y][x - 1][1] !== window.tileVisuals[tileNumber][3]) {
                return;
            }
        }

        //vertical y-direction matching
        if (y > 1) {
            if (window.mapArray[y - 2][x][2] !== window.tileVisuals[tileNumber][0]) {
                return;
            }
        }

        //if its not the first line(y=0)
        if (y > 0) {
            /*
             * On even lines, match to the upper neighbour 3th edge (visuals 3 and 2)
             */
            if (y % 2 === 0) {

                if (window.mapArray[y - 1][x][3] !== window.tileVisuals[tileNumber][0]) {
                    return;
                }
                if (window.mapArray[y - 1][x][2] !== window.tileVisuals[tileNumber][1]) {
                    return;
                }
            }
            /*
             * On odd lines, do some odd logic.
             */
            if (y % 2 === 1) {
                if (x === 0 || !window.mapArray[y - 1][x + 1]) {
                    if (window.mapArray[y - 1][x][2] !== window.tileVisuals[tileNumber][3]) {
                        return;
                    }
                }
                if (window.mapArray[y - 1][x + 1]) {
                    if (window.mapArray[y - 1][x + 1][3] !== window.tileVisuals[tileNumber][0]) {
                        return;
                    }
                    if (window.mapArray[y - 1][x + 1][2] !== window.tileVisuals[tileNumber][1]) {
                        return;
                    }
                }
            }
        }
        return tileNumber;
    };
    // Create the Crafty context with a specific window size
    Crafty.init(window.width, window.height);

    for (var y = 0; y < window.height / window.spriteSize * 3; y++) {
        window.mapArray[y] = [];
        for (var x = 0; x < window.width / window.spriteSize - 1; x++) {
            var tileNumber;

            do {
                tileNumber = generateRandomFitinTile(x, y);
            } while (!tileNumber);

            window.mapArray[y][x] = window.tileVisuals[tileNumber];

            var tileType = 'grass' + tileNumber;

            var tile = Crafty.e('2D, DOM,' + tileType)
                .addComponent("Mouse")
                .attr("id", String(y) + "-" + String(x))
                .attr("name", tileType)
                .areaMap([32, 16], [64, 32], [32, 48], [0, 32]);


            window.iso.place(x, y, 0, tile);
        }
    }
    console.log(window.iso.centerAt());
    window.iso.centerAt(700, 500);
});