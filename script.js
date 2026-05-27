// ===============================
// ZEUS STREAM FINAL SCRIPT.JS
// ===============================


// ===============================
// SMOOTH SCROLL TO TOP
// ===============================

function scrollToTop() {

const c =
document.documentElement.scrollTop ||
document.body.scrollTop;

if (c > 0) {

window.requestAnimationFrame(scrollToTop);

window.scrollTo(0, c - c / 8);

}

}


// ===============================
// ELEMENTS
// ===============================

const htmlBody =
document.querySelector("html, body");

const results =
document.querySelector("#results");

const searchInput =
document.getElementById("search-input");

const searchButton =
document.getElementById("search-button");

const resultsContainer =
document.getElementById("results");


// ===============================
// SCROLL TO RESULTS
// ===============================

const scrollToResults = () => {

const resultsTop = results.offsetTop;

window.scrollTo({

top: resultsTop,

behavior: "smooth",

});

};


// ===============================
// CORS PROXY
// ===============================

const corsProxy =
"https://cors-anywhere.pulkitpareekofficial.workers.dev/?url=";


// ===============================
// OPTIMIZED IMAGE
// ===============================

function optimisedImageUrl(url) {

return url.replace(
"._V1_.",
"._V1_QL75_UX160_."
);

}


// ===============================
// SEARCH MOVIES / TV SERIES
// ===============================

function fetchAndShow() {

const query =
encodeURIComponent(searchInput.value);

const url =
`${corsProxy}https://v3.sg.media-imdb.com/suggestion/x/${query}.json`;

fetch(url)

.then((response) => response.json())

.then((data) => {

const results = data.d;

resultsContainer.innerHTML = "";

results.forEach((result) => {

if (

result.i &&

(result.qid === "movie" ||
result.qid === "tvSeries")

) {

const resultElem =
document.createElement("div");

resultElem.classList.add("result");

resultElem.setAttribute("IMDB", result.id);

let imageAndInfo = "";


// ===============================
// MOVIES
// ===============================

if (result.qid === "movie") {

imageAndInfo = `

<a

onClick="setUrl(this); return setVideo(this);"

url="imdb=${result.id}&type=movie&title=${result.l.replace(/ /g, "_")}"

isWebSeries="false"

title="${result.l}"

class="links"

IMDB="${result.id}"

href="https://vidsrc.su/embed/movie/${result.id}"

target="_blank"

>

<img alt="${result.l}"

src="${optimisedImageUrl(result.i.imageUrl)}">

<div class="info">

<h3>${result.l}</h3>

<p>${result.s}</p>

</div>

</a>

`;

}


// ===============================
// TV SERIES
// ===============================

else if (result.qid === "tvSeries") {

imageAndInfo = `

<a

onClick="setUrl(this); return setVideo(this);"

url="imdb=${result.id}&season=1&episode=1&title=${result.l.replace(/ /g, "_")}"

IMDB="${result.id}"

title="${result.l}"

isWebSeries="true"

class="links"

href="https://vidsrc.su/embed/tv/${result.id}/1/1"

target="_blank"

>

<img alt="${result.l}"

src="${optimisedImageUrl(result.i.imageUrl)}">

<div class="info">

<h3>${result.l}</h3>

<p>${result.s}</p>

</div>

</a>

`;

}

resultElem.innerHTML = imageAndInfo;

resultsContainer.appendChild(resultElem);

}

});

});

}


// ===============================
// FETCH TITLE
// ===============================

const fetchTitle = async (imdbID) => {

const url =
`${corsProxy}https://v3.sg.media-imdb.com/suggestion/x/${imdbID}.json`;

try {

const response = await fetch(url);

const data = await response.json();

return data.d[0].l;

} catch (error) {

console.error(error);

}

};


// ===============================
// UPDATE URL
// ===============================

function setUrl(element) {

let search =
element.getAttribute("url");

window.history.replaceState(
{},
"",
`?${search.replace(/%20/g, "+")}`
);

}


// ===============================
// FILL SEARCH INPUT
// ===============================

function fillSearchInput() {

let searchParams =
new URLSearchParams(window.location.search);

let search =
searchParams.get("search");

if (search) {

search =
search.replace(/\+/g, "%20");

searchInput.value = search;

fetchAndShow();

}

}

fillSearchInput();


// ===============================
// UPDATE SEARCH URL
// ===============================

function updateURL(input) {

let search = input.value;

if (search) {

window.history.replaceState(
{},
"",
`?search=${encodeURIComponent(search).replace(/%20/g, "+")}`
);

} else {

window.history.replaceState(
{},
"",
window.location.pathname
);

}

}


// ===============================
// HIGHLIGHT CARD
// ===============================

function highlightCards() {

let searchParams =
new URLSearchParams(window.location.search);

let imdb_id =
searchParams.get("imdb");

try {

document
.querySelectorAll(".result")
.forEach(function (card) {

card.className = "result";

});

document.querySelector(
`div[IMDB=${imdb_id}]`
).className =
"result hoverClass";

} catch (error) {}

}


// ===============================
// SEARCH INPUT AUTO SEARCH
// ===============================

let timer;

searchInput.addEventListener(
"keyup",

function () {

let inputQuery = this;

clearTimeout(timer);

timer = setTimeout(function () {

updateURL(inputQuery);

fetchAndShow();

scrollToResults();

}, 500);

}

);


// ===============================
// SEARCH BUTTON
// ===============================

searchButton.addEventListener(
"click",

function () {

fetchAndShow();

scrollToResults();

}

);


// ===============================
// VIDEO PLAYER
// ===============================

function setVideo(element) {

const iframe =
document.getElementById("iframe");

const video =
document.getElementById("video");

iframe.src =
element.getAttribute("href");

video.style.display = "block";

scrollToTop();

highlightCards();

return false;

}


// ===============================
// CLOSE VIDEO
// ===============================

function closeVideo() {

document.getElementById("video").style.display =
"none";

document.getElementById("iframe").src =
"";

}


// ===============================
// PLAY BACKGROUND MUSIC
// ===============================

document.addEventListener(
"click",

function () {

const music =
document.getElementById("bgMusic");

if (music) {

music.play();

}

},

{ once: true }

);


// ===============================
// BUTTON CLICK SOUND
// ===============================

document.querySelectorAll("button")
.forEach(button => {

button.addEventListener("click", () => {

const audio = new Audio(
"https://www.soundjay.com/buttons/sounds/button-16.mp3"
);

audio.play();

});

});


// ===============================
// LOADER
// ===============================

window.addEventListener(
"load",

function () {

const loader =
document.getElementById("loader");

if (loader) {

setTimeout(() => {

loader.style.display = "none";

}, 2500);

}

}

);


// ===============================
// APK DOWNLOAD ALERT
// ===============================

const apkBtn =
document.querySelector(".apk-btn");

if (apkBtn) {

apkBtn.addEventListener(
"click",

function () {

alert(
"🔥 ZEUS APK DOWNLOAD STARTING 🔥"
);

}

);

}


// ===============================
// CONSOLE MESSAGE
// ===============================

console.log(
"🔥 ZEUS STREAM ACTIVE 🔥"
);

console.log(
"📞 OWNER 1: +2349066760078"
);

console.log(
"📧 EMAIL: ge5853987@gmail.com"
);
