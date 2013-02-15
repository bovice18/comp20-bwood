function start_game()
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
		}
		else
		{
			alert("Sorry, canvas not supported by your browser");
		}
}