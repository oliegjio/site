(function() {
  $(document).ready(function() {
    var err;
    $(".count_element").on("click", function() {
      ga("send", "event", "goal", "goal");
      yaCounterXXXXXXXX.reachGoal("goal");
      return true;
    });
    if (!Modernizr.svg) {
      $("img[src*='svg']").attr("src", function() {
        return $(this).attr("src", replace(".svg", ".png"));
      });
    }
    $("#form").submit(function() {
      var callback;
      callback = function() {
        return $("#form").trigger("reset");
      };
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(this).serialize()
      }).done(function() {
        alert("Спасибо за заявку!");
        return setTimeout(callback, 1000);
      });
      return false;
    });
    try {
      $.browserSelector();
      if ($("html").hasClass("chrome")) {
        $.smoothScroll();
      }
    } catch (_error) {
      err = _error;
    }
    return $("img, a").on("dragstart", function(event) {
      return event.preventDefault();
    });
  });

  $(window).load(function() {
    $(".loader_inner").fadeOut();
    return $(".loader").delay(400).fadeOut("slow");
  });

}).call(this);
