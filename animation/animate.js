/**
 * Crafty Examples
 * >> Animation example code
 *
 * This code provides an example of how to use the Crafty.js game library
 * to create an eternally animated element.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @version 1.0
 */
/*globals $, Crafty, console */
$(document).ready(function() {

	var width = 130, height = 130, spriteSize = 128;
	// Create the Crafty context,
	Crafty.init(width, height);
	//Crafty.canvas();

	/*
	 * Declare a sprite resource
	 * Each part of the sprite is 128px * 128px
	 * The "mino" part of the sprite begins in 4 * 128px / 0 * 128px and has a size of 1 * 128px / 1 * 128px
	 */
	Crafty.sprite(spriteSize, "../resources/images/minotaur.png", {
		mino : [4, 0, 1, 1]
	});

	// Create a new entity which is a mino (previously declared sprite),
	var mino = Crafty.e("2D, DOM, mino, SpriteAnimation")
						.attr({x : 0, y : 0, w : 128, h : 128 })// Set the position
						.animate("anim", 5, 0, 11)				// starting from coordinate x=5 and going to x=11, with y=0
						.animate("anim", 20, -1);
});
