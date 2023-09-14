$(document).ready(function() {
  let counterOrigColor = "";

  $(".new-tweet form textarea").on("input", function(e) {
    const charCount = $(this).val().length;
    const counterVal = 140 - charCount;

    const counterElem = $(".new-tweet form .counter");
    counterElem.text(`${counterVal}`);

    // Change color to red when count is negative
    if (counterVal < 0 && !counterElem.hasClass("red-text")) {
      counterElem.addClass("red-text");
    } else if (counterVal >= 0 && counterElem.hasClass("red-text")) {
      counterElem.removeClass("red-text");
    }
  });
});