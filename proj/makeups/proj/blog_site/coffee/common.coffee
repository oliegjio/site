$(document).ready ->
	$(".count_element").on "click", ->
		ga "send", "event", "goal", "goal"
		yaCounterXXXXXXXX.reachGoal "goal"
		return true

	unless Modernizr.svg
		$("img[src*='svg']").attr "src", -> $(@).attr "src", replace ".svg", ".png"

	$("#form").submit ->
		callback = -> 
			$("#form").trigger "reset"
		$.ajax
			type: "POST"
			url: "mail.php"
			data: do $(@).serialize
		.done ->
			alert "Спасибо за заявку!"
			setTimeout callback, 1000
		return false

	try
		do $.browserSelector
		if $("html").hasClass "chrome"
			do $.smoothScroll
	catch err

	$("img, a").on "dragstart", (event) -> do event.preventDefault

$(window).load ->
	do $(".loader_inner").fadeOut
	$(".loader").delay 400
	.fadeOut "slow"