import { buildMatchups } from "./renderer.js";

const jsonURL = 'https://raw.githubusercontent.com/ryanbey/just-pick-something/main/json/brackets.json';

// Build matchups using HTML I made for the first matchup
buildMatchups(jsonURL);

// Footer copyright date
document.querySelector('#footer-year').innerText = new Date().getFullYear();