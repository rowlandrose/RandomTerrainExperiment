
var canvas_px_w = 800; // width of canvas in pixels
var canvas_px_h = 300; // height of canvas in pixels
var tile_px_w = 4; // width of tile in pixels
var tile_px_h = 4; // height of tile in pixels
var canvas_t_w = Math.ceil(canvas_px_w / tile_px_w); // width of canvas in tiles
var canvas_t_h = Math.ceil(canvas_px_h / tile_px_h); // height of canvas in tiles
var h_start = -1;
var h_range = 4;
var h_max = 100;
var h_min = 0;

var canvas, context;

// G = Grass
// W = Water
// M = Mountain
// D = Desert

var t_grass = "rgb(0,200,0)";
var t_water = "rgb(0,0,200)";
var t_mountain = "rgb(120,120,0)";
var t_desert = "rgb(200,200,0)";

var hmap_grass_water = Array();

$(function()
{
	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');
	
	init_fullscreen_map();
	populate_fullscreen_map(5, 5, h_start); // starting point (can be any), starting value (0 to 100)
	display_map();
});

function init_fullscreen_map()
{
	// Water / Grass heightmap init
	for(var i = 0; i < canvas_t_w; i++)
	{
		hmap_grass_water[i] = Array();
		
		for(var j = 0; j < canvas_t_h; j++)
		{
			hmap_grass_water[i][j] = h_start;
		}
	}
}

var temp_count = 0;
function populate_fullscreen_map(x, y, h)
{
	temp_count++;
	$("#temp_count").html(temp_count);
	var new_h = h + ((Math.random() * h_range) - (h_range / 2)); // new_h set to random value + or - h_range from h
	new_h = keep_in_range_h(new_h);
	hmap_grass_water[x][y] = new_h;
	
	var north_y = y - 1;
	if(north_y >= 0) {
		var north_tile = hmap_grass_water[x][north_y];
		if(north_tile == h_start)
		{
			populate_fullscreen_map(x, north_y, new_h);
		}
	}
	
	var east_x = x + 1;
	if(east_x <= canvas_t_w - 1) {
		var east_tile = hmap_grass_water[east_x][y];
		if(east_tile == h_start)
		{
			populate_fullscreen_map(east_x, y, new_h);
		}
	}
	
	var south_y = y + 1;
	if(south_y <= canvas_t_h - 1) {
		var south_tile = hmap_grass_water[x][south_y];
		if(south_tile == h_start)
		{
			populate_fullscreen_map(x, south_y, new_h);
		}
	}
	
	var west_x = x - 1;
	if(west_x >= 0) {
		var west_tile = hmap_grass_water[west_x][y];
		if(west_tile == h_start)
		{
			populate_fullscreen_map(west_x, y, new_h);
		}
	}
}

function keep_in_range_h(num)
{
	if(num > h_max) {
		num = h_max;
	} else if(num < h_min) {
		num = h_min;
	}
	return num;
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
			
			var cur_tile = hmap_grass_water[i][j];
			if(cur_tile < h_max / 2)
			{
				context.fillStyle = t_grass;
			} else {
				context.fillStyle = t_water;
			}
			
			context.fillRect(x,y,tile_px_w,tile_px_h);
		}
	}
}