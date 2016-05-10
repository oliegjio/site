<?php

session_start();

DEFINE ("DB_USER", "u680548322_main");
DEFINE ("DB_PASSWORD", "xpzZ=]^Rwlk+I=`m>6");
DEFINE ("DB_HOST", "mysql.hostinger.ru");
DEFINE ("DB_NAME", "u680548322_main");

$req_type = json_decode($_POST["type"], true);
$req_mess = json_decode($_POST["message"], true);

$dbc = @mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
OR die(mysql_error());

@mysql_select_db(DB_NAME)
OR die(mysql_error());

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

function ping()
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
		die("enemy_offline");
	}

	if($_SESSION["enemy_connected"] == true)
	{
		if(ping_enemy())
		{
			$_SESSION["enemy_connected"] = false;
			$_SESSION["turn"] = false;
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

			die(json_encode($response));
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

				die(json_encode($response));
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

			die(json_encode($response));
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

function get_sessions()
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

	die(json_encode($response));
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

switch($req_type)
{
	case "change_want_side":
		global $dbc;

		$name = "chess_users_" . $_SESSION["name"];
		$id = $_SESSION["id"];

		$req = "UPDATE $name SET want_side = '$req_mess' WHERE id = '$id'";

		$query = mysql_query($req, $dbc)
		OR die(mysql_error());

		die("want_side changed");
	break;

	case "ping":
		ping();
		die("pinged");
	break;

	case "disconnect":
		delete_session($_SESSION["name"]);
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
				die("session created");
			break;

			case "good_session":
				fill_users_file($_SESSION["id"], false, $req_mess["want_side"]);
				die("entered to session");
			break;

			case "too_many_users":
				die("too_many_users");
			break;

			default: die("switch default");
		}
	break;

	case "get_sessions":
		clear_sessions();
		get_sessions();
	break;

	case "move":
		move();
		die("moved");
	break;

	default: die("fuck the sistem");
}

@mysql_close($dbc)
OR die(mysql_error());

?>