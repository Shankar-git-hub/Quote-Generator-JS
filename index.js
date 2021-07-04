"use-strict";

// Declaring Variables

let jsonData = [];
let randomNumbers = 0;
const nextBtn = document.querySelector(".new-quote");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const quoteTextEl = document.querySelector(".quote-text");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

// Function Declaration below:

function nextQuote() {
  randomNumbers = Math.floor(Math.random() * 1642 + 1);
  let quote = jsonData[randomNumbers].text;
  let authorName = jsonData[randomNumbers].author;
  if (quote.length > 60) {
    quoteTextEl.classList.add(".long-quote");
  } else {
    quoteTextEl.classList.remove(".long-quote");
  }
  quoteEl.innerText = quote;
  if (!authorName) {
    authorEl.innerText = "Unknown";
  } else {
    authorEl.innerText = authorName;
  }
}

// Function for fetching API response.

async function getQuote() {
  try {
    loading();
    const url = "https://type.fit/api/quotes";
    const response = await fetch(url);
    jsonData = await response.json();
    nextQuote();
    complete();
  } catch (error) {
    console.log("Catch Block : " + error);
  }
}

function tweetThis() {
  let url = `https://twitter.com/intent/tweet?text=${jsonData[randomNumbers].text} - ${jsonData[randomNumbers].author}`;
  window.open(url, "_blank");
}

function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

nextBtn.addEventListener("click", nextQuote);
twitterBtn.addEventListener("click", tweetThis);

// On Load

getQuote();
