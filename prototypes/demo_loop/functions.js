function updateGame()
{
	currentTime = new Date().getTime();
	
	frame += 1;
    if ( frame >= FPS ) {
    
        frame = 0;
        
    }
	
	excuteGame();
	drawGame();
	
	updateTime = new Date().getTime() - currentTime;
	
	currentFPS = 1000.0 / updateTime;
    
    if ( currentFPS > FPS ) {
    
        currentFPS = FPS;
    
    }
	
	setTimeout(updateGame, (1000.0 / FPS) - updateTime);	
}