<?php

set_time_limit(180);
//ob_implicit_flush();

DEFINE ("DB_USER", "root");
DEFINE ("DB_PASSWORD", "");
DEFINE ("DB_HOST", "127.0.0.1:3306");
DEFINE ("DB_NAME", "test");

//$req_type = json_decode($_POST["type"], true);
//$req_mess = json_decode($_POST["message"], true);

$dbc = @mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
OR die(mysql_error());

@mysql_select_db(DB_NAME)
OR die(mysql_error());

//error_reporting(E_ALL);


$start_time = round(microtime(true),2);

$socket = stream_socket_server("tcp://127.0.0.1:8889", $err_no, $err_str);

if(!$socket)
{
    die($err_str . "(" . $err_no . ")\n");
}

$connects = array();
$session = array();

while(true)
{
    $read = $connects;
    $read[] = $socket;
    $write = $except = null;

    if(!stream_select($read, $write, $except, null))
    {
        break;
    }

    if(in_array($socket, $read))
    {
        if(($connect = stream_socket_accept($socket, -1)) && handshake($connect))
        {
			$connects[] = $connect;
            unset($read[array_search($socket, $read)]);
        }
    }

    foreach($read as $connect)
    {
        $data = fread($connect, 100000);

        if(!$data)
        {   
			fclose($connect);
            unset($connects[array_search($connect, $connects)]);
            on_close($connect);

            continue;
        }

        $dec_data = json_decode(decode($data)["payload"], true);
	    $req_mess = $dec_data["message"];
	    $req_type = $dec_data["type"];

	    switch($req_type)
		{
			case "change_want_side":
				global $dbc;

				$name = "chess_users_" . $_SESSION["name"];
				$id = $_SESSION["id"];

				$req = "UPDATE $name SET want_side = '$req_mess' WHERE id = '$id'";

				$query = mysql_query($req, $dbc)
				OR die(mysql_error());

				fwrite($connect, "want_side changed");
				die("want_side changed");
			break;

			case "ping":
				ping($connect);
				fwrite($connect, "pinged");
				die("pinged");
			break;

			case "disconnect":
				delete_session($_SESSION["name"]);
				fwrite($connect, "disconnected");
				die("disconnected");
			break;

			case "new_session":
				$_SESSION["name"] = $req_mess["name"];
				$_SESSION["id"] = rand(100000, 999999);
				$_SESSION["enemy_connected"] = false;
				$_SESSION["turn"] = false;

				switch(check_session($_SESSION["name"]))
				{
					case "no_session":
						register_session($req_mess["name"]);
						fill_users_file($_SESSION["id"], false, $req_mess["want_side"]);
						fwrite($connect, "session created");
						die("session created");
					break;

					case "good_session":
						fill_users_file($_SESSION["id"], false, $req_mess["want_side"]);
						fwrite($connect, "entered to session");
						die("entered to session");
					break;

					case "too_many_users":
						fwrite($connect, "too_many_users");
						die("too_many_users");
					break;

					default:
					fwrite($connect, "switch default");
					die("switch default");
				}
			break;

			case "get_sessions":
				clear_sessions();
				get_sessions($connect);
			break;

			case "move":
				move();
				fwrite($connect, "moved");
				die("moved");
			break;

			default:
			fwrite($connect, "fuck the sistem");
			die("fuck the sistem");
		}

        //on_message($connect, $data);
    }

	if((round(microtime(true), 2) - $start_time) > 100)
	{ 
		fclose($socket);

		die();
	}
}

function handshake($connect)
{
    $info = array();

    $line = fgets($connect);
    $header = explode(" ", $line);
    $info["method"] = $header[0];
    $info["uri"] = $header[1];

    while($line = rtrim(fgets($connect)))
    {
        if(preg_match("/\A(\S+): (.*)\z/", $line, $matches))
        {
            $info[$matches[1]] = $matches[2];
        }
        else
        {
            break;
        }
    }

    $address = explode(":", stream_socket_get_name($connect, true));
    $info["ip"] = $address[0];
    $info["port"] = $address[1];

    if(empty($info["Sec-WebSocket-Key"]))
    {
        return false;
    }

    $sec_web_socket_accept = base64_encode(pack("H*", sha1($info["Sec-WebSocket-Key"] . "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")));
    $upgrade = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
        	   "Upgrade: websocket\r\n" .
        	   "Connection: Upgrade\r\n" .
        	   "Sec-WebSocket-Accept:" . $sec_web_socket_accept . "\r\n\r\n";

    fwrite($connect, $upgrade);

    return true;
}

function encode($payload, $type = "text", $masked = false) 
{
    $frame_head = array();
    $payload_length = strlen($payload);

    switch($type)
    {
        case "text":
            $frame_head[0] = 129;
        break;

        case "close":
            $frame_head[0] = 136;
        break;

        case "ping":
            $frame_head[0] = 137;
        break;

        case "pong":
            $frame_head[0] = 138;
        break;
    }

    if($payload_length > 65535)
    {
        $payload_length_bin = str_split(sprintf("%064b", $payload_length), 8);
        $frame_head[1] = ($masked === true) ? 255 : 127;
        for($i = 0; $i < 8; $i++)
        {
            $frame_head[$i + 2] = bindec($payload_length_bin[$i]);
        }

        if($frame_head[2] > 127)
        {
            return array("type" => "", "payload" => "", "error" => "frame too large (1004)");
        }
    }
    elseif($payload_length > 125)
    {
        $payload_length_bin = str_split(sprintf("%016b", $payload_length), 8);
        $frame_head[1] = ($masked === true) ? 254 : 126;
        $frame_head[2] = bindec($payload_length_bin[0]);
        $frame_head[3] = bindec($payload_length_bin[1]);
    }
    else
    {
        $frame_head[1] = ($masked === true) ? $payload_length + 128 : $payload_length;
    }

    foreach(array_keys($frame_head) as $i)
    {
        $frame_head[$i] = chr($frame_head[$i]);
    }

    if($masked === true)
    {
        $mask = array();

        for ($i = 0; $i < 4; $i++)
        {
            $mask[$i] = chr(rand(0, 255));
        }

        $frame_head = array_merge($frame_head, $mask);
    }

    $frame = implode("", $frame_head);

    for($i = 0; $i < $payload_length; $i++)
    {
        $frame .= ($masked === true) ? $payload[$i] ^ $mask[$i % 4] : $payload[$i];
    }

    return $frame;
}

function decode($data)
{
    $unmasked_payload = "";
    $decoded_data = array();

    $first_byte_binary = sprintf("%08b", ord($data[0]));
    $second_byte_binary = sprintf("%08b", ord($data[1]));
    $op_code = bindec(substr($first_byte_binary, 4, 4));
    $is_masked = ($second_byte_binary[0] == "1") ? true : false;
    $payload_length = ord($data[1]) & 127;

    if(!$is_masked)
    {
        return array("type" => "", "payload" => "", "error" => "protocol error (1002)");
    }

    switch($op_code)
    {
        case 1:
            $decoded_data["type"] = "text";
        break;

        case 2:
            $decoded_data["type"] = "binary";
        break;

        case 8:
            $decoded_data["type"] = "close";
        break;

        case 9:
            $decoded_data["type"] = "ping";
        break;

        case 10:
            $decoded_data["type"] = "pong";
        break;

        default: return array("type" => "", "payload" => "", "error" => "unknown op_code (1003)");
    }

    if ($payload_length === 126)
    {
        $mask = substr($data, 4, 4);
        $payload_offset = 8;
        $data_length = bindec(sprintf("%08b", ord($data[2])) . sprintf("%08b", ord($data[3]))) + $payload_offset;
    }
    elseif($payload_length === 127)
    {
        $mask = substr($data, 10, 4);
        $payload_offset = 14;
        $tmp = "";

        for ($i = 0; $i < 8; $i++)
        {
            $tmp .= sprintf("%08b", ord($data[$i + 2]));
        }

        $data_length = bindec($tmp) + $payload_offset;
        unset($tmp);
    }
    else
    {
        $mask = substr($data, 2, 4);
        $payload_offset = 6;
        $data_length = $payload_length + $payload_offset;
    }

    if (strlen($data) < $data_length)
    {
        return false;
    }

    if ($is_masked)
    {
        for ($i = $payload_offset; $i < $data_length; $i++)
        {
            $j = $i - $payload_offset;

            if (isset($data[$i]))
            {
                $unmasked_payload .= $data[$i] ^ $mask[$j % 4];
            }
        }

        $decoded_data["payload"] = $unmasked_payload;
    }
    else
    {
        $payload_offset = $payload_offset - 4;
        $decoded_data["payload"] = substr($data, $payload_offset);
    }

    return $decoded_data;
}

function create_new_users_table($name)
{
	global $dbc;

	$full_name = "chess_users_" . $name;

	$sql = "CREATE TABLE $full_name(
			id INT,
			time INT,
			can_move BOOLEAN,
			side VARCHAR(30) NULL,
			want_side VARCHAR(30)
			);";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());
}

function create_new_messages_table($name)
{
	global $dbc;

	$full_name = "chess_messages_" . $name;

	$sql = "CREATE TABLE $full_name(
			x INT,
			y INT,
			lx INT,
			ly INT,
			piece VARCHAR(30),
			owner VARCHAR(30),
			castling VARCHAR(30) DEFAULT 'false'
			);";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());
}

function delete_session($name)
{
	global $dbc;

	$_SESSION["turn"] = false;

	$sql = "DELETE FROM chess_sessions WHERE session_name = '$name'";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());

	$full_name = "chess_users_" . $name;

	$sql = "DROP TABLE $full_name";

	$query = @mysql_query($sql, $dbc);

	$full_name = "chess_messages_" . $name;
	
	$sql = "DROP TABLE $full_name";

	$query = @mysql_query($sql, $dbc);
}

function register_session($name)
{
	global $dbc;

	$sql = "INSERT INTO chess_sessions(session_name) VALUES ('$name')";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());

	create_new_messages_table($name);
	create_new_users_table($name);
}

function fill_users_file($id, $canmove, $want_side)
{
	global $dbc;

	$name = "chess_users_" . $_SESSION["name"];
	$time = time();

	$sql = "INSERT INTO $name(id, time, can_move, want_side) VALUES ('$id', '$time', '$canmove', '$want_side')";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());
}
function clear_sessions()
{
	global $dbc;

	$sql = "SELECT session_name FROM chess_sessions";

	$query = @mysql_query($sql, $dbc);

	if(!$query) return;

	while($row = mysql_fetch_assoc($query))
	{
		$name = "chess_users_" . $row["session_name"];

		$sql = "SELECT time FROM $name";

		$query_2 = @mysql_query($sql, $dbc)
		OR die(mysql_error());

		while($row_2 = mysql_fetch_assoc($query_2))
		{
			if($row_2["time"] + 12 < time())
			{
				delete_session($row["session_name"]);
				continue;
			}
			continue;
		}
	}
}

function ping_enemy()
{
	global $dbc;

	$name = "chess_users_" . $_SESSION["name"];

	$sql = "SELECT time, id FROM $name";

	$query = @mysql_query($sql, $dbc);
	
	if(!$query) return true;

	while($row = mysql_fetch_assoc($query))
	{
		if($row["id"] != $_SESSION["id"] &&
		   $row["time"] + 11 < time())
		{
			delete_session($_SESSION["name"]);
			return true;
		}
	}

	return false;
}

function is_enemy_connected()
{
	global $dbc;

	$name = "chess_users_" . $_SESSION["name"];

	$sql = "SELECT id FROM $name";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());

	if(mysql_num_rows($query) >= 2)
	{
		return true;
	}

	return false;
}

function ping($connect)
{
	global $dbc;

	$name = "chess_users_" . $_SESSION["name"];
	$time = time();
	$id = $_SESSION["id"];

	$sql = "UPDATE $name SET time = '$time' WHERE id = '$id'";

	$query = @mysql_query($sql, $dbc);

	if(!$query)
	{
		$_SESSION["turn"] = false;
		fwrite($connect, "enemy_offline");
		die("enemy_offline");
	}

	if($_SESSION["enemy_connected"] == true)
	{
		if(ping_enemy())
		{
			$_SESSION["enemy_connected"] = false;
			$_SESSION["turn"] = false;
			fwrite($connect, "enemy_offline");
			die("enemy_offline");
		}


		$message_name = "chess_messages_" . $_SESSION["name"];

		$sql = "SELECT * FROM $message_name";

		$query = @mysql_query($sql, $dbc)
		OR die(mysql_error());

		$sql = "SELECT side, id FROM $name";

		$query_2 = @mysql_query($sql, $dbc)
		OR die(mysql_error());

		while($row = mysql_fetch_assoc($query))
		{
			while($row_2 = mysql_fetch_assoc($query_2))
			{
				if($row["owner"] != $row_2["side"] && $row_2["id"] == $_SESSION["id"])
				{
					$_SESSION["turn"] = true;

					break;
				}
			}
			break;
		}

		if(mysql_num_rows($query) > 0 && $_SESSION["turn"] == true)
		{
			$_SESSION["turn"] = true;

			$response = array();

			mysql_data_seek($query, 0);

			while($row = mysql_fetch_assoc($query))
			{
				$response["type"] = "move";
				$response["message"] = array();
				$response["message"]["x"] = $row["x"];
				$response["message"]["y"] = $row["y"];
				$response["message"]["lx"] = $row["lx"];
				$response["message"]["ly"] = $row["ly"];
				$response["message"]["piece"] = $row["piece"];
				$response["message"]["owner"] = $row["owner"];
				$response["message"]["castling"] = $row["castling"];
			}

			$sql = "DELETE FROM $message_name";

			$query = @mysql_query($sql, $dbc)
			OR die(mysql_error());

			fwrite($connect, encode(json_encode($response)));
		}
		
	}
	else
	{
		if(is_enemy_connected())
		{
			$_SESSION["enemy_connected"] = true;

			$sql = "SELECT want_side, id, side FROM $name";

			$query = @mysql_query($sql, $dbc)
			OR die(mysql_error());

			$first_user = true;
			$second_user = true;
			$flag = false;
			$id = $_SESSION["id"];

			while($row = mysql_fetch_assoc($query))
			{
				if($row["side"] != NULL)
				{
					$flag = true;

					break;
				}

				if($row["id"] == $_SESSION["id"])
				{
					$first_user = $row["want_side"];
				}
				else
				{
					$second_user = $row["want_side"];
				}
			}

			if($flag == true)
			{
				mysql_data_seek($query, 0);

				while($row = mysql_fetch_assoc($query))
				{
					if($row["id"] == $_SESSION["id"])
					{
						$first_user = $row["side"];
					}
					else
					{
						$second_user = $row["side"];
					}
				}

				if($first_user == "white_player") $_SESSION["turn"] = true;

				$response = array("type" => "enemy_connected",
								  "side" => $first_user);

				fwrite($connect, encode(json_encode($response)));
			}

			if($first_user == $second_user)
			{
				if(rand(1, 2) == 1)
				{
					if($first_user == "black_player")
					{
						$second_user = "white_player";
					}
					else
					{
						$second_user = "black_player";
					}
				}
				else
				{
					if($second_user == "black_player")
					{
						$first_user = "white_player";
					}
					else
					{
						$first_user = "black_player";
					}
				}
			}

			if($first_user == "white_player") $_SESSION["turn"] = true;

			$response = array("type" => "enemy_connected",
							  "side" => $first_user);

			$sql = "UPDATE $name SET side = '$first_user' WHERE id = '$id'";

			$query = @mysql_query($sql, $dbc)
			OR die(mysql_error());

			$sql = "UPDATE $name SET side = '$second_user' WHERE id != '$id'";

			$query = @mysql_query($sql, $dbc)
			OR die(mysql_error());

			fwrite($connect, encode(json_encode($response)));
		}
	}
}

function check_session($name)
{
	global $dbc;

	$sql = "SELECT session_name FROM chess_sessions";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());

	while($row = mysql_fetch_assoc($query))
	{
		if($row["session_name"] == $name)
		{
			$name = "chess_users_" . $_SESSION["name"];

			$sql = "SELECT id FROM $name";

			$query_2 = @mysql_query($sql, $dbc)
			OR die(mysql_error());

			if(mysql_num_rows($query_2) >= 2)
			{
				return "too_many_users";
			}
			else
			{
				return "good_session";
			}
		}
	}

	return "no_session";
}

function get_sessions($connect)
{
	global $dbc;

	$sql = "SELECT session_name FROM chess_sessions";

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());

	$response = array();

	while($row = mysql_fetch_assoc($query))
	{
		$name = "chess_users_" . $row["session_name"];

		$sql = "SELECT id FROM $name";

		$query_2 = @mysql_query($sql, $dbc)
		OR die(mysql_error());

		if(mysql_num_rows($query_2) == 1)
		{
			$response[] = $row["session_name"];
		}
	}

	fwrite($connect, encode(json_encode($response)));
}

function move()
{
	global $dbc, $req_mess;

	$name = "chess_messages_" . $_SESSION["name"];

	$x = $req_mess["x"];
	$y = $req_mess["y"];
	$lx = $req_mess["lx"];
	$ly = $req_mess["ly"];
	$owner = $req_mess["owner"];
	$piece = $req_mess["piece"];
	$castling = $req_mess["castling"];

	$sql = "INSERT INTO $name (x, y, lx, ly, piece, owner, castling) VALUES ('$x', '$y', '$lx', '$ly', '$piece', '$owner', '$castling')";

	$_SESSION["turn"] = false;

	$query = @mysql_query($sql, $dbc)
	OR die(mysql_error());
}

fclose($socket);

@mysql_close($dbc)
OR die(mysql_error());

?>