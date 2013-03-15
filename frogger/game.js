//check for user input
		document.addEventListener("keyup", function(event) {
		console.log(event.keyCode);
			if (event.keyCode == 38) {
				frogUp();
				}
			if (event.keyCode == 39) {
				frogRight();
				}
			if (event.keyCode == 37) {
				frogLeft();
				}
			if (event.keyCode == 40) {
				frogDown();
				}
		});

var img = new Image();
img.src = 'assets/frogger_sprites.png';	

var frogx, frogy, cars1y, logs1y, lives, over, level, score, highscore, time, frogDir, frogMove;

var interval;
var frogInterval;
var counter;
var moving = false;

function start_game()
{
	//locations
	//frog
	frogx = 188; frogy = 500; frogMove = false; frogDir = 0;
	//cars
	cars1x = -20; cars2x = 80; cars3x = -30; cars4x = 0; 
	//logs
	logs1x = -37;  logs2x = -177; logs3x = 0; logs4x = -400;
	//gameplay
	lives = 2; over = false; level = 1; time = 0; score = 0; highscore = 0;
	
	draw();	
	interval = setInterval(function(){redraw()},30);
	//gamePlay();
}
//frogx, frogy, cars1x, logs1x, lives, over, level, time, frogDir, frogMove
function draw()
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
			drawLives()
			
			setLevel();
			setScore();
		
			drawFrog();
			drawCars1();
			drawCars2();
			drawCars3();
			drawCars4();
			
			drawLogs1(); drawLogs2(); drawLogs3(); drawLogs4();
		}
		else
		{
			alert("Sorry, canvas not supported by your browser");
		}
}

function drawFrog()
{
	if(frogDir == 0) //forward
	{
		if(frogMove) //jumper
		{
			ctx.drawImage(img, 45, 366, 23, 25, frogx, frogy, 22, 18); //frog
		}
		else
		{
			ctx.drawImage(img, 13, 370, 22, 18, frogx, frogy, 22, 18); //frog
		}
	}
	else if(frogDir == 1)//right
	{
		if(frogMove) //jumper
		{
			ctx.drawImage(img, 42, 335, 27, 22, frogx, frogy, 22, 18); //frog
		}
		else
		{
			ctx.drawImage(img, 12, 334, 18, 23, frogx, frogy, 22, 18); //frog
		}
	}
	else if(frogDir == 2)//left
	{
		if(frogMove) //jumper
		{
			ctx.drawImage(img, 112, 338, 27, 22, frogx, frogy, 22, 18); //frog
		}
		else
		{
			ctx.drawImage(img, 82, 336, 18, 23, frogx, frogy, 22, 18); //frog
		}
	}
	else if(frogDir == 3)//backward
	{
		if(frogMove) //jumper
		{
			ctx.drawImage(img, 114, 367, 22, 24, frogx, frogy, 22, 18); //frog
		}
		else
		{
			ctx.drawImage(img, 81, 369, 23, 18, frogx, frogy, 22, 18); //frog
		}
	}
	
}
function drawCars1()
{
	if(cars1x > 115)
	{
		cars1x = -20;
	}
	ctx.drawImage(img, 47, 265, 25, 26, cars1x, 320, 25, 26); // vehicle 1
	ctx.drawImage(img, 47, 265, 25, 26, cars1x+135, 320, 25, 26); //vehicle 2
	ctx.drawImage(img, 47, 265, 25, 26, cars1x+270, 320, 25, 26); //vehicle 3
	ctx.drawImage(img, 47, 265, 25, 26, cars1x+405, 320, 25, 26); //vehicle 3

}
function drawCars2()
{
	if(cars2x < -55)
	{
		cars2x = 80;
	}
	ctx.drawImage(img, 84, 264, 25, 26, cars2x, 365, 25, 26); // vehicle 1
	ctx.drawImage(img, 84, 264, 25, 26, cars2x+135, 365, 25, 26); //vehicle 2
	ctx.drawImage(img, 84, 264, 25, 26, cars2x+270, 365, 25, 26); //vehicle 3
	ctx.drawImage(img, 84, 264, 25, 26, cars2x+405, 365, 25, 26); //vehicle 3

}
function drawCars3()
{
	if(cars3x > 105)
	{
		cars3x = -30;
	}
    ctx.drawImage(img, 47, 265, 25, 26, cars3x, 410, 25, 26); // vehicle 1
	ctx.drawImage(img, 47, 265, 25, 26, cars3x+135, 410, 25, 26); //vehicle 2
	ctx.drawImage(img, 47, 265, 25, 26, cars3x+270, 410, 25, 26); //vehicle 3
	ctx.drawImage(img, 47, 265, 25, 26, cars3x+405, 410, 25, 26); //vehicle 3

}
function drawCars4()
{
	if(cars4x < -135)
	{
		cars4x = 0;
	}
	ctx.drawImage(img, 8, 268, 30, 20, cars4x, 455, 30, 20); // vehicle 1
	ctx.drawImage(img, 8, 268, 30, 20, cars4x+135, 455, 30, 20); //vehicle 2
	ctx.drawImage(img, 8, 268, 30, 20, cars4x+270, 455, 30, 20); //vehicle 3
	ctx.drawImage(img, 8, 268, 30, 20, cars4x+405, 455, 30, 20); //vehicle 3

}

function drawLogs1()
{
	if(logs1x == -237)
	{
		logs1x = -37;
	}
	ctx.drawImage(img, 7, 166, 178, 22, logs1x, 115, 178, 22); //log
	ctx.drawImage(img, 7, 166, 178, 22, logs1x + 200, 115, 178, 22); //log
	ctx.drawImage(img, 7, 166, 178, 22, logs1x + 400, 115, 178, 22); //log
	ctx.drawImage(img, 7, 166, 178, 22, logs1x + 600, 115, 178, 22); //log
}
function drawLogs2()
{
	if(logs2x > -27.5)
	{
		logs2x = -177;
	}	
	ctx.drawImage(img, 6, 197, 118, 23, logs2x, 160, 118, 23); //log
	ctx.drawImage(img, 6, 197, 118, 23, logs2x + 150, 160, 118, 23); //log
	ctx.drawImage(img, 6, 197, 118, 23, logs2x + 300, 160, 118, 23); //log
	ctx.drawImage(img, 6, 197, 118, 23, logs2x + 450, 160, 118, 23); //log
}
function drawLogs3()
{
	if((logs3x+450) < 183)
	{
		logs3x = -117;
	}	
	ctx.drawImage(img, 7, 229, 84, 23, logs3x, 205, 84, 23); //log
	ctx.drawImage(img, 7, 229, 84, 23, logs3x + 150, 205, 84, 23); //log
	ctx.drawImage(img, 7, 229, 84, 23, logs3x + 300, 205, 84, 23); //log
	ctx.drawImage(img, 7, 229, 84, 23, logs3x + 450, 205, 84, 23); //log
	ctx.drawImage(img, 7, 229, 84, 23, logs3x + 600, 205, 84, 23); //log

}
function drawLogs4()
{
	if((logs4x) > -100)
	{
		logs4x = -300;
	}	
	ctx.drawImage(img, 6, 197, 118, 23, logs4x, 250, 118, 23); //log
	ctx.drawImage(img, 6, 197, 118, 23, logs4x + 200, 250, 118, 23); //log
	ctx.drawImage(img, 6, 197, 118, 23, logs4x + 400, 250, 118, 23); //log
	ctx.drawImage(img, 6, 197, 118, 23, logs4x + 600, 250, 118, 23); //log
	ctx.drawImage(img, 6, 197, 118, 23, logs4x + 800, 250, 118, 23); //log

}
function setLevel()
{
	ctx.font="bold 30px Microgramma";
	ctx.fillStyle = '00FF00';
	ctx.fillText("Level: " + level,55,539);
}
function setScore()
{
	ctx.font="bold 20px Microgramma";
	ctx.fillText("Score: " + score,0,560);
	ctx.fillText("High Score: " + highscore,120,560);
}
function drawLives()
{
	if(lives == 2)
	{
		ctx.drawImage(img, 12, 335, 19, 22, 0, 520, 18, 22); //lives
		ctx.drawImage(img, 12, 335, 19, 22, 20, 520, 18, 22); //lives2
	}
	else if(lives == 1)
	{
		ctx.drawImage(img, 12, 335, 19, 22, 0, 520, 18, 22); //lives
	}
	
	
}
function redraw()
{
	//cars
	cars1x = cars1x+1.5; cars2x = cars2x-1.5; cars3x = cars3x+0.75; cars4x = cars4x-2; 
	//logs
	logs1x = logs1x-1;  logs2x = logs2x+1.5; logs3x = logs3x-0.75; logs4x = logs4x+2;
	draw();

}
function frogUp()
{
	if(!moving)
	{
		counter = 0;
	}
	
	if(frogy == 324)
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveUp(35)},3);
		}

	}
	else if(frogy == 289)
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveUp(35)},3);
		}	}
	else if(frogy == 74)
	{
		frogy = frogy;
	}
	else if(frogy == 500)
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveUp(41)},3);
		}	}
	else
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveUp(45)},3);
		}	}
	
}
function moveUp(y)
{
	frogy--;
	counter++;
	if(counter == y)
	{
		clearInterval(frogInterval);
		frogMove = false;
		moving = false;
	}
	draw();
}
function moveRight(y)
{
	frogy--;
	counter++;
	if(counter == y)
	{
		clearInterval(frogInterval);
		frogMove = false;
	}
	draw();
}

function moveLeft(y)
{
	frogy--;
	counter++;
	if(counter == y)
	{
		clearInterval(frogInterval);
		frogMove = false;
	}
	draw();
}

function moveRight(y)
{
	frogy--;
	counter++;
	if(counter == y)
	{
		clearInterval(frogInterval);
		frogMove = false;
	}
	draw();
}

function frogRight()
{

}
function frogLeft()
{

}
function frogDown()
{
	
}
// function gamePlay()
// {
	// while(//game not over)
	// {
		
    // }
		
		
		
		
		
		
		
		// update(); //calculate new coordinates
		// redraw(); //redraw using new coordinates
		
	// }

// }