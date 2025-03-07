/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeString = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const { format } = window.timeago;

  return $(
    `<article class="tweet">
    <header>
      <div>
        <img src="${tweet["user"]["avatars"]}" />
        ${escapeString(tweet["user"]["name"])}
      </div>
      <p>
        ${escapeString(tweet["user"]["handle"])}
      </p>
    </header>
    <p class="tweet-text">
      ${escapeString(tweet["content"]["text"])}
    </p>
    <footer>
      ${format(tweet["created_at"])}
      <div class="actions">
        <button><i class="fa-solid fa-flag"></i></button>
        <button><i class="fa-solid fa-retweet"></i></button>
        <button><i class="fa-solid fa-heart"></i></button>
      </div>
    </footer>
  </article>`
  );
};

const renderTweets = function(tweets) {
  const $tweetContainer = $("#tweets-container");
  $tweetContainer.empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.prepend($tweet);
  }
};

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    type: "GET",
    success: function(tweets) {
      renderTweets(tweets);
    }
  });
};

$(document).ready(function() {
  loadTweets();

  $(".new-tweet-button").on("click", function(e) {
    $(".new-tweet form textarea").focus();
  })

  $(".new-tweet form").submit(function(e) {
    e.preventDefault();

    const tweetLength = $("#tweet-text").val().length;
    const trimmedLength = $("#tweet-text").val().trim().length;

    if (trimmedLength === 0) {
      const $errElem = $("#error-message")
      $errElem.text("A tweet can't be empty!")
      $errElem.slideDown();
      return;
    } else if (tweetLength > 140) {
      const $errElem = $("#error-message")
      $errElem.text("The tweet's length exceeds the 140-character limit.")
      $errElem.slideDown();
      return;
    }

    const tweetData = $("#tweet-text").serialize();
    $("#tweet-text").val("")
    $(".new-tweet .counter").text(140)

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: tweetData,
      success: function() {
        loadTweets();
      }
    });
  });
});
