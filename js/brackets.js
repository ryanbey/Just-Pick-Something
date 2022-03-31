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
        // Index for choosing correct bracket based on page title
        let bracketIndex = 0;

        // Get HTML page title
        let categoryHeading = document.querySelector('.heading-category');
        categoryHeading.innerHTML = utils.getCategoryTitle();
        
        // Check if a category in json that matches page title
        let brackets = data['brackets'];
        for (let i = 0; i < brackets.length; i++) {
            // If there is a match, set index to corresponding bracket
            if (utils.getCategoryTitle() == brackets[i].name) {
                bracketIndex = i;
            }
        }

        let category = brackets[bracketIndex].list;
        console.log(category);

        // roundNum, matchupNum, array
        renderer.displayRound(1, 1, category);
    });
}

// Build round 2 based on all checked radio inputs (just round 1 at this point)
export function buildRound2() {
    let nextButton = document.querySelector('.next-btn');
    let allRadios = document.getElementsByTagName('input');
    let allLabels = document.getElementsByTagName('label');
    let checkedRadios = [];  // Array for all checked options

    for (let i = 0; i < allRadios.length; i++) {
        // If the radio is checked
        if (allRadios[i].checked) {
            // Add that labels text to the checkedRadios array
            checkedRadios.push(allLabels[i].innerHTML);
        }
    }
    console.log(checkedRadios);

    // Only continue if every matchup has a selection
    if (checkedRadios.length === allRadios.length / 2) {
        // Clear error message on next round button if it's there
        if (nextButton.innerHTML.includes('Incomplete!')) {
            nextButton.innerHTML = "Next Round<br><img class='down-arrow' src='../icons/icon-down-arrow.png'>";
        }
        
        let roundHeading = document.createElement('h2');
        roundHeading.innerHTML = utils.getCategoryTitle() + " | Round 2";
        let matchupList = document.querySelector('.matchup-list');
        matchupList.appendChild(roundHeading);

        // roundNum, matchupNum, array
        renderer.displayRound(2, 5, checkedRadios);
    }
    
    else {
        if (!nextButton.innerHTML.includes('Incomplete!')) {
            nextButton.innerHTML += "<br><span class='next-round-error-msg'>Incomplete!</span>";
        }
    }
}

// Build round 3 based on all checked radio inputs from round 2 only
export function buildRound3() {
    let nextButton = document.querySelector('.next-btn');
    let allRadios = document.getElementsByTagName('input');
    let allLabels = document.getElementsByTagName('label');

    let checkedRadios = [];  // Array for all checked options

    // Start at index 8 to only grab content from round 2
    for (let i = 8; i < allRadios.length; i++) {
        // If the radio is checked
        if (allRadios[i].checked) {
            // Add that labels text to the checkedRadios array
            checkedRadios.push(allLabels[i].innerHTML);
        }
    }
    console.log(checkedRadios);

    // Only continue if every matchup has a selection
    // At this point, checkedRadios only has 2 items out of 12 total on the page, hence the 6
    if (checkedRadios.length === allRadios.length / 6) {
        // Clear error message on next round button if it's there
        if (nextButton.innerHTML.includes('Incomplete!')) {
            nextButton.innerHTML = "Next Round<br><img class='down-arrow' src='../icons/icon-down-arrow.png'>";
        }
        
        let roundHeading = document.createElement('h2');
        roundHeading.innerHTML = utils.getCategoryTitle() + " | Round 3";
        let matchupList = document.querySelector('.matchup-list');
        matchupList.appendChild(roundHeading);
        let matchupNum = 7;

        // roundNum, matchupNum, array
        renderer.displayRound(3, 7, checkedRadios);
    }
    
    else {
        if (!nextButton.innerHTML.includes('Incomplete!')) {
            nextButton.innerHTML += "<br><span class='next-round-error-msg'>Incomplete!</span>";
        }
    }
}

export function buildWinnerBox() {
    // Get last checked radio item (Final checked == winner)
    let allRadios = document.getElementsByTagName('input');
    let allLabels = document.getElementsByTagName('label');
    let checkedRadios = [];  // Array for all checked options

    for (let i = 0; i < allRadios.length; i++) {
        // If the radio is checked
        if (allRadios[i].checked) {
            // Add that labels text to the checkedRadios array
            checkedRadios.push(allLabels[i].innerHTML);
        }
    }
    console.log(checkedRadios);

    let winnerIndex = checkedRadios.length - 1;
    let winner = checkedRadios[winnerIndex];
    console.log(winner);

    renderer.displayWinner(winner);
}