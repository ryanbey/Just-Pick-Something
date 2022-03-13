import { getJSON } from "./utils.js";
import { buildMainMenu } from "./renderer.js";

const jsonURL = '../json/brackets.json';

buildMainMenu(jsonURL);

// Event listeners for main menu buttons to build respective brackets



// Footer copyright date
document.querySelector('#footer-year').innerText = new Date().getFullYear();