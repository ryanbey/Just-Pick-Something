import { getCategoryTitle, getJSON, createRound2ButtonListener, createRound3ButtonListener, createWinnerButtonListener } from "./utils.js";

// Gets data from JSON file
export function buildMainMenu(jsonURL) {
    getJSON(jsonURL).then(data => { 
        let brackets = data['brackets'];
        console.log("Data: ", brackets);

        for (let i = 0; i < brackets.length; i++) {
            // Creating elements
            let menu = document.querySelector('.menu')
            let menuButton = document.createElement('a');
            let menuIconBG = document.createElement('div');
            let menuIcon = document.createElement('img');
            let menuText = document.createElement('p');

            // Filling in content from JSON object
            menuButton.href = brackets[i].link;
            menuIcon.src = brackets[i].iconURL;
            menuText.innerText = brackets[i].name;
            
            // Applying CSS classes
            menuButton.classList.add('menu-button');
            menuIconBG.classList.add('menu-icon-bg');
            menuIcon.classList.add('menu-icon');
            menuText.classList.add('menu-text')
            
            // Appending content
            menu.appendChild(menuButton);
            menuButton.appendChild(menuIconBG);
            menuIconBG.appendChild(menuIcon);
            menuButton.appendChild(menuText);
        }
    });
}

// Gets all the entries from a categorty and creates the matchups
export function buildRound1(jsonURL) {
    getJSON(jsonURL).then(data => {
        // Index for choosing correct bracket based on page title
        let bracketIndex = 0;

        // Get HTML page title
        let categoryHeading = document.querySelector('.heading-category');
        categoryHeading.innerHTML = getCategoryTitle();
        
        // Check if a category in json that matches page title
        let brackets = data['brackets'];
        for (let i = 0; i < brackets.length; i++) {
            // If there is a match, set index to corresponding bracket
            if (getCategoryTitle() == brackets[i].name) {
                bracketIndex = i;
            }
        }

        let category = brackets[bracketIndex].list;
        console.log(category);

        // Now that we have the correct category from the json, build the matchups HTML
        let matchupNum = 1;  // Used in loop for attribute naming
        let matchupList = document.querySelector('.matchup-list');

        for (let i = 0; i < category.length; i += 2) {
            // Creating elements
            let matchup = document.createElement('div');
            let radioItem1 = document.createElement('div');
            let radioInput1 = document.createElement('input');
            let radioLabel1 = document.createElement('label');
            let orText = document.createElement('h3');
            let radioItem2 = document.createElement('div');
            let radioInput2 = document.createElement('input');
            let radioLabel2 = document.createElement('label');

            // Filling in content from JSON object
            matchup.setAttribute('id', `matchup-${matchupNum}`);
            radioInput1.setAttribute('type', 'radio');
            radioInput1.setAttribute('id', `matchup${matchupNum}-1`);
            radioInput1.setAttribute('name', `matchup-${matchupNum}`);
            radioLabel1.setAttribute('for', `matchup${matchupNum}-1`);
            radioLabel1.innerHTML = category[i].name;
            orText.innerHTML = 'OR';
            radioInput2.setAttribute('type', 'radio');
            radioInput2.setAttribute('id', `matchup${matchupNum}-2`);
            radioInput2.setAttribute('name', `matchup-${matchupNum}`);
            radioLabel2.setAttribute('for', `matchup${matchupNum}-2`);
            radioLabel2.innerHTML = category[i + 1].name;

            // Applying CSS classes
            matchup.classList.add('matchup');
            radioItem1.classList.add('radio-item');
            orText.classList.add('or');
            radioItem2.classList.add('radio-item');

            // Appending content
            matchupList.appendChild(matchup);
            matchup.appendChild(radioItem1);
            radioItem1.appendChild(radioInput1);
            radioItem1.appendChild(radioLabel1);
            matchup.appendChild(orText);
            matchup.appendChild(radioItem2);
            radioItem2.appendChild(radioInput2);
            radioItem2.appendChild(radioLabel2);

            matchupNum += 1;
        }

        // Button at the bottom to start next round
        let nextButton = document.createElement('button');
        nextButton.classList.add('next-btn');
        nextButton.setAttribute('id', 'btn-start-r2')
        nextButton.innerHTML = "Next Round<br><img class='down-arrow' src='../icons/icon-down-arrow.png'>";
        matchupList.appendChild(nextButton);

        createRound2ButtonListener(nextButton);
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
        roundHeading.innerHTML = getCategoryTitle() + " | Round 2";
        let matchupList = document.querySelector('.matchup-list');
        matchupList.appendChild(roundHeading);
        let matchupNum = 5;

        for (let i = 0; i < checkedRadios.length; i += 2) {
            // Creating elements
            let matchup = document.createElement('div');
            let radioItem1 = document.createElement('div');
            let radioInput1 = document.createElement('input');
            let radioLabel1 = document.createElement('label');
            let orText = document.createElement('h3');
            let radioItem2 = document.createElement('div');
            let radioInput2 = document.createElement('input');
            let radioLabel2 = document.createElement('label');

            // Filling in content from checkedRadios array
            matchup.setAttribute('id', `matchup-${matchupNum}`);
            radioInput1.setAttribute('type', 'radio');
            radioInput1.setAttribute('id', `matchup${matchupNum}-1`);
            radioInput1.setAttribute('name', `matchup-${matchupNum}`);
            radioLabel1.setAttribute('for', `matchup${matchupNum}-1`);
            radioLabel1.innerHTML = checkedRadios[i];
            orText.innerHTML = 'OR';
            radioInput2.setAttribute('type', 'radio');
            radioInput2.setAttribute('id', `matchup${matchupNum}-2`);
            radioInput2.setAttribute('name', `matchup-${matchupNum}`);
            radioLabel2.setAttribute('for', `matchup${matchupNum}-2`);
            radioLabel2.innerHTML = checkedRadios[i + 1];

            // Applying CSS classes
            matchup.classList.add('matchup');
            radioItem1.classList.add('radio-item');
            orText.classList.add('or');
            radioItem2.classList.add('radio-item');

            // Appending content
            matchupList.appendChild(matchup);
            matchup.appendChild(radioItem1);
            radioItem1.appendChild(radioInput1);
            radioItem1.appendChild(radioLabel1);
            matchup.appendChild(orText);
            matchup.appendChild(radioItem2);
            radioItem2.appendChild(radioInput2);
            radioItem2.appendChild(radioLabel2);
            
            matchupNum += 1;
        }

        // Button at the bottom to start next round
        let nextButton2 = document.createElement('button');
        nextButton2.classList.add('next-btn');
        nextButton2.setAttribute('id', 'btn-start-r3')
        nextButton2.innerHTML = "Next Round<br><img class='down-arrow' src='https://raw.githubusercontent.com/ryanbey/just-pick-something/main/icons/icon-down-arrow.png'>";
        matchupList.appendChild(nextButton2);

        createRound3ButtonListener(nextButton2);
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
        roundHeading.innerHTML = getCategoryTitle() + " | Round 3";
        let matchupList = document.querySelector('.matchup-list');
        matchupList.appendChild(roundHeading);
        let matchupNum = 7;

        for (let i = 0; i < checkedRadios.length; i += 2) {
            // Creating elements
            let matchup = document.createElement('div');
            let radioItem1 = document.createElement('div');
            let radioInput1 = document.createElement('input');
            let radioLabel1 = document.createElement('label');
            let orText = document.createElement('h3');
            let radioItem2 = document.createElement('div');
            let radioInput2 = document.createElement('input');
            let radioLabel2 = document.createElement('label');

            // Filling in content from checkedRadios array
            matchup.setAttribute('id', `matchup-${matchupNum}`);
            radioInput1.setAttribute('type', 'radio');
            radioInput1.setAttribute('id', `matchup${matchupNum}-1`);
            radioInput1.setAttribute('name', `matchup-${matchupNum}`);
            radioLabel1.setAttribute('for', `matchup${matchupNum}-1`);
            radioLabel1.innerHTML = checkedRadios[i];
            orText.innerHTML = 'OR';
            radioInput2.setAttribute('type', 'radio');
            radioInput2.setAttribute('id', `matchup${matchupNum}-2`);
            radioInput2.setAttribute('name', `matchup-${matchupNum}`);
            radioLabel2.setAttribute('for', `matchup${matchupNum}-2`);
            radioLabel2.innerHTML = checkedRadios[i + 1];

            // Applying CSS classes
            matchup.classList.add('matchup');
            radioItem1.classList.add('radio-item');
            orText.classList.add('or');
            radioItem2.classList.add('radio-item');

            // Appending content
            matchupList.appendChild(matchup);
            matchup.appendChild(radioItem1);
            radioItem1.appendChild(radioInput1);
            radioItem1.appendChild(radioLabel1);
            matchup.appendChild(orText);
            matchup.appendChild(radioItem2);
            radioItem2.appendChild(radioInput2);
            radioItem2.appendChild(radioLabel2);
            
            matchupNum += 1;
        }

        // Button at the bottom to start next round
        let nextButton3 = document.createElement('button');
        nextButton3.classList.add('next-btn');
        nextButton.setAttribute('id', 'btn-show-winner')
        nextButton3.innerHTML = "Next Round<br><img class='down-arrow' src='https://raw.githubusercontent.com/ryanbey/just-pick-something/main/icons/icon-down-arrow.png'>";
        matchupList.appendChild(nextButton3);

        createWinnerButtonListener(nextButton3);
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

    
    // Creating Elements
    let matchupList = document.querySelector('.matchup-list');
    let winnerDiv = document.createElement('div');
    let winnerIcon = document.createElement('img');
    let winnerHeading = document.createElement('h3');
    let winnerText = document.createElement('p');

    // Filling in content from winner variable
    winnerIcon.setAttribute('src', '../icons/icon-winner.png')
    winnerHeading.innerHTML = "Winner!"
    winnerText.innerHTML = winner;

    // Applying CSS classes
    winnerDiv.classList.add('winner-box');
    winnerIcon.classList.add('winner-icon');
    winnerHeading.classList.add('winner-heading');
    winnerText.classList.add('winner-text');

    // Appending content
    matchupList.appendChild(winnerDiv);
    winnerDiv.appendChild(winnerIcon);
    winnerDiv.appendChild(winnerHeading);
    winnerDiv.appendChild(winnerText);
}