function start_game()
{
	draw(190, 495, 2, false, 1, 0);
}

function draw(frogx, frogy, lives, over, level, time)
{
	canvas = document.getElementById("game");
		if(canvas.getContext)
		{
			ctx = canvas.getContext('2d');
			
						
			//draw black square and blue square
			ctx.fillStyle = "191970";
			ctx.fillRect (0, 0, 399, 282);
			ctx.fillStyle = "000000";
			ctx.fillRect (0, 282, 399, 283);
			
			img = new Image();
			img.src = 'assets/frogger_sprites.png';	
			ctx.drawImage(img, 15, 13, 321, 32, 20, 10, 321, 32); //FROGGER			
			ctx.drawImage(img, 0, 55, 399, 53, 0, 50, 399, 53); // Top Lilly Pads
			ctx.drawImage(img, 0, 119, 399, 35, 0, 275, 399, 35); //purple sidewalks
			ctx.drawImage(img, 0, 119, 399, 35, 0, 485, 399, 35); //purple sidewalks
			ctx.drawImage(img, 12, 335, 19, 22, 0, 520, 18, 22); //lives
			ctx.drawImage(img, 12, 335, 19, 22, 20, 520, 18, 22); //lives2
			
			ctx.font="bold 30px Microgramma";
			ctx.fillStyle = '00FF00';
			ctx.fillText("Level 1",55,539);
			
			ctx.font="bold 20px Microgramma";
			ctx.fillText("Score: 0",0,560);
			ctx.fillText("High Score: 0",90,560);
			
			ctx.drawImage(img, 13, 370, 22, 18, frogx, frogy, 22, 18); //frog			
			ctx.drawImage(img, 47, 265, 25, 26, 165, 320, 25, 26); // vehicle 1
			ctx.drawImage(img, 47, 265, 25, 26, 300, 320, 25, 26); //vehicle 2
			ctx.drawImage(img, 7, 166, 178, 22, 10, 115, 178, 22); //log
		}
		else
		{
			alert("Sorry, canvas not supported by your browser");
		}
}