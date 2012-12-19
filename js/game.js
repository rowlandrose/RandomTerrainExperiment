
var canvas_px_w = 800;
var canvas_px_h = 600;
var tile_px_w = 4;
var tile_px_h = 4;

var canvas, context;

// G = Grass
// W = Water
// M = Mountain
// D = Desert

$(function()
{
	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');
	
	generate_fullscreen_map();
	display_map();
});

function generate_fullscreen_map()
{
	// Test map of grass
}

function display_map()
{
	// This will clear the screen
	canvas.width = canvas.width;
	context.fillRect(25,25,25,25);
}