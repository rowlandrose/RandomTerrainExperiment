
var canvas_px_w = 800; // width of canvas in pixels
var canvas_px_h = 600; // height of canvas in pixels
var tile_px_w = 4; // width of tile in pixels
var tile_px_h = 4; // height of tile in pixels
var canvas_t_w = Math.ceil(canvas_px_w / tile_px_w); // width of canvas in tiles
var canvas_t_h = Math.ceil(canvas_px_h / tile_px_h); // height of canvas in tiles

var canvas, context;

// G = Grass
// W = Water
// M = Mountain
// D = Desert

var t_grass = "rgb(0,200,0)";
var t_water = "rgb(0,0,200)";
var t_mountain = "rgb(120,120,0)";
var t_desert = "rgb(200,200,0)";

var hmap = Array();

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
	for(var i = 0; i < canvas_t_w; i++)
	{
		hmap[i] = Array();
		
		for(var j = 0; j < canvas_t_h; j++)
		{
			hmap[i][j] = 2;
		}
	}
}

function display_map()
{
	// This will clear the screen
	canvas.width = canvas.width;
	
	for(var i = 0; i < canvas_t_w; i++)
	{
		var x = i * tile_px_w;
		for(var j = 0; j < canvas_t_h; j++)
		{
			var y = j * tile_px_h;
			context.fillStyle = t_desert;
			context.fillRect(x,y,tile_px_w,tile_px_h);
		}
	}
}