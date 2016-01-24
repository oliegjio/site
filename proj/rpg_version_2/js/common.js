window.onload = function()
{
	var canvas = document.createElement("CANVAS");
	document.documentElement.appendChild(canvas);

	var HEIGHT = window.innerHeight;
	var WIDTH = window.innerWidth;
	var MAP_WIDTH = 25;
	var MAP_HEIGHT = 25;
	var TILE_SIZE = 50;

	var offset_left = 0; //PLAYER MOVING
	var offset_top = 0; //PLAYER MOVING

	var player_speed = 9;

	canvas.style.position = "absolute";

	canvas.setAttribute("height", HEIGHT.toString () );
	canvas.setAttribute("width", WIDTH.toString () );

	canvas.focus();

	var ctx = canvas.getContext("2d");

	var map = [];

	var is_move_up = false;
	var is_move_down = false;
	var is_move_left = false;
	var is_move_right = false;

	function refresh_map() 
	{
		for(var x = 0; x < MAP_HEIGHT; x++)
		{
			map[x] = [];

			for(var y = 0; y < MAP_WIDTH; y++)
			{
				map[x][y] =
				{
					x: (x * TILE_SIZE),
					y: (y * TILE_SIZE)
				}

				if(y % 2)
				{
					if(x % 2)
					{
						map[x][y].color = "crimson";
					}
					else
					{
						map[x][y].color = "darkgrey";
					}
				}
				else
				{
					if(x % 2)
					{
						map[x][y].color = "darkgrey";
					}
					else
					{
						map[x][y].color = "crimson";
					}
				}
			}
		}
	}

	function draw (offset_left, offset_top)
	{
		ctx.fillStyle = "black";
		ctx.fillRect (0, 0, WIDTH, HEIGHT);

		for (var x = 0; x < MAP_HEIGHT; x++)
		{
			for (var y = 0; y < MAP_WIDTH; y++)
			{
				ctx.fillStyle = map[x][y].color;
				ctx.fillRect (map[x][y].x - offset_left,
							 map[x][y].y - offset_top,
							 TILE_SIZE, TILE_SIZE);
			}
		}
	}

	function update(delta)
	{
		if(is_move_left == true)
		{
			offset_left -= player_speed;
		}

		if(is_move_right == true)
		{
			offset_left += player_speed;
		}

		if(is_move_up == true)
		{
			offset_top -= player_speed;
		}

		if(is_move_down == true)
		{
			offset_top += player_speed;
		}
	}

	var last_time = Date.now();

	refresh_map();

	function main()
	{
		var date_now = Date.now();
		var date_delta = (date_now - last_time) / 1000;

		update(date_delta);

		last_time = date_now;

		draw(offset_left, offset_top);

		requestAnimationFrame(main);
	}
	main();

	function resize()
	{
		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;

		canvas.setAttribute("height", HEIGHT.toString() );
		canvas.setAttribute("width", WIDTH.toString() );

		draw(offset_left, offset_top);
	}
	window.onresize = resize;

	document.onkeydown = function(event)
	{
		switch(event.keyCode)
		{
			case 65: //LEFT
				is_move_left = true;

			break;

			case 87: //UP
				is_move_up = true;

			break;

			case 68: //RIGHT
				is_move_right = true;

			break;

			case 83: //DOWN
				is_move_down = true;

			break;
		}
	}

	document.onkeyup = function(event)
	{
		switch(event.keyCode)
		{
			case 65: //LEFT
				is_move_left = false;

			break;

			case 87: //UP
				is_move_up = false;

			break;

			case 68: //RIGHT
				is_move_right = false;

			break;

			case 83: //DOWN
				is_move_down = false;

			break;
		}
	}
}
