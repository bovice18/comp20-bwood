function draw()
	{
		canvas = document.getElementById("simple");
		if(canvas.getContext)
		{
			ctx = canvas.getContext('2d');
			
			//draw black square and blue square
			ctx.fillStyle = "191970";
			ctx.fillRect (0, 0, 50, 50);
			ctx.fillStyle = "000000";
			ctx.fillRect (50, 50, 50, 50);
			
			img = new Image();
			img.src = 'pacman10-hp-sprite.png';
			//ctx.drawImage(img, -322, -2);	
			ctx.drawImage(img, 322, 2, 464, 135, 0, 0, 464, 140);
			
			ctx.drawImage(img, 81, 3, 18, 17, 20, 4, 18, 17);
			ctx.drawImage(img, 62, 123, 16, 16, 50, 4, 16, 16);
			
			//draw black square and blue square
		}
		else
		{
			alert("Sorry, canvas not supported by your browser");
		}
	}