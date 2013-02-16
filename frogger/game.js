var img = new Image();
img.src = 'assets/frogger_sprites.png';	

function start_game()
{
	//locations
	frogx = 190; frogy = 495; cars1y = 320; logs1y = 115;
	//gameplay
	lives = 2; over = false; level = 1; time = 0;
	
	drawInit(frogx, frogy, cars1y, logs1y, lives, over, level, time);	
}

function drawInit(frogx, frogy, cars1y, logs1y, lives, over, level, time)
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
			
			ctx.drawImage(img, 15, 13, 321, 32, 20, 10, 321, 32); //FROGGER			
			ctx.drawImage(img, 0, 55, 399, 53, 0, 50, 399, 53); // Top Lilly Pads
			ctx.drawImage(img, 0, 119, 399, 35, 0, 275, 399, 35); //purple sidewalks
			ctx.drawImage(img, 0, 119, 399, 35, 0, 485, 399, 35); //purple sidewalks
			ctx.drawImage(img, 12, 335, 19, 22, 0, 520, 18, 22); //lives
			ctx.drawImage(img, 12, 335, 19, 22, 20, 520, 18, 22); //lives2
			
			setLevel(level);
			setScore(0, 0);
		
			drawFrog(frogx, frogy);
			drawCars1(cars1y);
			drawLogs1(logs1y);
		}
		else
		{
			alert("Sorry, canvas not supported by your browser");
		}
}

function drawFrog(frogx, frogy)
{
	ctx.drawImage(img, 13, 370, 22, 18, frogx, frogy, 22, 18); //frog
}
function drawCars1(ycoord)
{
	ctx.drawImage(img, 47, 265, 25, 26, 165, ycoord, 25, 26); // vehicle 1
	ctx.drawImage(img, 47, 265, 25, 26, 300, ycoord, 25, 26); //vehicle 2
}
function drawLogs1(ycoord)
{
	ctx.drawImage(img, 7, 166, 178, 22, 10, logs1y, 178, 22); //log
}
function setLevel(level)
{
	ctx.font="bold 30px Microgramma";
	ctx.fillStyle = '00FF00';
	ctx.fillText("Level: " + level,55,539);
}
function setScore(score, highscore)
{
	ctx.font="bold 20px Microgramma";
	ctx.fillText("Score: " + score,0,560);
	ctx.fillText("High Score: " + highscore,90,560);
}