var canvas = document.createElement("CANVAS");
canvas.width = "550";
canvas.height = "550";
document.documentElement.appendChild(canvas);
var ctx = canvas.getContext("2d");

var map = [];

function init_map()
{
    for(var i = 0; i < 1000; i++)
    {
        map[i] = [];

        for(var k = 0; k < 1000; k++)
        {

            map[i][k] =
            {
                x: 0,
                y: 0,
                d: 0,
                c: "rgb(0,0,0)"
            }
        }
    }
}

function fill_map()
{
    var x_сounter = 0,
        y_сounter = 0;

    for(var i = 0; i < map.length; i++)
    {
        for(var k = 0; k < map[i].length; k++)
        {
            if(x_сounter == 15)
            {
                x_сounter = 0;
                y_сounter += 1;
            }

            map[i][k].x = x_сounter * 50;
            map[i][k].y = y_сounter * 50;
            map[i][k].d = 70;

            if(k % 2)
            {
                map[i][k].c = "rgb(255,0,0)";
            }
            else
            {
                map[i][k].c = "rgb(0,255,0)";
            }

            x_сounter++;
        }
    }
}

function draw_map()
{
    for(var i = 0; i < map.length; i++)
    {
        for(var k = 0; k < map[i].length; k++)
        {
            ctx.fillStyle = map[i][k].c;
            ctx.fillRect(map[i][k].x, map[i][k].y, map[i][k].d, map[i][k].d);
        }
    }
}

init_map();
fill_map();
draw_map();

ctx.beginPath();
ctx.fillStyle = "blue";
ctx.arc(275, 275, 25, 0, Math.PI * 2, true);
ctx.fill();

document.onkeypress = function(event)
{
    var target = event.target;

    switch(event.keyCode)
    {
        case 39:
            
            break;
    }
}