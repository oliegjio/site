window.onload = function()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var o = [];
	var forX = 1;
	var forY = 1;
	var forC = 0;
	for(var i = 0; i < 27; i++)
	{
		if(forC == 9)
		{
			forY++;
			forX = 1;
			forC = 0;
		}
		o[i] = {
			x: 55 * forX + (forC * 25),
			y: 75 * forY,
			w: 50,
			h: 50,
			c: ""
		};
		if(i % 2)
		{
			o[i].c = "rgba(0,150,255,1)";
		} else {
			o[i].c = "rgba(100,0,255,1)";
		}
		forX++;
		forC++;
	}
	var plat = {
		x: 150,
		y: 730,
		w: 150,
		h: 15,
		c: "rgba(255,255,255,1)",
		v: 15
	};
	var ball = {
		x: 75,
		y: 715,
		r: 9,
		w: 13,
		h: 13,
		c: "rgba(255,180,0,1)",
		vx: 5,
		vy: -5,
	};
	var obj1 = {
		x: 600,
		y: 500,
		w: 100,
		h: 100,
		c: "rgba(255,0,0,1)",
		vx: 3,
		vy: 2,
	};
	/*var obj2 = {
		x: 600,
		y: 600,
		w: 100,
		h: 100,
		c: "rgba(0,255,0,1)",
	};*/
	var obj2 = [];
	obj2[0] = {
		x: 500,
		y: 500,
		w: 100,
		h: 100,
		c: "rgba(0,255,0,1)",
	};
	var start = false;
	/*function isCollision(e1, e2)
	{
		if(((e2.x + e2.w > e1.x + e1.w && e1.x + e1.w > e2.x) && (e2.y + e2.h > e1.y + e1.h && e1.y + e1.h > e2.y)) ||
			((e2.x + e2.w > e1.x && e1.x > e2.x) && (e2.y < e1.y + e1.h && e1.y + e1.h < e2.y + e2.h)) ||
			((e2.x < e1.x && e1.x < e2.x + e2.w) && (e2.y < e1.y && e1.y < e2.y + e2.h)) ||
			((e2.x < e1.x + e1.w && e1.x + e1.w < e2.x + e2.w) && (e2.y < e1.y && e1.y < e2.y + e2.h)))
		{
			return true;
		} else {
			return false;
		}
	}*/
	function isCollision(e1, e2)
	{
		if((e2.x + e2.w >= e1.x + e1.w && e1.x + e1.w >= e2.x) && (e2.y + e2.h >= e1.y + e1.h && e1.y + e1.h >= e2.y) &&
			(e2.x <= e1.x && e1.x <= e2.x + e2.w) && (e2.y <= e1.y && e1.y <= e2.y + e2.h))
		{
			return "center";
		}
		if((e2.x <= e1.x && e1.x <= e2.x + e2.w) && (e2.y <= e1.y && e1.y <= e2.y + e2.h) &&
			(e2.x <= e1.x + e1.w && e1.x + e1.w <= e2.x + e2.w) && (e2.y <= e1.y && e1.y <= e2.y + e2.h))
		{
			return "bottom";
		}
		if(((e2.x + e2.w > e1.x + e1.w && e1.x + e1.w > e2.x) && (e2.y + e2.h == e1.y + e1.h && e1.y == e2.y) &&
			(e2.x < e1.x + e1.w && e1.x + e1.w < e2.x + e2.w)) ||
			((e2.x + e2.w > e1.x + e1.w && e1.x + e1.w > e2.x) && (e2.y + e2.h > e1.y + e1.h && e1.y + e1.h > e2.y) &&
				(e2.x < e1.x + e1.w && e1.x + e1.w < e2.x + e2.w) && (e2.y < e1.y && e1.y < e2.y + e2.h)))
		{
			return "left";
		}
		if(((e2.x + e2.w == e1.x + e1.w && e1.x == e2.x) && (e2.y + e2.h > e1.y + e1.h && e1.y + e1.h > e2.y) &&
			(e2.y < e1.y + e1.h && e1.y + e1.h < e2.y + e2.h)) ||
			((e2.x + e2.w > e1.x + e1.w && e1.x + e1.w > e2.x) && (e2.y + e2.h > e1.y + e1.h && e1.y + e1.h > e2.y) &&
				(e2.x + e2.w > e1.x && e1.x > e2.x) && (e2.y < e1.y + e1.h && e1.y + e1.h < e2.y + e2.h)))
		{
			return "top";
		}
		if((e2.x <= e1.x && e1.x <= e2.x + e2.w) && (e2.y <= e1.y && e1.y <= e2.y + e2.h) &&
			(e2.x + e2.w >= e1.x && e1.x >= e2.x) && (e2.y <= e1.y + e1.h && e1.y + e1.h <= e2.y + e2.h))
		{
			return "right";
		}
		if((e2.x + e2.w > e1.x + e1.w && e1.x + e1.w > e2.x) && (e2.y + e2.h > e1.y + e1.h && e1.y + e1.h > e2.y)) 
		{
			return "topleft";
		}
		if((e2.x + e2.w > e1.x && e1.x > e2.x) && (e2.y < e1.y + e1.h && e1.y + e1.h < e2.y + e2.h)) 
		{
			return "topright";
		}
		if((e2.x < e1.x && e1.x < e2.x + e2.w) && (e2.y < e1.y && e1.y < e2.y + e2.h))
		{
			return "bottomright";
		}
		if((e2.x < e1.x + e1.w && e1.x + e1.w < e2.x + e2.w) && (e2.y < e1.y && e1.y < e2.y + e2.h)) 
		{
			return "bottomleft";
		}
		return "false";
	}
	function collide(e1, e2)
	{
		for(var i = 0; i < e2.length; i++)
		{
			var colval = isCollision(e1, e2[i]);
			if(colval == "false") continue;
			var tempX = 0;
			var tempY = 0;
			switch(colval)
			{
				case "topleft":
					for(var j = 0; j < -(e2[i].y - e1.y) + e1.h; j++)
					{
						if(e2[i].y == e1.y + e1.vy + e1.h - j)
						{
							tempY = j;
						}
					}
					for(var k = 0; k < -(e2[i].x - e1.x) + e1.w; k++)
					{
						if(e2[i].x == e1.x + e1.vx + e1.w - k)
						{
							tempX = k;
						}
					}
					//alert(tempX + "       " + tempY);
					if(tempX > tempY)
					{
						e1.vx = - e1.vx;
					}
					if(tempX < tempY)
					{
						e1.vy = - e1.vy;
					}
					if(tempX == tempY)
					{
						e1.vy = - e1.vy;
						e1.vx = - e1.vx;
					}
				break;
			}
		}
	}
	alert(isCollision(obj1, obj2[0]));
	function draw()
	{
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = obj1.c;
		ctx.fillRect(obj1.x, obj1.y, obj1.w, obj1.h);
		ctx.fillStyle = obj2[0].c;
		ctx.fillRect(obj2[0].x, obj2[0].y, obj2[0].w, obj2[0].h);

		//obj1.x += obj1.vx;
		//obj1.y += obj1.vy;

		//collide(obj1, obj2);

		for(var i = 0; i < o.length; i++)
		{
			ctx.fillStyle = o[i].c;
			ctx.fillRect(o[i].x, o[i].y, o[i].w, o[i].h);
		}

		ctx.fillStyle = plat.c;
		ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

		ctx.beginPath();
		ctx.fillStyle = ball.c;
		ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
		ctx.fill();

		if(start == true)
		{
			if(ball.y - ball.vy >= 810)
			{
				alert("Lose!");
				start = undefined;
			}
			if((ball.x + ball.vx + ball.r > canvas.width) || (ball.x + ball.vx - ball.r < 0))
			{
				ball.vx = - ball.vx;
			}
			if(ball.y + ball.vy - ball.r < 0)
			{
				ball.vy = - ball.vy;
			}
			if(isCollision(ball, plat) != "false") ball.vy = - ball.vy;
			for(var i = 0; i < o.length; i++)
			{
				if(isCollision(ball, o[i]) != "false")
				{
					ball.vx = - ball.vx;
					ball.vy = - ball.vy;
					o.splice(i, 1);
				}
			}
			ball.x += ball.vx;
			ball.y += ball.vy;
		}
	}
	setInterval(draw, 11);
	function moveL()
	{
		if(plat.x - plat.v <= 0) return;
		plat.x -= plat.v;
	}
	function moveR()
	{
		if(plat.x + plat.v >= canvas.width - plat.w) return;
		plat.x += plat.v;
	}
	document.onkeypress = function(event)
	{
		//if(start == false) start = true;
		switch(event.keyCode)
		{
			case 97:
				moveL();
			break;
			case 100:
				moveR();
			break;
		}
	}
}
