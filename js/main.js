import { buildMainMenu } from "./brackets.js";

const jsonURL = 'https://raw.githubusercontent.com/ryanbey/just-pick-something/main/json/brackets.json';

// Builds home page menu
buildMainMenu(jsonURL);

// Footer copyright date
document.querySelector('#footer-year').innerText = new Date().getFullYear();