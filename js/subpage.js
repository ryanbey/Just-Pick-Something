import { buildRound } from "./renderer.js";

const jsonURL = 'https://raw.githubusercontent.com/ryanbey/just-pick-something/main/json/brackets.json';

buildRound(jsonURL);

// Footer copyright date
document.querySelector('#footer-year').innerText = new Date().getFullYear();