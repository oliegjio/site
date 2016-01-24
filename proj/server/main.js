/*window.onload = function()
{
	var button = document.getElementById("button");
	var textarea = document.getElementById("textarea");
	var input = document.getElementById("input");

	function buttonclick()
	{
		var request = new XMLHttpRequest();

		request.open("POST", "server.php", true);
		//request.setRequestHeader("", "");
		request.send("q=" + input.value);
		alert(request.status);
		if(request.readyState == 4 && request.status == 200)
		{
			alert("GRATS BEATCH");
			textarea.value += (request.responseText + "\n");
		}
	}

	button.onclick = function(event)
	{
		buttonclick();
	}
}*/
$(document).ready(function()
{
	var button = $("#button");
	var input = $("#input");
	var textarea = $("#textarea");

	var interval = setInterval(function()
	{
		$.ajax({
			type: "POST",
			crossDomain: true,
			url: "server.php",
			data: {request: "get"},
			success: function(result)
			{
				if(!result) return;
				textarea.val(textarea.val() + result + "\n");
			}
		});
	}, 1000);

	function sendmsg()
	{
		$.ajax({
			type: "POST",
			crossDomain: true,
			url: "server.php",
			data: {message: JSON.stringify(input.val())},
		});
	}

	$("#button").click(function()
	{
		sendmsg();
		input.val("");
		input.focus();
	});

	$(document).keyup(function(event)
	{
		if(event.keyCode == 13)
		{
			sendmsg();
			input.val("");
			input.focus();
		}
	});
});