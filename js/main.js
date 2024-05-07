let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let quoteDiv = document.querySelector(".quotes-display");
let quoteId = document.querySelector(".quotes-id");
let autoStatus = document.querySelector(".auto-status");

let intervalId;
let isAutoPlayStarted = false;


generateBtn.addEventListener("click",generateQuotes);
autoBtn.onclick = startAutoPlay;
stopBtn.onclick = stopAutoPlay;


// async function getQuotes(){
//     const response = await fetch("quotes.json");
//     const data = await response.json();
//     return data;
// }
// console.log(getQuotes());
// async function generateQuotes(){
//     const quotes = await getQuotes();
//     const quote = quotes[Math.floor(Math.random() * quotes.length)];
//     quoteDiv.innerHTML = quote.text;
//     quoteId.innerHTML = quote.id;
// }
async function generateQuotes() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        quoteDiv.textContent = data.content;
        quoteId.textContent = data._id;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}



function startOrStopAutoPlay() {
    if (!isAutoPlayStarted) {
        startAutoPlay();
    } else {
        stopAutoPlay();
    }
}

function startAutoPlay() {
    if (!isAutoPlayStarted) {
        intervalId = setInterval(generateQuotes, 3000);
        autoStatus.innerHTML = "Auto: ON";
        autoStatus.style.color = "green";
        isAutoPlayStarted = true;
    }
}

function stopAutoPlay() {
    clearInterval(intervalId);
    autoStatus.innerHTML = "Auto: OFF";
    autoStatus.style.color = "red";
    isAutoPlayStarted = false;
}