window.onload = function()
{
    function get_browser()
    {
        var ua = navigator.userAgent;    
        if (ua.search(/Chrome/) > 0) return "Chrome";
        if (ua.search(/Firefox/) > 0) return "Firefox";
        if (ua.search(/Opera/) > 0) return "Opera";
        if (ua.search(/Safari/) > 0) return "Safari";
        if (ua.search(/MSIE/) > 0) return "Explorer";
        if (ua.match(/Android/i) > 0) return "Android";
        if (ua.match(/BlackBerry/i) > 0) return "BlackBerry";
        if (ua.match(/iPhone|iPad|iPod/i) > 0) return "iOS";
        if (ua.match(/Opera Mini/i) > 0) return "Opera Mini";
        if (ua.match(/IEMobile/i) > 0) return "Windows";
        return "false";
    }

    function error_msg()
    {
        var p = document.createElement("P");
        document.documentElement.appendChild(p);
        p.innerHTML = "Игра только для Google Chrome";
        p.style.position = "absolute";
        p.style.top = "5%";
        p.style.left = "5%";
        p.style.fontSize = (window.innerHeight / 20) + "px"; 
    }

    function main()
    {
        var border;

        if((window.innerWidth / 2) > window.innerHeight)
        {
            var window_height = window.innerHeight;
            var window_width = window.innerWidth;
        }
        else
        {
            var window_height = window.innerWidth / 2;
            var window_width = window.innerWidth;
        }

        if((window_height / 300) < 1)
        {
            border = 1;
        }
        else
        {
            border = window_height / 300;
        }

        var table = document.getElementsByClassName("table")[0];
        var table2 = document.getElementsByClassName("table2")[0];
        var chat_cell = document.getElementsByClassName("chat_cell")[0];
        var input_cell = document.getElementsByClassName("input_cell")[0];
        var menu_cell = document.getElementsByClassName("menu_cell")[0];
        var connect_cell = document.getElementsByClassName("connect_cell")[0];
        var white_cell = document.getElementsByClassName("white_cell")[0];
        var black_cell = document.getElementsByClassName("black_cell")[0];
        var disconnect_cell = document.getElementsByClassName("disconnect_cell")[0];
        var canvas_cell = document.getElementsByClassName("canvas_cell")[0];
        var sp_cell = document.getElementsByClassName("sp_cell")[0];

        var canvas = document.createElement("CANVAS");
        canvas_cell.appendChild(canvas);
        var context = canvas.getContext("2d");

        var text_area = document.createElement("DIV");
        chat_cell.appendChild(text_area);

        var input = document.createElement("input");
        input_cell.appendChild(input);

        var connect_button = document.createElement("DIV");
        connect_cell.appendChild(connect_button);  

        var disconnect_button = document.createElement("DIV");
        disconnect_cell.appendChild(disconnect_button);

        var sp_button = document.createElement("DIV");
        sp_cell.appendChild(sp_button);

        var want_white_button = document.createElement("DIV");
        white_cell.appendChild(want_white_button);
        
        var want_black_button = document.createElement("DIV");
        black_cell.appendChild(want_black_button);

        table.style.height = window_height + "px";
        table.style.width = window_width + "px";
        
        table2.style.height = window_height + "px";
        table2.style.width = (window_width / 100 * 50) + "px";

        canvas_cell.style.height = window_height + "px";
        canvas_cell.style.width = (window_height - (border * 1.5)) + "px";

        chat_cell.style.width = (window_width / 100 * 50) + "px";
        chat_cell.style.height = (window_height / 100 * 40) + "px";

        menu_cell.style.width =  (window_width / 100 * 50) + "px";

        connect_cell.style.width = (window_height / 100 * 50) + "px";
        disconnect_cell.style.width = (window_height / 100 * 50) + "px";

        canvas.width = (window_height - (border * 1.5));
        canvas.style.border = "solid " + border + "px black";
        canvas.height = (window_height - (border * 1.5));

        text_area.style.border = "solid " + border + "px black";
        text_area.style.padding = "1%";
        text_area.style.font = (window_height / 40) + "px Arial";
        text_area.style.width = "60%";
        text_area.style.height = "100%";

        input.style.border = "solid " + border + "px blue";
        input.style.padding = "1%";
        input.style.font = (window_height / 40) + "px Arial";
        input.style.width = "50%";
        input.setAttribute("maxlength", "20");

        connect_button.style.width = "45%";
        connect_button.style.padding = "3%";
        connect_button.style.font = (window_height / 40) + "px Arial";

        disconnect_button.style.width = "45%";
        disconnect_button.style.padding = "3%";
        disconnect_button.style.font = (window_height / 40) + "px Arial";

        sp_button.style.font = (window_height / 35) + "px Arial";
        sp_button.style.width = "25%";
        sp_button.style.padding = "2.5%";
        sp_button.style.border = "solid " + border * 2 + "px lightblue";

        want_white_button.style.border = "dashed " + border * 2 + "px red";
        want_white_button.style.font = (window_height / 45) + "px Arial";
        want_white_button.style.width = "60%";
        want_white_button.style.padding = "3%";

        want_black_button.style.border = "solid " + border * 2 + "px lightgrey";
        want_black_button.style.font = (window_height / 45) + "px Arial";
        want_black_button.style.width = "60%";
        want_black_button.style.padding = "3%";

        menu_cell.style.verticalAlign = "top";

        connect_cell.style.verticalAlign = "top";

        disconnect_cell.style.verticalAlign = "top";

        sp_cell.style.verticalAlign = "top";

        canvas.style.display = "block";

        text_area.style.textAlign = "center";

        input.style.outline = "none";
        input.setAttribute("placeholder", "Имя лобби");

        connect_button.style.background = "lightgreen";
        connect_button.style.textAlign = "center";
        connect_button.innerHTML = "Подключиться";
        connect_button.style.cursor = "default";

        disconnect_button.style.background = "pink";
        disconnect_button.style.textAlign = "center";
        disconnect_button.innerHTML = "Отключиться";
        disconnect_button.style.cursor = "default";

        sp_button.style.background = "lightblue";
        sp_button.style.textAlign = "center";
        sp_button.innerHTML = "Одиночная игра";
        sp_button.style.cursor = "default";

        want_white_button.style.background = "lightgrey";
        want_white_button.style.textAlign = "center";
        want_white_button.innerHTML = "Играть за белых";
        want_white_button.style.cursor = "default";

        want_black_button.style.background = "black";
        want_black_button.style.textAlign = "center";
        want_black_button.style.color = "white";
        want_black_button.innerHTML = "Играть за черных";
        want_black_button.style.cursor = "default";

        var map = [];

        var side = "white_player";

        var is_game_over = false;

        var mouse_x, mouse_y;

        var last_x_cell, last_y_cell;

        var is_white_castling = false;
        var is_black_castling = false;

        var can_move = false;

        var sp_mod = false;

        var in_session = false;

        var want_black = false;
        var want_white = true;

        function init_map()
        {
            var x_counter = 0,
                y_counter = 0;

            for (var i = 0; i < 8; i++)
            {
                map[i] = [];

                for (var k = 0; k < 8; k++)
                {
                    if (y_counter == 8)
                    {
                        y_counter = 0;
                        x_counter++;
                    }

                    map[i][k] = {};
                    map[i][k].piece = "false";
                    map[i][k].owner = "false";
                    map[i][k].select = false;
                    map[i][k].available = false;
                    map[i][k].castling = "false";
                    map[i][k].enemy_hilight = false;
                    map[i][k].side = 1;
                    map[i][k].w = canvas.width / 8;
                    map[i][k].x = x_counter * map[i][k].w;
                    map[i][k].y = y_counter * map[i][k].w;

                    if (k % 2)
                    {
                        if (i % 2)
                        {
                            map[i][k].c = "white";
                        }
                        else
                        {
                            map[i][k].c = "black";
                        }
                    }
                    else
                    {
                        if (i % 2)
                        {
                            map[i][k].c = "black";
                        }
                        else
                        {
                            map[i][k].c = "white";
                        }
                    }

                    y_counter++;
                }
            }

            for(var i = 0; i < 8; i++)
            {
                map[i][6].piece = "♟";
                map[i][6].owner = "white_player";
                map[i][1].piece = "♟";
                map[i][1].owner = "black_player";
            }

            map[0][0].piece = "♜";
            map[7][0].piece = "♜";
            map[0][0].owner = "black_player";
            map[7][0].owner = "black_player";

            map[0][7].piece = "♜";
            map[7][7].piece = "♜";
            map[0][7].owner = "white_player";
            map[7][7].owner = "white_player";

            map[2][0].piece = "♝";
            map[5][0].piece = "♝";
            map[2][0].owner = "black_player";
            map[5][0].owner = "black_player";

            map[2][7].piece = "♝";
            map[5][7].piece = "♝";
            map[2][7].owner = "white_player";
            map[5][7].owner = "white_player";

            map[1][0].piece = "♞";
            map[6][0].piece = "♞";
            map[1][0].owner = "black_player";
            map[6][0].owner = "black_player";

            map[6][7].piece = "♞";
            map[1][7].piece = "♞";
            map[6][7].owner = "white_player";
            map[1][7].owner = "white_player";

            map[3][0].piece = "♛";
            map[4][0].piece = "♚";
            map[3][0].owner = "black_player";
            map[4][0].owner = "black_player";

            map[4][7].piece = "♛";
            map[3][7].piece = "♚";
            map[4][7].owner = "white_player";
            map[3][7].owner = "white_player";
        }

        function draw()
        {
            for (var i = 0; i < 8; i++)
            {
                for (var k = 0; k < 8; k++)
                {
                    context.fillStyle = map[i][k].c;
                    context.fillRect(map[i][k].x, map[i][k].y, map[i][k].w, map[i][k].w);

                    if (map[i][k].piece != "false")
                    {
                        context.font = String(canvas.width / 9.5) + "px Segoe UI Symbol";
                        context.textBaseline = "middle";
                        context.textAlign = "center";
                        context.lineWidth = 1;

                        if (map[i][k].owner == "black_player")
                        {
                            if (map[i][k].c == "black")
                            {
                                context.strokeStyle = "white";
                                context.fillStyle = "black";
                            }
                            else
                            {
                                context.fillStyle = "black";
                                context.strokeStyle = "black";
                            }
                        }

                        if (map[i][k].owner == "white_player")
                        {
                            if (map[i][k].c == "white")
                            {
                                context.strokeStyle = "black";
                                context.fillStyle = "white";
                            }
                            else
                            {
                                context.fillStyle = "white";
                                context.strokeStyle = "black";
                            }
                        }

                        context.fillText(map[i][k].piece, map[i][k].x + map[i][k].w / 2, map[i][k].y + map[i][k].w / 2);
                        context.strokeText(map[i][k].piece, map[i][k].x + map[i][k].w / 2, map[i][k].y + map[i][k].w / 2);
                    }
                }
            }

            for(var i = 0; i < 8; i++)
            {
                for(var k = 0; k < 8; k++)
                {
                    if(map[i][k].available == true)
                    {
                        context.strokeStyle = "blue";

                        context.lineWidth = canvas.width / 246.5;
                        context.strokeRect(map[i][k].x + canvas.width / 246.5, map[i][k].y + canvas.width / 246.5, map[i][k].w - ((canvas.width / 246.5) * 2), map[i][k].w - ((canvas.width / 246.5) * 2));
                    }

                    if(map[i][k].select == true)
                    {
                        context.strokeStyle = "red";

                        context.lineWidth = canvas.width / 246.5;
                        context.strokeRect(map[i][k].x + canvas.width / 246.5, map[i][k].y + canvas.width / 246.5, map[i][k].w - ((canvas.width / 246.5) * 2), map[i][k].w - ((canvas.width / 246.5) * 2));
                    }

                    if(map[i][k].enemy_hilight == true)
                    {
                        context.strokeStyle = "green";

                        context.lineWidth = canvas.width / 246.5;
                        context.strokeRect(map[i][k].x + canvas.width / 125, map[i][k].y + canvas.width / 125, map[i][k].w - ((canvas.width / 130) * 2), map[i][k].w - ((canvas.width / 125) * 2));
                    }
                }
            }

            if(is_game_over == true)
            {
                context.fillStyle = "darkred";
                context.fillRect(0, canvas.width / 100 * 25, canvas.width, canvas.width / 100 * 50);

                context.strokeStyle = "black";
                context.lineWidth = 15;
                context.strokeRect(0, canvas.width / 100 * 25, canvas.width, canvas.width / 100 * 50);

                context.fillStyle = "white";
                context.strokeStyle = "black";
                context.font = "bold " + String(canvas.width / 11.5) + "px Verdana";
                context.textBaseline = "middle";
                context.textAlign = "center";
                context.lineWidth = 5;

                if(sp_mod == false)
                {
                    if(winner == "white_player")
                    {
                        context.fillText("White Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                        context.strokeText("White Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                    }

                    if(winner == "black_player")
                    {
                        context.fillText("Black Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                        context.strokeText("Black Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                    }
                }
                else
                {
                    if(winner == "white_player")
                    {
                        context.fillText("Black Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                        context.strokeText("Black Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                    }

                    if(winner == "black_player")
                    {
                        context.fillText("White Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                        context.strokeText("White Player win!", canvas.width / 100 * 50, canvas.width / 100 * 50);
                    }
                }
            }
        }

        function is_click_in_canvas()
        {
            if(!((mouse_x > canvas.offsetLeft) &&
                 (mouse_x < canvas.offsetLeft + window.pageXOffset + canvas.width) &&
                 (mouse_y > canvas.offsetTop) &&
                 (mouse_y < canvas.offsetTop + window.pageYOffset + canvas.width)))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        function get_cell()
        {
            if(is_click_in_canvas() == false) return;

            var temp_x = Math.floor((mouse_x - canvas.offsetLeft) / (canvas.width / 8));
            var temp_y = Math.floor((mouse_y - canvas.offsetTop) / (canvas.width / 8));

            return {x: temp_x,
                    y: temp_y};
        }

        function get_winner()
        {
            var king_a, king_b;

            for (var i = 0; i < 8; i++)
            {
                for (var k = 0; k < 8; k++)
                {
                    if (map[i][k].piece == "♚")
                    {
                        if (king_a === undefined)
                        {
                            king_a = map[i][k].owner;
                        }
                        else
                        {
                            king_b = map[i][k].owner;
                        }
                    }
                }
            }

            if (king_a != "false" && king_b !== undefined)
            {
                return "false";
            }
            else
            {
                return king_b;
            }
        }

        function clear_hilighting()
        {
            for(var i = 0; i < 8; i++)
            {
                for(var k = 0; k < 8; k++)
                {
                    map[i][k].available = false;
                    map[i][k].select = false;
                }
            }
        }

        function clear_enemy_hilight()
        {
            for(var i = 0; i < 8; i++)
            {
                for(var k = 0; k < 8; k++)
                {
                    map[i][k].enemy_hilight = false;
                }
            }
        }

        function clear_castling()
        {
            for(var i = 0; i < 8; i++)
            {
                for(var k = 0; k < 8; k++)
                {
                    map[i][k].castling = "false";
                }
            }
        }

        function send_coordinates(x, y, lx, ly, piece, owner, castling)
        {
            if(sp_mod == false)
            {
                var data = 
                {
                	type: "move",
                    x: x,
                    y: y,
                    lx: lx,
                    ly: ly,
                    piece: piece,
                    owner: owner,
                    castling: castling
                }

                socket.send(JSON.stringify(data));
            }
        }

        function clicked()
        {
            if(is_click_in_canvas() == false) return;

            if(is_game_over == true) return;

            if(map[get_cell().x][get_cell().y].available == true)
            {
                clear_hilighting();

                map[last_x_cell][last_y_cell].piece != "♚" ? clear_castling() : false;

                if(map[get_cell().x][get_cell().y].castling != "false")
                {
                    if(map[get_cell().x][get_cell().y].castling == "left")
                    {
                        if(map[last_x_cell][last_y_cell].owner == "white_player")
                        {
                            map[get_cell().x][get_cell().y].piece = map[last_x_cell][last_y_cell].piece;
                            map[get_cell().x][get_cell().y].owner = side;
                            map[last_x_cell][last_y_cell].piece = "false";
                            map[last_x_cell][last_y_cell].owner = "false";

                            map[get_cell().x + 1][get_cell().y].piece = "♜";
                            map[get_cell().x + 1][get_cell().y].owner = side;
                            map[get_cell().x - 1][get_cell().y].piece = "false";
                            map[get_cell().x - 1][get_cell().y].owner = "false";

                            is_white_castling = true;
                        }
                        else
                        {
                            map[get_cell().x + 1][get_cell().y].piece = map[last_x_cell][last_y_cell].piece;
                            map[get_cell().x + 1][get_cell().y].owner = side;
                            map[last_x_cell][last_y_cell].piece = "false";
                            map[last_x_cell][last_y_cell].owner = "false";

                            map[get_cell().x + 2][get_cell().y].piece = "♜";
                            map[get_cell().x + 2][get_cell().y].owner = side;
                            map[get_cell().x - 1][get_cell().y].piece = "false";
                            map[get_cell().x - 1][get_cell().y].owner = "false";

                            is_black_castling = true;
                        }

                        send_coordinates(get_cell().x, get_cell().y, last_x_cell, last_y_cell, map[get_cell().x][get_cell().y].piece, side, "left");
                    }
                    if(map[get_cell().x][get_cell().y].castling == "right")
                    {
                        if(map[last_x_cell][last_y_cell].owner == "white_player")
                        {
                            map[get_cell().x - 1][get_cell().y].piece = map[last_x_cell][last_y_cell].piece;
                            map[get_cell().x - 1][get_cell().y].owner = side;
                            map[last_x_cell][last_y_cell].piece = "false";
                            map[last_x_cell][last_y_cell].owner = "false";

                            map[get_cell().x - 2][get_cell().y].piece = "♜";
                            map[get_cell().x - 2][get_cell().y].owner = side;
                            map[get_cell().x + 1][get_cell().y].piece = "false";
                            map[get_cell().x + 1][get_cell().y].owner = "false";

                            is_white_castling = true;
                        }
                        else
                        {
                            map[get_cell().x][get_cell().y].piece = map[last_x_cell][last_y_cell].piece;
                            map[get_cell().x][get_cell().y].owner = side;
                            map[last_x_cell][last_y_cell].piece = "false";
                            map[last_x_cell][last_y_cell].owner = "false";

                            map[get_cell().x - 1][get_cell().y].piece = "♜";
                            map[get_cell().x - 1][get_cell().y].owner = side;
                            map[get_cell().x + 1][get_cell().y].piece = "false";
                            map[get_cell().x + 1][get_cell().y].owner = "false";

                            is_black_castling = true;
                        }

                        send_coordinates(get_cell().x, get_cell().y, last_x_cell, last_y_cell, map[get_cell().x][get_cell().y].piece, side, "right");
                    }

                    map[get_cell().x][get_cell().y].castling = "false";
                }
                else
                {
                    map[get_cell().x][get_cell().y].piece = map[last_x_cell][last_y_cell].piece;
                    map[get_cell().x][get_cell().y].owner = side;
                    map[last_x_cell][last_y_cell].piece = "false";
                    map[last_x_cell][last_y_cell].owner = "false";

                    send_coordinates(get_cell().x, get_cell().y, last_x_cell, last_y_cell, map[get_cell().x][get_cell().y].piece, side, "false");
                }

                map[get_cell().x][get_cell().y].side++;

                if(sp_mod == false)
                {
                    can_move = false;
                }

                if(sp_mod == true)
                {
                    side == "white_player" ? side = "black_player" : side = "white_player";
                }
                
                draw(); 

                if(get_winner() != "false")
                {
                    is_game_over = true;
                    winner = side;
                    clear_hilighting();
                    clear_enemy_hilight();
                    draw();

                    setTimeout(function(){
                        is_game_over = false;
                        winner = "false";
                        init_map();
                        draw();
                    }, 2000);
                }

                return;
            }
            else
            {
                clear_hilighting();
            }

            if(last_x_cell && last_y_cell)
            {
                map[last_x_cell][last_y_cell].select = false;
            }

            map[get_cell().x][get_cell().y].select == false ? map[get_cell().x][get_cell().y].select = true : false ;

            if(map[get_cell().x][get_cell().y].owner == side && can_move == true)
            {
                var contin = false;

                switch(map[get_cell().x][get_cell().y].piece)
                {
                    case "♟":
                        if(map[get_cell().x][get_cell().y].side == 1)
                        {
                            if(side == "white_player")
                            {
                                if(map[get_cell().x][get_cell().y - 1].owner == "false")
                                {
                                    map[get_cell().x][get_cell().y - 1].available = true;

                                    if(map[get_cell().x][get_cell().y - 2].owner == "false")
                                    {
                                        map[get_cell().x][get_cell().y - 2].available = true;
                                    }
                                }
                                
                                if(get_cell().x != 7)
                                {
                                    if(map[get_cell().x + 1][get_cell().y - 1].owner == "black_player")
                                    {
                                        map[get_cell().x + 1][get_cell().y - 1].available = true;
                                    }
                                }

                                if(get_cell().x != 0)
                                {
                                    if(map[get_cell().x - 1][get_cell().y - 1].owner == "black_player")
                                    {
                                        map[get_cell().x - 1][get_cell().y - 1].available = true;
                                    }
                                }
                            }
                            if(side == "black_player")
                            {
                                if(map[get_cell().x][get_cell().y + 1].owner == "false")
                                {
                                    map[get_cell().x][get_cell().y + 1].available = true;

                                    if(map[get_cell().x][get_cell().y + 2].owner == "false")
                                    {
                                        map[get_cell().x][get_cell().y + 2].available = true;
                                    }
                                } 
                                
                                if(get_cell().x != 7)
                                {
                                    if(map[get_cell().x + 1][get_cell().y + 1].owner == "white_player")
                                    {
                                        map[get_cell().x + 1][get_cell().y + 1].available = true;
                                    }
                                }

                                if(get_cell().x != 0)
                                {
                                    if(map[get_cell().x - 1][get_cell().y + 1].owner == "white_player")
                                    {
                                        map[get_cell().x - 1][get_cell().y + 1].available = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            if(side == "white_player")
                            {
                                if(map[get_cell().x][get_cell().y - 1].owner == "false")
                                {
                                    map[get_cell().x][get_cell().y - 1].available = true;
                                }

                                if(get_cell().x != 7)
                                {
                                    if(map[get_cell().x + 1][get_cell().y - 1].owner == "black_player")
                                    {
                                        map[get_cell().x + 1][get_cell().y - 1].available = true;
                                    }
                                }

                                if(get_cell().x != 0)
                                {
                                   if(map[get_cell().x - 1][get_cell().y - 1].owner == "black_player")
                                    {
                                        map[get_cell().x - 1][get_cell().y - 1].available = true;
                                    } 
                                }
                            }
                            if(side == "black_player")
                            {
                                if(map[get_cell().x][get_cell().y + 1].owner == "false")
                                {
                                   map[get_cell().x][get_cell().y + 1].available = true; 
                                }

                                if(get_cell().x != 7)
                                {
                                    if(map[get_cell().x + 1][get_cell().y + 1].owner == "white_player")
                                    {
                                        map[get_cell().x + 1][get_cell().y + 1].available = true;
                                    }
                                }
                                if(get_cell().x != 0)
                                {
                                    if(map[get_cell().x - 1][get_cell().y + 1].owner == "white_player")
                                    {
                                        map[get_cell().x - 1][get_cell().y + 1].available = true;
                                    }
                                } 
                            }
                        }
                    break;
                    case "♞":
                        if((get_cell().y >= 2) && (get_cell().x > 0))
                        {
                            if(map[get_cell().x - 1][get_cell().y - 2].owner != side)
                            {
                                map[get_cell().x - 1][get_cell().y - 2].available = true;
                            }
                        }

                        if((get_cell().y >= 1) && (get_cell().x >= 2))
                        {
                            if(map[get_cell().x - 2][get_cell().y - 1].owner != side)
                            {
                                map[get_cell().x - 2][get_cell().y - 1].available = true;
                            }
                        }

                        if((get_cell().y <= 5) && (get_cell().x > 0))
                        {
                            if(map[get_cell().x - 1][get_cell().y + 2].owner != side)
                            {
                                map[get_cell().x - 1][get_cell().y + 2].available = true;
                            }
                        }

                        if((get_cell().y <= 5) && (get_cell().x <= 6))
                        {
                            if(map[get_cell().x + 1][get_cell().y + 2].owner != side)
                            {
                                map[get_cell().x + 1][get_cell().y + 2].available = true;
                            }
                        }

                        if((get_cell().y <= 6) && (get_cell().x >= 2))
                        {
                            if(map[get_cell().x - 2][get_cell().y + 1].owner != side)
                            {
                                map[get_cell().x - 2][get_cell().y + 1].available = true;
                            }
                        }

                        if((get_cell().y <= 6) && (get_cell().x <= 5))
                        {
                            if(map[get_cell().x + 2][get_cell().y + 1].owner != side)
                            {
                                map[get_cell().x + 2][get_cell().y + 1].available = true;
                            }
                        }

                        if((get_cell().y >= 1) && (get_cell().x <= 5))
                        {
                            if(map[get_cell().x + 2][get_cell().y - 1].owner != side)
                            {
                                map[get_cell().x + 2][get_cell().y - 1].available = true;
                            }
                        }

                        if((get_cell().y >= 2) && (get_cell().x <= 6))
                        {
                            if(map[get_cell().x + 1][get_cell().y - 2].owner != side)
                            {
                                map[get_cell().x + 1][get_cell().y - 2].available = true;
                            }
                        }
                    break;
                    case "♜":
                        for(var i = 1; i < get_cell().y + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x][get_cell().y - i].owner != side) && (map[get_cell().x][get_cell().y - i].owner != "false"))
                            {
                                map[get_cell().x][get_cell().y - i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x][get_cell().y - i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x][get_cell().y - i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 7 - get_cell().y + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x][get_cell().y + i].owner != side) && (map[get_cell().x][get_cell().y + i].owner != "false"))
                            {
                                map[get_cell().x][get_cell().y + i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x][get_cell().y + i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x][get_cell().y + i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 7 - get_cell().x + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x + i][get_cell().y].owner != side) && (map[get_cell().x + i][get_cell().y].owner != "false"))
                            {
                                map[get_cell().x + i][get_cell().y].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x + i][get_cell().y].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x + i][get_cell().y].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < get_cell().x + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x - i][get_cell().y].owner != side) && (map[get_cell().x - i][get_cell().y].owner != "false"))
                            {
                                map[get_cell().x - i][get_cell().y].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x - i][get_cell().y].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x - i][get_cell().y].available = true;
                        }
                        contin = false;
                    break;
                    case "♝":
                        for(var i = 1; i < 9; i++)
                        {
                            if((i + get_cell().x >= 8) || (i + get_cell().y >= 8))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x + i][get_cell().y + i].owner != side) && (map[get_cell().x + i][get_cell().y + i].owner != "false"))
                            {
                                map[get_cell().x + i][get_cell().y + i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x + i][get_cell().y + i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x + i][get_cell().y + i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 9; i++)
                        {
                            if((get_cell().x - i < 0) || (get_cell().y - i < 0))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x - i][get_cell().y - i].owner != side) && (map[get_cell().x - i][get_cell().y - i].owner != "false"))
                            {
                                map[get_cell().x - i][get_cell().y - i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x - i][get_cell().y - i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x - i][get_cell().y - i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 9; i++)
                        {
                            if((get_cell().x - i < 0) || (get_cell().y + i >= 8))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x - i][get_cell().y + i].owner != side) && (map[get_cell().x - i][get_cell().y + i].owner != "false"))
                            {
                                map[get_cell().x - i][get_cell().y + i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x - i][get_cell().y + i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x - i][get_cell().y + i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 9; i++)
                        {
                            if((i + get_cell().x >= 8) || (get_cell().y - i < 0))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x + i][get_cell().y - i].owner != side) && (map[get_cell().x + i][get_cell().y - i].owner != "false"))
                            {
                                map[get_cell().x + i][get_cell().y - i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x + i][get_cell().y - i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x + i][get_cell().y - i].available = true;
                        }
                        contin = false;
                    break;
                    case "♛":
                        for(var i = 1; i < get_cell().y + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x][get_cell().y - i].owner != side) && (map[get_cell().x][get_cell().y - i].owner != "false"))
                            {
                                map[get_cell().x][get_cell().y - i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x][get_cell().y - i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x][get_cell().y - i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 7 - get_cell().y + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x][get_cell().y + i].owner != side) && (map[get_cell().x][get_cell().y + i].owner != "false"))
                            {
                                map[get_cell().x][get_cell().y + i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x][get_cell().y + i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x][get_cell().y + i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 7 - get_cell().x + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x + i][get_cell().y].owner != side) && (map[get_cell().x + i][get_cell().y].owner != "false"))
                            {
                                map[get_cell().x + i][get_cell().y].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x + i][get_cell().y].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x + i][get_cell().y].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < get_cell().x + 1; i++)
                        {
                            if(contin == true) continue;

                            if((map[get_cell().x - i][get_cell().y].owner != side) && (map[get_cell().x - i][get_cell().y].owner != "false"))
                            {
                                map[get_cell().x - i][get_cell().y].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x - i][get_cell().y].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;

                            map[get_cell().x - i][get_cell().y].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 9; i++)
                        {
                            if((i + get_cell().x >= 8) || (i + get_cell().y >= 8))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x + i][get_cell().y + i].owner != side) && (map[get_cell().x + i][get_cell().y + i].owner != "false"))
                            {
                                map[get_cell().x + i][get_cell().y + i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x + i][get_cell().y + i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x + i][get_cell().y + i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 9; i++)
                        {
                            if((get_cell().x - i < 0) || (get_cell().y - i < 0))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x - i][get_cell().y - i].owner != side) && (map[get_cell().x - i][get_cell().y - i].owner != "false"))
                            {
                                map[get_cell().x - i][get_cell().y - i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x - i][get_cell().y - i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x - i][get_cell().y - i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 9; i++)
                        {
                            if((get_cell().x - i < 0) || (get_cell().y + i >= 8))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x - i][get_cell().y + i].owner != side) && (map[get_cell().x - i][get_cell().y + i].owner != "false"))
                            {
                                map[get_cell().x - i][get_cell().y + i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x - i][get_cell().y + i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x - i][get_cell().y + i].available = true;
                        }
                        contin = false;

                        for(var i = 1; i < 9; i++)
                        {
                            if((i + get_cell().x >= 8) || (get_cell().y - i < 0))
                            {
                                break;
                            }

                            if(contin == true) continue;

                            if((map[get_cell().x + i][get_cell().y - i].owner != side) && (map[get_cell().x + i][get_cell().y - i].owner != "false"))
                            {
                                map[get_cell().x + i][get_cell().y - i].available = true;
                                contin = true;
                            }

                            if(map[get_cell().x + i][get_cell().y - i].owner == side)
                            {
                                contin = true;
                            }

                            if(contin == true) continue;  

                            map[get_cell().x + i][get_cell().y - i].available = true;
                        }
                        contin = false;
                    break;
                    case "♚":
                        if(get_cell().x < 7)
                        {
                            if(map[get_cell().x + 1][get_cell().y].owner != side)
                            {
                                map[get_cell().x + 1][get_cell().y].available = true;
                            }
                        }
                        if(get_cell().x > 0)
                        {
                            if(map[get_cell().x - 1][get_cell().y].owner != side)
                            {
                                map[get_cell().x - 1][get_cell().y].available = true;
                            }
                        }
                        if(get_cell().y < 7)
                        {
                            if(map[get_cell().x][get_cell().y + 1].owner != side)
                            {
                                map[get_cell().x][get_cell().y + 1].available = true;
                            }
                        }
                        if(get_cell().y > 0)
                        {
                            if(map[get_cell().x][get_cell().y - 1].owner != side)
                            {
                                map[get_cell().x][get_cell().y - 1].available = true;
                            }
                        }
                        if((get_cell().x > 0) && (get_cell().y > 0))
                        {
                            if(map[get_cell().x - 1][get_cell().y - 1].owner != side)
                            {
                                map[get_cell().x - 1][get_cell().y - 1].available = true;
                            }
                        }
                        if((get_cell().x < 7) && (get_cell().y < 7))
                        {
                            if(map[get_cell().x + 1][get_cell().y + 1].owner != side)
                            {
                                map[get_cell().x + 1][get_cell().y + 1].available = true;
                            }
                        }
                        if((get_cell().x > 0) && (get_cell().y < 7))
                        {
                            if(map[get_cell().x - 1][get_cell().y + 1].owner != side)
                            {
                                map[get_cell().x - 1][get_cell().y + 1].available = true;
                            }
                        }
                        if((get_cell().x < 7) && (get_cell().y > 0))
                        {
                            if(map[get_cell().x + 1][get_cell().y - 1].owner != side)
                            {
                                map[get_cell().x + 1][get_cell().y - 1].available = true;
                            }
                        }

                        if(map[get_cell().x][get_cell().y].owner == "white_player")
                        {
                            if(is_white_castling == false)
                            {
                                if((map[get_cell().x - 3][get_cell().y].owner == side) &&
                                   (map[get_cell().x - 3][get_cell().y].piece == "♜") &&
                                   (map[get_cell().x - 2][get_cell().y].owner == "false") &&
                                   (map[get_cell().x][get_cell().y].side == 1) &&
                                   (map[get_cell().x - 3][get_cell().y].side == 1) &&
                                   (map[get_cell().x - 1][get_cell().y].owner == "false"))
                                {
                                    map[get_cell().x - 2][get_cell().y].available = true;
                                    map[get_cell().x - 2][get_cell().y].castling = "left";
                                }
                                if((map[get_cell().x + 4][get_cell().y].owner == side) &&
                                   (map[get_cell().x + 4][get_cell().y].piece == "♜") &&
                                   (map[get_cell().x + 3][get_cell().y].owner == "false") &&
                                   (map[get_cell().x][get_cell().y].side == 1) &&
                                   (map[get_cell().x + 4][get_cell().y].side == 1) &&
                                   (map[get_cell().x + 1][get_cell().y].owner == "false") &&
                                   (map[get_cell().x + 2][get_cell().y].owner == "false"))
                                {
                                    map[get_cell().x + 3][get_cell().y].available = true;
                                    map[get_cell().x + 3][get_cell().y].castling = "right";
                                }
                            }
                        }
                        else
                        {
                            if(is_black_castling == false)
                            {
                                if((map[get_cell().x + 3][get_cell().y].owner == side) &&
                                   (map[get_cell().x + 3][get_cell().y].piece == "♜") &&
                                   (map[get_cell().x + 2][get_cell().y].owner == "false") &&
                                   (map[get_cell().x][get_cell().y].side == 1) &&
                                   (map[get_cell().x + 3][get_cell().y].side == 1) &&
                                   (map[get_cell().x + 1][get_cell().y].owner == "false"))
                                {
                                    map[get_cell().x + 2][get_cell().y].available = true;
                                    map[get_cell().x + 2][get_cell().y].castling = "right";
                                }
                                if((map[get_cell().x - 4][get_cell().y].owner == side) &&
                                   (map[get_cell().x - 4][get_cell().y].piece == "♜") &&
                                   (map[get_cell().x - 3][get_cell().y].owner == "false") &&
                                   (map[get_cell().x][get_cell().y].side == 1) &&
                                   (map[get_cell().x - 4][get_cell().y].side == 1) &&
                                   (map[get_cell().x - 1][get_cell().y].owner == "false") &&
                                   (map[get_cell().x - 2][get_cell().y].owner == "false"))
                                {
                                    map[get_cell().x - 3][get_cell().y].available = true;
                                    map[get_cell().x - 3][get_cell().y].castling = "left";
                                }
                            }
                        }
                    break;
                }
            }
            
            draw();

            last_x_cell = get_cell().x;
            last_y_cell = get_cell().y;
        }

        function resize()
        {
            if((window.innerWidth / 2) > window.innerHeight)
            {
                var window_height = window.innerHeight;
                var window_width = window.innerWidth;
            }
            else
            {
                var window_height = window.innerWidth / 2;
                var window_width = window.innerWidth;
            }

            if((window_height / 300) < 1)
            {
                border = 1;
            }
            else
            {
                border = window_height / 300;
            }

            table.style.height = window_height + "px";
            table.style.width = window_width + "px";
            
            table2.style.height = window_height + "px";
            table2.style.width = (window_width / 100 * 50) + "px";

            canvas_cell.style.height = window_height + "px";
            canvas_cell.style.width = (window_height - (border * 1.5)) + "px";

            chat_cell.style.width = (window_width / 100 * 50) + "px";
            chat_cell.style.height = (window_height / 100 * 40) + "px";

            menu_cell.style.width =  (window_width / 100 * 50) + "px";

            connect_cell.style.width = (window_height / 100 * 50) + "px";
            disconnect_cell.style.width = (window_height / 100 * 50) + "px";

            canvas.width = (window_height - (border * 1.5));
            canvas.style.border = "solid " + border + "px black";
            canvas.height = (window_height - (border * 1.5));

            text_area.style.border = "solid " + border + "px black";
            text_area.style.padding = "1%";
            text_area.style.font = (window_height / 40) + "px Arial";
            text_area.style.width = "60%";
            text_area.style.height = "100%";

            input.style.padding = "1%";
            input.style.font = (window_height / 40) + "px Arial";
            input.style.width = "50%";

            connect_button.style.width = "45%";
            connect_button.style.padding = "3%";
            connect_button.style.font = (window_height / 40) + "px Arial";

            disconnect_button.style.width = "45%";
            disconnect_button.style.padding = "3%";
            disconnect_button.style.font = (window_height / 40) + "px Arial";

            sp_button.style.font = (window_height / 35) + "px Arial";
            sp_button.style.width = "25%";
            sp_button.style.padding = "3%";

            
            want_white_button.style.font = (window_height / 45) + "px Arial";
            want_white_button.style.width = "60%";
            want_white_button.style.padding = "3%";

            want_black_button.style.border = "solid " + border * 2 + "px lightgrey";
            want_black_button.style.font = (window_height / 45) + "px Arial";
            want_black_button.style.width = "60%";
            want_black_button.style.padding = "3%";

            if(sp_mod == true)
            {
                sp_button.style.fontWeight = "bold";
                sp_button.style.border = "solid " + border * 2 + "px red";
                input.style.border = "solid " + border + "px grey";
            }
            else
            {
                sp_button.style.fontWeight = "normal";
                sp_button.style.border = "solid " + border * 2 + "px lightblue";
                input.style.border = "solid " + border + "px blue";
            }

            if(want_white == true)
            {
                want_white_button.style.border = "dashed " + border * 2 + "px red";
                want_black_button.style.border = "solid " + border * 2 + "px lightgrey";
            }
            if(want_black == true)
            {
                want_white_button.style.border = "solid " + border * 2 + "px black";
                want_black_button.style.border = "dashed " + border * 2 + "px red";
            }

            var x_counter = 0,
                y_counter = 0;

            for(var i = 0; i < 8; i++)
            {
                for(var k = 0; k < 8; k++)
                {
                    if (y_counter == 8)
                    {
                        y_counter = 0;
                        x_counter++;
                    }

                    map[i][k].w = canvas.width / 8;
                    map[i][k].x = x_counter * map[i][k].w;
                    map[i][k].y = y_counter * map[i][k].w;

                    y_counter++; 
                }
            }

            draw();
        }

        init_map();
        draw();

        var socket = new WebSocket("ws://127.0.0.1:8889");

        function try_to_connect()
        {
        	if(!socket)
        	{
        		socket = new WebSocket("ws://127.0.0.1:8889");
        	}
        	else
        	{
        		if(try_to_connect_interval !== undefined && try_to_connect_interval)
        		{
        			clearInterval(try_to_connect_interval);
        		}
        	}

        	if(try_to_connect_interval === undefined)
        	{
        		var try_to_connect_interval = setInterval("try_to_connect", 1000);
        	}
        }
        try_to_connect();

        var res_data;

        socket.onmessage = function(event)
        {
        	res_data = event.data;
        	console.log(res_data);

        	switch(res_data)
        	{
        		case "connect_button_event":
	                if(res_data == "too_many_users")
	                {
	                    create_session();

	                    text_area.innerHTML += "<br><br>В ЭТОМ ЛОББИ СЛИШКОМ МНОГО ИГРОКОВ";

	                    return;
	                }

	                text_area.innerHTML = "<br><br><br>ВЫ НАХОДИТЕСЬ В ЛОББИ: <br>" + '"' + input.value + '"';

	                in_session = true;
	                input.value = "";

	            	break;

            	case "disconnect_button_event":
            		break;

            	case "ping_interval_ping":
            		if(res_data == "enemy_offline")
                    {
                        in_session = false;
                        can_move = false;

                        create_session();

                        text_area.innerHTML += "<br><br><span style='color: red'>ТВОЙ ПРОТИВНИК ВЫШЕЛ ;(</span>";

                        return;
                    }

                    if(res_data == "pinged")
                    {
                        return;
                    }

                    switch(res_data.type)
                    {
                        case "enemy_connected":
                            side = res_data.side;

                            text_area.innerHTML = "<br><br><br><span style='color: green'>СОПЕРНИК ПРИСОЕДЕНИЛСЯ :)</span><br><br>Вы ходите " + (side == "black_player" ? "черными, ход противника" : "белыми, ваш ход");

                            if(res_data.side == "white_player")
                            {
                                can_move = true;
                            }
                            else
                            {
                                can_move = false;
                            }
                        break;

                        case "move":
                            clear_enemy_hilight();

                            text_area.innerHTML = "<br><br><br><span style='color: green'>СОПЕРНИК ПРИСОЕДЕНИЛСЯ :)</span><br><br>Вы ходите " + (side == "black_player" ? "черными" : "белыми") + ", ваш ход";

                            if(res_data.message.castling != "false")
                            {
                                if(res_data.message.castling == "left")
                                {
                                    if(res_data.message.owner == "white_player")
                                    {
                                        map[1][7].piece = "♚";
                                        map[1][7].owner = res_data.message.owner;
                                        map[3][7].piece = "false";
                                        map[3][7].owner = "false";

                                        map[2][7].piece = "♜";
                                        map[2][7].owner = res_data.message.owner;
                                        map[0][7].piece = "false";
                                        map[0][7].owner = "false";

                                        map[1][7].enemy_hilight = true;
                                        map[3][7].enemy_hilight = true;
                                        map[2][7].enemy_hilight = true;
                                        map[0][7].enemy_hilight = true;

                                        is_white_castling = true;
                                    }
                                    else
                                    {
                                        map[2][0].piece = "♚";
                                        map[2][0].owner = res_data.message.owner;
                                        map[4][0].piece = "false";
                                        map[4][0].owner = "false";

                                        map[3][0].piece = "♜";
                                        map[3][0].owner = res_data.message.owner;
                                        map[0][0].piece = "false";
                                        map[0][0].owner = "false";

                                        map[2][0].enemy_hilight = true;
                                        map[4][0].enemy_hilight = true;
                                        map[3][0].enemy_hilight = true;
                                        map[0][0].enemy_hilight = true;
                                        map[1][0].enemy_hilight = true;

                                        is_black_castling = true;
                                    }
                                }
                                if(result.message.castling == "right")
                                {
                                    if(result.message.owner == "black_player")
                                    {
                                        map[5][7].piece = "♚";
                                        map[5][7].owner = result.message.message.owner;
                                        map[3][7].piece = "false";
                                        map[3][7].owner = "false";

                                        map[4][7].piece = "♜";
                                        map[4][7].owner = result.message.owner;
                                        map[7][7].piece = "false";
                                        map[7][7].owner = "false";

                                        map[5][7].enemy_hilight = true;
                                        map[3][7].enemy_hilight = true;
                                        map[4][7].enemy_hilight = true;
                                        map[7][7].enemy_hilight = true;
                                        map[6][7].enemy_hilight = true;

                                        is_white_castling = true;
                                    }
                                    else
                                    {
                                        map[6][0].piece = "♚";
                                        map[6][0].owner = result.message.owner;
                                        map[4][0].piece = "false";
                                        map[4][0].owner = "false";

                                        map[5][0].piece = "♜";
                                        map[5][0].owner = result.message.owner;
                                        map[7][0].piece = "false";
                                        map[7][0].owner = "false";

                                        map[6][0].enemy_hilight = true;
                                        map[4][0].enemy_hilight = true;
                                        map[5][0].enemy_hilight = true;
                                        map[7][0].enemy_hilight = true;

                                        is_black_castling = true;
                                    }
                                }

                                can_move = true;

                                draw();
                                return;
                            }

                            map[result.message.x][result.message.y].piece = result.message.piece;
                            map[result.message.x][result.message.y].owner = result.message.owner;
                            map[result.message.x][result.message.y].enemy_hilight = true;
                            map[result.message.lx][result.message.ly].piece = "false";
                            map[result.message.lx][result.message.ly].owner = "false";
                            map[result.message.lx][result.message.ly].enemy_hilight = true;

                            can_move = true;

                            clicked();
                            draw();

                            if(get_winner() != "false")
                            {
                                is_game_over = true;
                                winner = result.message.owner;
                                clear_hilighting();
                                clear_enemy_hilight();
                                draw();

                                setTimeout(function(){
                                    is_game_over = false;
                                    winner = "false";
                                    init_map();
                                    draw();
                                }, 2000);
                            }
                        break;

                        default: ;
                    }
                    break;

                case "ping_interval_get":
                    if(res_data.length == 0)
                    {
                        text_area.innerHTML = "<br><br>ВВЕДИТЕ ИМЯ ЛОББИ<br>Идет загрузка доступных лобби...<br><br>Нет доступных лобби ;(";

                        return;
                    }

                    text_area.innerHTML = "<br><br>ВВЕДИТЕ ИМЯ ЛОББИ<br>Идет загрузка доступных лобби...<br><br>Доступные лобби: ";

                    for(var i = 0; i < res_data.length; i++)
                    {
                        if(i == res_data.length - 1)
                        {
                            text_area.innerHTML += '"' + res_data[i] + '"';
                        }
                        else
                        {
                            text_area.innerHTML += '"' + res_data[i] + '", ';
                        }
                    }

                	break;

                case "send_coordinates":
                	can_move = false;

                    text_area.innerHTML = "<br><br><br><span style='color: green'>СОПЕРНИК ПРИСОЕДЕНИЛСЯ :)</span><br><br>Вы ходите " + (side == "black_player" ? "черными" : "белыми") + ", ход противника";
            		break;

            	case "":

            		break;
        	}
        }

        window.onbeforeunload = function()
        {
        	socket.close();
        }

        function create_session()
        {
            text_area.innerHTML = "<br><br>ВВЕДИТЕ ИМЯ ЛОББИ<br>Идет загрузка доступных лобби...";

            in_session = false;
        }
        create_session();

        function connect_button_event()
        {
            if(in_session == false && input.value != "" && sp_mod == false)
            {
                var data =
                {
                	type: "new_session",
                	message:
                	{
                		name: input.value,
                    	want_side: want_black ? "black_player" : "white_player"
                	}
                }

                socket.send(JSON.stringify(data));
            }
        }

        function disconnect_button_event()
        {
            if(in_session == true && sp_mod == false)
            {
            	var data = 
            	{
            		type: "disconnect",
            		message: "disconnect"
            	}

            	socket.send(JSON.stringify(data));
                
                in_session = false;
                can_move = false;

                create_session();

                return;
            }
        }

        function sp_button_event()
        {
            if(sp_mod == false)
            {
                sp_mod = true;
                text_area.innerHTML = "<br><br><br><span style='color: blue; font-weight: bold'>ВЫ В ОДИНОЧНОМ РЕЖИМЕ</span>";

                sp_button.style.border = "solid " + border * 2 + "px red";
                sp_button.style.color = "crimson";
                sp_button.style.fontWeight = "bold";

                connect_button.style.background = "lightgrey";
                connect_button.style.color = "grey";

                disconnect_button.style.background = "lightgrey";
                disconnect_button.style.color = "grey";

                input.setAttribute("disabled", "");
                input.style.border = "solid " + border + "px grey";

                var data = 
                {
                	type: "disconnect",
                	message: "disconnect"
                }

                socket.send(JSON.stringify(data));

                side = "white_player";
                can_move = true;
                in_session = false;

                init_map();
                draw();
            }
            else
            {
                sp_mod = false;
                side = "black_player";
                can_move = false;

                create_session();

                sp_button.style.border = "solid " + border * 2 + "px lightblue";
                sp_button.style.color = "black";
                sp_button.style.fontWeight = "normal";

                connect_button.style.background = "lightgreen";
                connect_button.style.color = "black";

                disconnect_button.style.background = "pink";
                disconnect_button.style.color = "black";

                input.removeAttribute("disabled");
                input.style.border = "solid " + border + "px blue";

                init_map();
                draw();
            }
        }

        var ping_interval = setInterval(function()
        {
        	if(socket != undefined)
        	{
        		if(in_session == true && sp_mod == false)
	            {
	            	var data = 
	            	{
	            		type: "ping",
	            		message: "ping"
	            	}

	            	socket.send(JSON.stringify(data));
	            }
	            else if(sp_mod == false)
	            {
	            	var data = 
	            	{
	            		type: "get_sessions",
	            		message: "get_sessions"
	            	}

	            	socket.send(JSON.stringify(data));
	            }
        	}
        }, 5000);

        function want_white_button_event()
        {
            if(want_white == false)
            {
                want_white = true;
                want_black = false;

                want_white_button.style.border = "dashed " + border * 2 + "px red";
                want_black_button.style.border = "solid " + border * 2 + "px lightgrey";

                if(sp_mod == true)
                {
                    side = "white_player";

                    init_map();
                    draw();
                }
            }
        }

        function want_black_button_event()
        {
            if(want_black == false)
            {
                want_black = true;
                want_white = false;

                want_black_button.style.border = "dashed " + border * 2 + "px red";
                want_white_button.style.border = "solid " + border * 2 + "px black";

                if(sp_mod == true)
                {
                    side = "black_player";

                    init_map();
                    draw();
                }
            }
        }

        document.onclick = function (event)
        {
            var target = event.target;

            mouse_x = event.pageX;
            mouse_y = event.pageY;

            clicked();
        }

        window.onresize = function(event)
        {
            resize();
        }

        connect_button.onclick = function()
        {
            connect_button_event();
        }

        disconnect_button.onclick = function()
        {
            disconnect_button_event();
        }

        document.onkeypress = function(event)
        {
            switch(event.keyCode)
            {
                case 13:
                    connect_button_event();
                break;
            }
        }

        sp_button.onclick = function()
        {
            sp_button_event();
        }

        want_black_button.onclick = function()
        {
            want_black_button_event();
        }

        want_white_button.onclick = function()
        {
            want_white_button_event();
        }

        var jq_input = $("input").first();

        jq_input.on("input keydown paste", function()
        {
            var reg = /[^a-zA-Z]/g;

            if(jq_input.val().search(reg) != -1)
            {
                jq_input.val(jq_input.val().replace(reg, ""));
            }
        });
    }

    if(get_browser() != "Chrome")
    {
        error_msg();

        var par = document.getElementsByTagName("P")[0];

        window.onresize = function(event)
        {
            par.style.fontSize = window.innerHeight / 20 + "px";
        }
    }
    else
    {
        main();
    }
}
