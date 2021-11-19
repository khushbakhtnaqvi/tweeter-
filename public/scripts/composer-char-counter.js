let maxlen = null;
$(document).ready(function () {

  // Character count down
  $("#tweet-text").keyup(function () {

    maxlen = maxlen === null ? $("#counter").val() : maxlen;
    let keycount = maxlen - $(this).val().length;

    $("#counter").val(keycount);

    if (keycount < 0) {
      $("#counter").css("color", "red");
    } else {
      $("#counter").css("color", "black");
    }
  });
});