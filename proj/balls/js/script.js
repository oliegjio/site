window.onload = function()
{
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.canvas.width = document.body.clientWidth;
	context.canvas.height = document.body.clientHeight;
	function rand1()//y
	{
		return Math.floor(Math.random()*(980-(10)+1)) + (10);
	}
	function rand5()//x
	{
		return Math.floor(Math.random()*(1890-(10)+1)) + (10);
	}
	function rand2()//vx
	{
		return Math.floor(Math.random()*(10-(10)+1)) + (10);
	}
	function rand6()//vy
	{
		return Math.floor(Math.random()*(2-(-2)+1)) + (-2);
	}
	function rand3()//color
	{
		return Math.floor(Math.random()*(50-(0)+1)) + (0);
	}
	function rand4()//radius
	{
		return Math.floor(Math.random()*(10-(5)+1)) + (5); 
	}
	var balls = [];
	for(var i = 0; i < 1000; i++)
	{
		balls[i] = {x: rand5(), y: rand1(), r: rand4(), c: rand3(), vx: rand2(), vy: rand6()};
	}
	var hsl = 50;
	var satur = 100;
	function draw()
	{
		context.fillStyle = "rgba(0,0,0,0.05)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < balls.length; i++)
		{
			context.fillStyle = "hsl(" + balls[i].c + "," + satur + "%," + hsl + "%";
			context.beginPath();
			context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2, false);
			context.fill();
			if((balls[i].x + balls[i].vx + balls[i].r > canvas.width) || (balls[i].x /*- balls[i].r*/ + balls[i].vx < 0))
			{
				balls[i].vx = - balls[i].vx;
			}
			if((balls[i].y + balls[i].vy + balls[i].r > canvas.height) || (balls[i].y /*- balls[i].r*/ + balls[i].vy < 0))
			{
				balls[i].vy = - balls[i].vy;
			}
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
		}
	}
	setInterval(draw, 33);
	alert("PRESS ENTER");
	$(document).keypress(function(e)
	{
		if(e.keyCode != 13) return;
		switch(prompt("1 - Color\n2 - Speed\n3 - Radius", ""))
		{
			case "1":
				var fc = prompt("Max Color (HSL):", "");
				var sc = prompt("Min Color (HSL):", "");
				var hslc = prompt("Color Lightness (HSL):", "");
				var hsatur = prompt("Color Saturation (HSL):", "");
				fc = parseInt(fc);
				sc = parseInt(sc);
				hslc = parseInt(hslc);
				hsatur = parseInt(hsatur);
				hsl  = hslc;
				satur = hsatur;
				for(var i = 0; i < balls.length; i++)
				{
					balls[i].c = Math.floor(Math.random()*(fc-(sc)+1)) + (sc);
				}
			break;
			case "2":
				switch(prompt("1 - X Speed\n2 - Y Speed", ""))
				{
					case "1":
						var fxspd = prompt("Max Speed:", "");
						var sxspd = prompt("Min Speed:", "");
						fxspd = parseInt(fxspd);
						sxspd = parseInt(sxspd);
						for(var i = 0; i < balls.length; i++)
						{
							balls[i].vx = Math.floor(Math.random()*(fxspd-(sxspd)+1)) + (sxspd);
						}
					break;
					case "2":
						var fyspd = prompt("Max Speed:", "");
						var syspd = prompt("Min Speed:", "");
						fyspd = parseInt(fyspd);
						syspd = parseInt(syspd);
						for(var i = 0; i < balls.length; i++)
						{
							balls[i].vy = Math.floor(Math.random()*(fyspd-(syspd)+1)) + (syspd);
						}
					break;
				}	
			break;
			case "3":
				var minr = prompt("Min Radius:", "");
				var maxr = prompt("Max Radius:", "");
				minr = parseInt(minr);
				maxr = parseInt(maxr);
				for(var i = 0; i < balls.length; i++)
				{
					balls[i].r = Math.floor(Math.random()*(maxr-(minr)+1)) + (minr);
				}
			break;
		}
	})
}
