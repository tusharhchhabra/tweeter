$(document).ready(function() {
  let counterOrigColor = "";

  $(".new-tweet textarea").on("input", function(e) {
    const charCount = $(this).val().length;
    const counterVal = 140 - charCount;

    const $counterElem = $(".new-tweet .counter");
    $counterElem.text(`${counterVal}`);

    // Change color to red when count is negative
    if (counterVal < 0 && !$counterElem.hasClass("red-text")) {
      $counterElem.addClass("red-text");
    } else if (counterVal >= 0 && $counterElem.hasClass("red-text")) {
      $counterElem.removeClass("red-text");
    }

    // Remove submit error text when character count enters valid range 
    if ($(".new-tweet #error-message").css("display") !== "none") {
      if (counterVal >= 0 && counterVal <= 140) {
        $("#error-message").slideUp();
      }
    }
  });
});