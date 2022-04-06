import * as renderer from "./renderer.js";
import * as utils from "./utils.js";

// Gets data from JSON file
export function buildMainMenu(jsonURL) {
    utils.getJSON(jsonURL).then(data => { 
        let brackets = data['brackets'];
        console.log("Data: ", brackets);
        renderer.displayMainMenu(brackets);
    });
}

// Gets all the entries from a categorty and creates the matchups
export function buildRound1(jsonURL) {
    utils.getJSON(jsonURL).then(data => {
        // Check if a category in json that matches page title
        let brackets = data['brackets'];
        let bracketIndex = 0;
        for (let i = 0; i < brackets.length; i++) {
            // If there is a match, set index to corresponding bracket
            if (utils.getCategoryTitle() == brackets[i].name) {
                bracketIndex = i;
            }
        }
        let category = brackets[bracketIndex].list;  // Build array from json
        category = utils.shuffleArray(category);     // Shuffle options
        renderer.displayRound(1, 1, category);       // roundNum, matchupNum, array
    });
}

// Build round 2 based on all checked radio inputs (just round 1 at this point)
export function buildRound2() {
    let nextButton = document.querySelector('#btn-start-r2');
    let allRadios = document.getElementsByTagName('input');
    let allLabels = document.getElementsByTagName('label');
    let checkedRadios = utils.getCheckedRadios(0, allRadios, allLabels);

    // Only continue if every matchup has a selection
    if (checkedRadios.length === allRadios.length / 2) {
        renderer.displayRound(2, 5, checkedRadios);  // roundNum, matchupNum, array
        renderer.hideElement(nextButton);
    }
    else {
        if (!nextButton.innerHTML.includes('Incomplete!')) {
            nextButton.innerHTML += "<br><span class='next-round-error-msg'>Incomplete!</span>";
        }
    }
}

// Build round 3 based on all checked radio inputs from round 2 only
export function buildRound3() {
    let nextButton = document.querySelector('#btn-start-r3');
    let allRadios = document.getElementsByTagName('input');
    let allLabels = document.getElementsByTagName('label');
    let checkedRadios = utils.getCheckedRadios(8, allRadios, allLabels);  // index 8 to only get checked radios from r2

    // Only continue if every matchup has a selection
    // At this point, checkedRadios only has 2 items out of 12 total on the page, hence the 6
    if (checkedRadios.length === allRadios.length / 6) {
        renderer.displayRound(3, 7, checkedRadios);  // roundNum, matchupNum, array
        renderer.hideElement(nextButton);
    }
    else {
        if (!nextButton.innerHTML.includes('Incomplete!')) {
            nextButton.innerHTML += "<br><span class='next-round-error-msg'>Incomplete!</span>";
        }
    }
}

// Build the box for the winning choice
export function buildWinnerBox() {
    // Get last checked radio item (Final checked == winner)
    let nextButton = document.querySelector('#btn-show-winner');
    let allRadios = document.getElementsByTagName('input');
    let allLabels = document.getElementsByTagName('label');
    let checkedRadios = utils.getCheckedRadios(0, allRadios, allLabels);
    let winnerIndex = checkedRadios.length - 1;
    let winner = checkedRadios[winnerIndex];

    // Make sure there are no empty rounds
    if (checkedRadios.length === allRadios.length / 2) {
        renderer.displayWinner(winner);
        renderer.hideElement(nextButton);
    }
    else {
        if (!nextButton.innerHTML.includes('Incomplete!')) {
            nextButton.innerHTML += "<br><span class='next-round-error-msg'>Incomplete!</span>";
        }
    }
}