window.onload = function()
{
	var socket;

    var init = function()
    {
		socket = new WebSocket(document.getElementById("sock_addr").value);

		socket.onopen = connection_open; 
		socket.onmessage = message_received; 

        document.getElementById("sock_send_butt").onclick = function()
        {
            socket.send(document.getElementById("sock_msg").value);
        }

        document.getElementById("sock_disc_butt").onclick = function()
        {
            connection_close();
        }

        document.getElementById("sock_recon_butt").onclick = function()
        {
            socket = new WebSocket(document.getElementById("sock_addr").value);
            socket.onopen = connection_open;
            socket.onmessage = message_received;
        }
    }


	function connection_open()
	{
	   socket.send("Connected with \"" + document.getElementById("sock_addr").value + "\"");
	}

	function message_received(event)
	{
	    console.log("Response: " + event.data);

        document.getElementById("sock_info").innerHTML += (event.data + "<br>");
	}

    function connection_close()
    {
        socket.close();

        document.getElementById("sock_info").innerHTML += "Disconnected<br>";
    }

    init();
}
	