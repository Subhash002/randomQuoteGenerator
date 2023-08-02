const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;
let intervalId;
function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "new Quote for you..";
  fetch("https://www.jcquotes.com/api/quotes/random")
    .then((data) => data.json())
    .then((data) => data.text)
    .then((data) => {
      let i = 0;
      quoteText.innerHTML = "";
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        quoteText.innerHTML += data[i];
        i++;
        if (i === data.length) clearInterval(intervalId);
      }, 50);
      authorName.innerHTML = "James Clear";
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}
speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetURL = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetURL, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

setInterval(randomQuote, 100000);
