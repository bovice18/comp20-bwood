function draw()
	{
		canvas = document.getElementById("simple");
		if(canvas.getContext)
		{
			ctx = canvas.getContext('2d');
			img = new Image();
			img.src = 'pacman10-hp-sprite.png';
			//ctx.drawImage(img, -322, -2);	
			ctx.drawImage(img, 322, 2, 464, 135, 0, 0, 464, 140);
			
			ctx.drawImage(img, 81, 3, 18, 17, 20, 4, 18, 17);
			ctx.drawImage(img, 62, 123, 16, 16, 50, 4, 16, 16);
		}
		else
		{
			alert("Sorry, canvas not supported by your browser");
		}
	}