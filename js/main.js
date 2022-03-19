import { buildMainMenu } from "./renderer.js";

const jsonURL = 'https://raw.githubusercontent.com/ryanbey/just-pick-something/main/json/brackets.json';

// Builds home page menu
buildMainMenu(jsonURL);

// Footer copyright date
document.querySelector('#footer-year').innerText = new Date().getFullYear();

// NOTES!
// Use multipage form to get matchup results
// Populate first matchups based on json contents
// Populate next matchups based on results of the previous matchup
// https://www.w3schools.com/howto/howto_js_form_steps.asp