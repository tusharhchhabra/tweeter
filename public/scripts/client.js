/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1694486682177
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1694573082177
  }
];

const createTweetElement = function(tweet) {
  return $(
    `<article class="tweet">
    <header>
      <div>
        <img src="${tweet["user"]["avatars"]}" />
        ${tweet["user"]["name"]}
      </div>
      <p>
        ${tweet["user"]["handle"]}
      </p>
    </header>
    <p class="tweet-text">
      ${tweet["content"]["text"]}
    </p>
    <footer>
      ${tweet["created_at"]}
      <div class="actions">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
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
      console.log(tweets);
      renderTweets(tweets);
    }
  });
};

$(document).ready(function() {
  $(".new-tweet form").submit(function(e) {
    e.preventDefault();
    const tweetText = $("#tweet-text").serialize();

    console.log(tweetText);

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: tweetText,
      success: function() {
        loadTweets();
      }
    });
  });
});
