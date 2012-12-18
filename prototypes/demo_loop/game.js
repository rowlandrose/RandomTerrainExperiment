var FPS=30.0;
var currentTime=0, updateTime=0, frame=0, currentFPS=0;
var canvas, context;
var boxx=0, boxxd=0, boxy=0, boxyd=0;

$(function() {
	canvas  = document.getElementById('gcanvas');
	context = canvas.getContext('2d');
	
	updateGame();
});

function excuteGame()
{
	if(boxxd == 0) {
		if(boxx >= (800 - 25 - 5)) {
			boxxd = 1;	
		} else {
			boxx=boxx+5;	
		}
	} else {
		if(boxx <= 5) {
			boxxd = 0;	
		} else {
			boxx=boxx-5;	
		}
	}
	if(boxyd == 0) {
		if(boxy >= (480 - 25 - 5)) {
			boxyd = 1;	
		} else {
			boxy=boxy+5;	
		}
	} else {
		if(boxy <= 5) {
			boxyd = 0;	
		} else {
			boxy=boxy-5;	
		}
	}
}

function drawGame()
{
	// This will clear the screen
	canvas.width = canvas.width;
	
	$('#updateTime').text('Update time: ' + updateTime);
    $('#currentFPS').text('Current FPS: ' + Math.floor(currentFPS) + '/' + FPS);
	context.fillRect(boxx,boxy,25,25);
}