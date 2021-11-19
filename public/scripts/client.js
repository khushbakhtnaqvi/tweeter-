$(document).ready(function () {

  //Load all tweets from initial json tweets file
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json',
      success: (posts) => {
        renderTweets(posts);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadTweets();

  // Render tweets and prepend into twets-container
  const renderTweets = (tweets) => {
    for (let i = 0; i < tweets.length; i++) {
      tweetData = tweets[i];
      const $tweet = createTweetElement(tweetData);
      $('.tweets-container').prepend($tweet);
    }
  }

  // Create tweet element in the required format
  const createTweetElement = (tweet) => {

    const markup = `
      <article class="article-main">
      <div class="divi bor">
        <header class="article-header">
          <div class="avatar">
            <img src="${tweet.user.avatars}">
            <span class="nameTweet">${tweet.user.name}</span>
          </div>
          <div class="handle"><b>${tweet.user.handle}</b></div>
        </header>
        <!-- <label id="tweeted">${escape(tweet.content.text)}</label> -->
        <label id="tweeted">${$("<p>").text(tweet.content.text).html()}</label>
        <footer class="article-footer ">
          <span class="timeago"> ${timeago.format(tweet.created_at)}</span>
          <div>
            <i class="fas fa-flag color"></i>
            <i class="fas fa-retweet color"></i>
            <i class="fas fa-heart color"></i>
          </div>
        </footer>
      </div>
    </article>
    `;

    return markup;
  }

  // Funtion to prevent cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Toggle new tweet form on click
  $("#newTweet").click(function () {
    $("#frmTweet").toggle(2000);
  });

  // Prevent posting form 
  $("form").on("submit", function (event) {
    event.preventDefault();

    // Check if tweet text is empty
    if (!$("#tweet-text").val()) {
      $("#errorMessage").html("Tweet is empty!");
      $("#alert1").slideDown();
      setTimeout(function () { $("#alert1").slideUp(); }, 3000);
      return;
    }

    // Check if tweet size is more than 140 characters
    if ($("#tweet-text").val().length > 140) {
      $("#errorMessage").html("Your tweet message is too long");
      $("#alert1").slideDown();
      setTimeout(function () { $("#alert1").slideUp(); }, 3000);
      return;
    }

    let url = '';
    if (false) {
      err;
    } else {
      url = "/tweets/";
    }

    // Serialize form data    
    const formData = $("#frmTweet").serialize();

    // Ajax request for updating/posting tweets
    $.ajax({
      url: url,
      method: "POST",
      data: formData
    }).then((result) => {
      loadLastTweet();
      $("#tweet-text").val("");
    });


  });

  // Load last submitted tweet fron the database to the tweet container
  const loadLastTweet = () => {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets([tweets[tweets.length - 1]]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

});
