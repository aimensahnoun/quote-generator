//DOM ID Variables

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loadingSpinner = document.getElementById("loader");

//Tweet API Function

function sendTweet() {
  const apiUrl = `http://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}. `;
  window.open(apiUrl, "_blank");
}

function showLoadingSpinner() {
  loadingSpinner.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loadingSpinner.hidden) {
    loadingSpinner.hidden = true;
    quoteContainer.hidden = false;
  }
}

//Fetching Quote Function

async function getQuote() {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    showLoadingSpinner();
    fetch(proxy + apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.quoteAuthor === "") {
          quoteAuthor.innerText = "Unknown";
        } else {
          quoteAuthor.innerText = data.quoteAuthor;
        }
        if (data.quoteText > 120) {
          quoteText.classList.add("long-quote");
        } else {
          quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        hideLoadingSpinner();
      })
      .catch((err) => {
        getQuote();
      });
  } catch (e) {
    console.log("OOOOOPS something went wrong!");
  }
}

// New Quote Button Event Listener

newQuoteBtn.addEventListener("click", getQuote);

//Tweet Button Event Listener

tweetBtn.addEventListener("click", sendTweet);

// Build

getQuote();
