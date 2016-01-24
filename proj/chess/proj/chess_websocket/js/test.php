<?php

//error_reporting(E_ALL);
set_time_limit(180);
//ob_implicit_flush();

$start_time = round(microtime(true),2);

$socket = stream_socket_server("tcp://127.0.0.1:80", $err_no, $err_str);

if(!$socket)
{
    die($err_str . "(" . $err_no . ")\n");
}

$connects = array();

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
            on_open($connect);
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

        on_message($connect, $data);
    }

	if((round(microtime(true), 2) - $start_time) > 100)
	{ 
		fclose($socket);

		die();
	}
}

fclose($socket);

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


function on_open($connect)
{
    
}

function on_close($connect)
{
    
}

function on_message($connect, $data)
{
    $f = decode($data);

    if($f["payload"] == "die")
    {
        die();
    }

    fwrite($connect, encode($f["payload"]));
}

