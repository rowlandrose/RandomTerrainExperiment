var step=1;
var canvas, context;
var boxx=0, boxxd=0, boxy=0, boxyd=0;

$(function() {
	canvas  = document.getElementById("gcanvas");
	context = canvas.getContext('2d');
	loop();
});

function loop() {
	setTimeout(function() {
		logic();
		draw();
		loop();
	}, 16);
}

function logic() {
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

function draw() {
	canvas.width = canvas.width;
	context.fillRect(boxx,boxy,25,25);
}