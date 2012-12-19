
var canvas_px_w = 400; // width of canvas in pixels
var canvas_px_h = 400; // height of canvas in pixels
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

var temp_count = 0;
var avg_h_count = 0;
var avg_h_amount = 0;

$(function()
{
	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');
	
	init_fullscreen_map();
	var init_p1 = hmap_grass_water[0][0];
	var init_p2 = hmap_grass_water[canvas_t_w - 1][0];
	var init_p3 = hmap_grass_water[canvas_t_w - 1][canvas_t_h - 1];
	var init_p4 = hmap_grass_water[0][canvas_t_h - 1];
	populate_fullscreen_map(0, 0, canvas_t_w, canvas_t_h, init_p1, init_p2, init_p3, init_p4);
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
	// Give corners random values
	hmap_grass_water[0][0] = Math.random() * h_max;
	hmap_grass_water[canvas_t_w - 1][0] = Math.random() * h_max;
	hmap_grass_water[canvas_t_w - 1][canvas_t_h - 1] = Math.random() * h_max;
	hmap_grass_water[0][canvas_t_h - 1] = Math.random() * h_max;
}

function populate_fullscreen_map(x, y, width, height, p1, p2, p3, p4)
{
	var side1, side2, side3, side4, center;
	var transWidth = ~~(width / 2);
	var transHeight = ~~(height / 2);
	
	temp_count++;
	$("#temp_count").html("polulate_fullscreen_map recursively called <strong>" + temp_count + "</strong> times.");
	 
	//as long as square is bigger then a pixel..
	if (width > 1 || height > 1)
	{ 
		//center is just an average of all 4 corners
		center = ((p1 + p2 + p3 + p4) / 4);
		 
		//randomly shift the middle point
		center += shift(transWidth + transHeight);
		 
		//sides are averages of the connected corners
		//p1----p2
		//|     |
		//p4----p3
		side1 = ((p1 + p2) / 2);
		side2 = ((p2 + p3) / 2);
		side3 = ((p3 + p4) / 2);
		side4 = ((p4 + p1) / 2);
		
		//its possible that middle point was moved out of bounds so correct it here
		center = normalize(center);
		side1 = normalize(side1);
		side2 = normalize(side2);
		side3 = normalize(side3);
		side4 = normalize(side4);
		 
		//repear operation for each of 4 new squares created
		//recursion, baby!
		populate_fullscreen_map(x, y, transWidth, transHeight, p1, side1, center, side4);
		populate_fullscreen_map(x + transWidth, y, width - transWidth, transHeight, side1, p2, side2, center);
		populate_fullscreen_map(x + transWidth, y + transHeight, width - transWidth, height - transHeight, center, side2, p3, side3);
		populate_fullscreen_map(x, y + transHeight, transWidth, height - transHeight, side4, center, side3, p4);
	}
	else
	{
		new_h = (p1 + p2 + p3 + p4) / 4;
		//when last square is just a pixel, simply average it from the corners
		hmap_grass_water[x][y] = new_h;
		avg_h_amount += new_h;
		avg_h_count++;
	}
}

function normalize(val)
{
	return (val < 0) ? 0 : (val > h_max) ? h_max : val;
}

function shift(smallSize)
{
	return (Math.random() * h_max) * (smallSize / (canvas_t_w + canvas_t_h)) * 1;
}

function display_map()
{
	// This will clear the screen
	canvas.width = canvas.width;
	// Calculate average h amount in map
	avg_h_amount = avg_h_amount / avg_h_count;
	
	for(var i = 0; i < canvas_t_w; i++)
	{
		var x = i * tile_px_w;
		for(var j = 0; j < canvas_t_h; j++)
		{
			var y = j * tile_px_h;
			
			var cur_tile = hmap_grass_water[i][j];
			
			if(cur_tile < avg_h_amount)
			{
				context.fillStyle = t_grass;
			} else {
				context.fillStyle = t_water;
			}
			
			context.fillRect(x,y,tile_px_w,tile_px_h);
		}
	}
}