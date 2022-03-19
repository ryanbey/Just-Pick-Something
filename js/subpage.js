import { buildBracket } from "./renderer.js";

const jsonURL = '../json/brackets.json';

// Build matchups

// Footer copyright date
document.querySelector('#footer-year').innerText = new Date().getFullYear();