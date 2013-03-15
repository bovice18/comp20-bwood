//check for user input
		document.addEventListener("keyup", function(event) {
			if(!over)
			{
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
			}
		});

var img = new Image();
img.src = 'assets/frogger_sprites.png';	

var frogx, frogy, cars1y, logs1y, lives, over, level, score, highscore, time, frogDir, frogMove;
var frogR;
var frogC;
var interval;
var frogInterval;
var counter;
var moving;
var reset;
var scored0, scored1, scored2, scored3, scored4;
var over;
var froglog0, froglog1, froglog2, froglog3;
var speed;

//Called at opening of the page
function start_game()
{
	//locations
	//frog
	frogx = 187; frogy = 500; frogMove = false; frogDir = 0;
	//cars
	cars1x = -20; cars2x = 80; cars3x = -30; cars4x = 0; 
	//logs
	logs1x = -37;  logs2x = -177; logs3x = 0; logs4x = -400;
	//gameplay
	lives = 2; over = false; level = 1; time = 0; score = 0; highscore = 0; speed = 30; over = false;
	
	
	froglog0 = false; froglog1 = false; froglog2 = false;froglog3 = false;
	scored0 = false; scored1 = false; scored2 = false; scored3 = false; scored4 = false;
	moving = false;
	reset = false;
	counter = 0;
	
	
	draw();	
	interval = setInterval(function(){redraw()},speed);
	//gamePlay();
}
function resetFrog()
{
	frogx = 187; frogy = 500;
}
function checkCollision()
{
//console.log(frogy);
	if(frogDir == 0 || frogDir == 3)
	{
		frogR = frogx + 18;
		frogC = frogx + 9;
	}
	else if(frogDir == 1 || frogDir == 2)
	{
		frogR = frogx + 23;
		frogC = frogx + 12
	}
	 
	switch(frogy)
	{
		case 500:
			//safe
			break;
		case 459:
			collision0();
			break;
		case 414:
			collision1();
			break;
		case 369:
			collision2();
			break;
		case 324:
			collision3();
			break;
		case 289:
			//safe
			break;
		case 254:
			collision4();
			break;
		case 209:
			collision5();
			break;
		case 164:
			collision6();
			break;
		case 119:
			collision7();
			break;
		case 74:
			collision8();
			break;
	}
}

//each function represents a row on the gameboard
function collision0()
{
	if((frogx > cars4x && frogx < (cars4x + 30)) || (frogR > cars4x && frogR < (cars4x + 30)))
	{
		COLLISION();
	}
	else if((frogx > (cars4x+135) && frogx < (cars4x + 165)) || (frogR > (cars4x+135) && frogR < (cars4x + 165)))
	{
		COLLISION();
	}
	else if((frogx > (cars4x+270) && frogx < (cars4x + 300)) || (frogR > (cars4x+270) && frogR < (cars4x + 300)))
	{
		COLLISION();
	}
	else if((frogx > (cars4x+405) && frogx < (cars4x + 435)) || (frogR > (cars4x+405) && frogR < (cars4x + 435)))
	{
		COLLISION();
	}
	
}
function collision1()
{
	if((frogx > cars3x && frogx < (cars3x + 30)) || (frogR > cars3x && frogR < (cars3x + 30)))
	{
		COLLISION();
	}
	else if((frogx > (cars3x+135) && frogx < (cars3x + 160)) || (frogR > (cars3x+135) && frogR < (cars3x + 160)))
	{
		COLLISION();
	}
	else if((frogx > (cars3x+270) && frogx < (cars3x + 295)) || (frogR > (cars3x+270) && frogR < (cars3x + 295)))
	{
		COLLISION();
	}
	else if((frogx > (cars3x+405) && frogx < (cars3x + 430)) || (frogR > (cars3x+405) && frogR < (cars3x + 430)))
	{
		COLLISION();
	}
}
function collision2()
{
	if((frogx > cars2x && frogx < (cars2x + 30)) || (frogR > cars2x && frogR < (cars2x + 30)))
	{
		COLLISION();
	}
	else if((frogx > (cars2x+135) && frogx < (cars2x + 160)) || (frogR > (cars2x+135) && frogR < (cars2x + 160)))
	{
		COLLISION();
	}
	else if((frogx > (cars2x+270) && frogx < (cars2x + 295)) || (frogR > (cars2x+270) && frogR < (cars2x + 295)))
	{
		COLLISION();
	}
	else if((frogx > (cars2x+405) && frogx < (cars2x + 430)) || (frogR > (cars2x+405) && frogR < (cars2x + 430)))
	{
		COLLISION();
	}
}
function collision3()
{
	if((frogx > cars1x && frogx < (cars1x + 30)) || (frogR > cars1x && frogR < (cars1x + 30)))
	{
		COLLISION();
	}
	else if((frogx > (cars1x+135) && frogx < (cars1x + 160)) || (frogR > (cars1x+135) && frogR < (cars1x + 160)))
	{
		COLLISION();
	}
	else if((frogx > (cars1x+270) && frogx < (cars1x + 295)) || (frogR > (cars1x+270) && frogR < (cars1x + 295)))
	{
		COLLISION();
	}
	else if((frogx > (cars1x+405) && frogx < (cars1x + 430)) || (frogR > (cars1x+405) && frogR < (cars1x + 430)))
	{
		COLLISION();
	}
}
function collision4()
{
	if(frogC > logs4x && frogC < (logs4x + 118))
	{
		froglog0 = true;;
	}
	else if(frogC > (logs4x+200) && frogC < (logs4x + 318))
	{
		froglog0 = true;
	}
	else if(frogC > (logs4x+400) && frogC < (logs4x + 518))
	{
		froglog0 = true;
	}
	else if(frogC > (logs4x+600) && frogC < (logs4x + 718))
	{
		froglog0 = true;
	}
	else if(frogC > (logs4x+800) && frogC < (logs4x + 918))
	{
		froglog0 = true;
	}
	else
	{
		COLLISION();
	}
}
function collision5()
{
	if(frogC > logs3x && frogC < (logs3x + 84))
	{
		froglog1 = true;;
	}
	else if(frogC > (logs3x+150) && frogC < (logs3x + 234))
	{
		froglog1 = true;
	}
	else if(frogC > (logs3x+300) && frogC < (logs3x + 384))
	{
		froglog1 = true;
	}
	else if(frogC > (logs3x+450) && frogC < (logs3x + 534))
	{
		froglog1 = true;
	}
	else if(frogC > (logs3x+600) && frogC < (logs3x + 684))
	{
		froglog1 = true;
	}
	else
	{
		COLLISION();
	}
}
function collision6()
{

	if(frogC > logs2x && frogC < (logs2x + 118))
	{
		froglog2 = true;
	}
	else if(frogC > (logs2x+150) && frogC < (logs2x + 268))
	{
		froglog2 = true;
	}
	else if(frogC > (logs2x+300) && frogC < (logs2x + 418))
	{
		froglog2 = true;
	}
	else if(frogC > (logs2x+450) && frogC < (logs2x + 568))
	{
		froglog2 = true;
	}
	else if(frogC > (logs2x+600) && frogC < (logs2x + 718))
	{
		froglog2 = true;
	}
	else
	{
		COLLISION();
	}
}
function collision7()
{
	if(frogC > logs1x && frogC < (logs1x + 178))
	{
		froglog3 = true;
	}
	else if(frogC > (logs1x+200) && frogC < (logs1x + 378))
	{
		froglog3 = true;
	}
	else if(frogC > (logs1x+400) && frogC < (logs1x + 578))
	{
		froglog3 = true;
	}
	else if(frogC > (logs1x+600) && frogC < (logs1x + 778))
	{
		froglog3 = true;
	}
	else if(frogC > (logs1x+800) && frogC < (logs1x + 978))
	{
		froglog3 = true;
	}
	else
	{
		COLLISION();
	}
}
function collision8()
{
	if(frogC > 15 && frogC < 41 && !scored0)
	{
		score = score + 50;
		scored0 = true;
		resetFrog();
	}
	else if(frogC > 100 && frogC < 126 && !scored1)
	{
		score = score + 50;
		scored1 = true;
		resetFrog();
	}
	else if(frogC > 185 && frogC < 211 && !scored2)
	{
		score = score + 50;
		scored2 = true;
		resetFrog();
	}
	else if(frogC > 270 && frogC < 296 && !scored3)
	{
		score = score + 50;
		scored3 = true;
		resetFrog();
	}
	else if(frogC > 355 && frogC < 381 && !scored4)
	{
		score = score + 50;
		scored4 = true;
		resetFrog();
	}
	else
	{
		COLLISION();
	}
}

//collision has occured
function COLLISION()
{
	
	if(lives == 0)
	{
		clearInterval(interval);
		gameOver();	
	}
	resetFrog();
	lives--;
}
function gameOver()
{
	over = true;
	ctx.fillStyle = "000000";
	ctx.fillRect (0, 0, 399, 565);
	
	ctx.font="bold 30px Microgramma";
	ctx.fillStyle = '00FF00';
	ctx.fillText("GAME OVER",112, 250);
	ctx.fillText("HIGH SCORE: " + score, 90, 295);
}
//Called very often, calls all other draw functions to draw the entire canvas
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
		
			
			drawCars1();
			drawCars2();
			drawCars3();
			drawCars4();
			
			drawLogs1(); drawLogs2(); drawLogs3(); drawLogs4();
			
			drawFrog();
			
			if(scored0)
			{
				ctx.drawImage(img, 13, 370, 22, 18, 19, 74, 22, 18); //frog
			}
			if(scored1)
			{
				ctx.drawImage(img, 13, 370, 22, 18, 103, 74, 22, 18); //frog
			}
			if(scored2)
			{
				ctx.drawImage(img, 13, 370, 22, 18, 187, 74, 22, 18); //frog
			}
			if(scored3)
			{
				ctx.drawImage(img, 13, 370, 22, 18, 271, 74, 22, 18); //frog
			}
			if(scored4)
			{
				ctx.drawImage(img, 13, 370, 22, 18, 355, 74, 22, 18); //frog
			}
			if(scored0 && scored1 && scored2 && scored3 && scored4)
			{
				newLevel();
			}
			
		}
		else
		{
			alert("Sorry, canvas not supported by your browser");
		}
}

//Decides which frog to draw depending on direction and whether the frog is moving or not
function drawFrog()
{
	if(frogx > 354)
	{
		frogx = 354;
	}
	else if(frogx < 2)
	{
		frogx = 2;
	}
	
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
function newLevel()
{
	score = score + 1000;
	clearInterval(interval);
	speed = speed-5;
	interval = setInterval(function(){redraw()},speed);
	level++;
	scored0 = false; scored1 = false; scored2 = false; scored3 = false; scored4 = false;
	
}
function clearFrogLog()
{
	froglog0 = false;
	froglog1 = false;
	froglog2 = false;
	froglog3 = false;
}
//Functions to draw the 4 rows of cars:
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

//Functions to draw the 4 rows of logs:
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
	ctx.fillText("High Score: " + score,120,560);
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

//function is called every 30ms for animation
function redraw()
{
	//cars
	cars1x = cars1x+1.5; cars2x = cars2x-1.5; cars3x = cars3x+0.75; cars4x = cars4x-2; 
	//logs
	logs1x = logs1x-1;  logs2x = logs2x+1.5; logs3x = logs3x-0.75; logs4x = logs4x+2;
	if(froglog0)
	{
		frogx = frogx+2;;
	}
	else if(froglog1)
	{
		frogx = frogx-0.75;
	}
	else if(froglog2)
	{
		frogx = frogx+1.5;
	}
	else if(froglog3)
	{
		frogx = frogx-1;
	}
	draw();
	clearFrogLog();
	checkCollision();

}


//frog movement methods
function frogUp()
{
	frogDir = 0;
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
		}	
	}
	score = score + 10;	
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



function frogRight()
{
	frogDir = 1;
	if(!moving)
	{
		counter = 0;
	}
	
	if(frogx > 354)
	{
	
	}
	else
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveRight(28)},3);
		}	
	}
}
function moveRight(y)
{
	frogx++;
	counter++;
	if(counter == y)
	{
		clearInterval(frogInterval);
		frogMove = false;
		moving = false;
	}
	draw();
}



function frogLeft()
{
	frogDir = 2;
	if(!moving)
	{
		counter = 0;
	}
	
	if(frogx <  20)
	{
	
	}
	else
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveLeft(28)},3);
		}	
	}
}
function moveLeft(y)
{
	frogx--;
	counter++;
	if(counter == y)
	{
		clearInterval(frogInterval);
		frogMove = false;
		moving = false;
	}
	draw();
}




function frogDown()
{
	frogDir = 3;

	if(!moving)
	{
		counter = 0;
	}
	
	if(frogy == 254)
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveDown(35)},3);
		}

	}
	else if(frogy == 289)
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveDown(35)},3);
		}	
	}
	else if(frogy == 500)
	{
		frogy = frogy;
	}
	else if(frogy == 459)
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveDown(41)},3);
		}	
	}
	else
	{
		frogMove = true;
		if(!moving)
		{
			moving = true;
			frogInterval = setInterval(function(){moveDown(45)},3);
		}	
	}	
}
function moveDown(y)
{
	frogy++;
	counter++;
	if(counter == y)
	{
		clearInterval(frogInterval);
		frogMove = false;
		moving = false;
	}
	draw();
}
