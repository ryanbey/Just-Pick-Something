import * as utils from "./utils.js";

// Renders content for Main Menu
export function displayMainMenu(array) {
    for (let i = 0; i < array.length; i++) {
        // Creating elements
        let menu = document.querySelector('.menu')
        let menuButton = document.createElement('a');
        let menuIconBG = document.createElement('div');
        let menuIcon = document.createElement('img');
        let menuText = document.createElement('p');

        // Filling in content from JSON object
        menuButton.href = array[i].link;
        menuIcon.src = array[i].iconURL;
        menuText.innerText = array[i].name;
        
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
}

// Renders content for each round
export function displayRound(roundNum, matchupNum, array) {
    let roundHeading = document.createElement('h2');
    roundHeading.innerHTML = utils.getCategoryTitle() + " | Round " + roundNum;
    let matchupList = document.querySelector('.matchup-list');
    matchupList.appendChild(roundHeading);

    for (let i = 0; i < array.length; i += 2) {
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
        if (roundNum == 1) { radioLabel1.innerHTML = array[i].name; }
        else { radioLabel1.innerHTML = array[i]; }
        orText.innerHTML = 'OR';
        radioInput2.setAttribute('type', 'radio');
        radioInput2.setAttribute('id', `matchup${matchupNum}-2`);
        radioInput2.setAttribute('name', `matchup-${matchupNum}`);
        radioLabel2.setAttribute('for', `matchup${matchupNum}-2`);
        if (roundNum == 1) { radioLabel2.innerHTML = array[i + 1].name; }
        else { radioLabel2.innerHTML = array[i + 1]; }

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
    nextButton.innerHTML = "Next Round<br><img class='down-arrow' src='https://raw.githubusercontent.com/ryanbey/just-pick-something/main/icons/icon-down-arrow.png'>";
    matchupList.appendChild(nextButton);
    
    switch (roundNum) {
        case 1:
            nextButton.setAttribute('id', 'btn-start-r2')
            utils.createRound2ButtonListener(nextButton);
            break;
        case 2:
            nextButton.setAttribute('id', 'btn-start-r3')
            utils.createRound3ButtonListener(nextButton);
            break;
        case 3:
            nextButton.setAttribute('id', 'btn-show-winner')
            utils.createWinnerButtonListener(nextButton);
            break;
    }
}

// Renders content for winner box
export function displayWinner(winner) {
    // Creating Elements
    let matchupList = document.querySelector('.matchup-list');
    let winnerDiv = document.createElement('div');
    let winnerIcon = document.createElement('img');
    let winnerIconBG = document.createElement('div')
    let winnerHeading = document.createElement('h3');
    let winnerText = document.createElement('p');
    let buttonsFlex = document.createElement('div');
    let restartBtn = document.createElement('div');
    let menuBtn = document.createElement('div');

    // Filling in content from winner variable
    winnerIcon.setAttribute('src', 'https://raw.githubusercontent.com/ryanbey/just-pick-something/main/icons/icon-winner.png');
    winnerHeading.innerHTML = "Winner!"
    winnerText.innerHTML = winner;
    restartBtn.innerHTML = "Restart";
    menuBtn.innerHTML = "Main Menu";

    // Create event listeners
    utils.createRestartListener(restartBtn);
    utils.createMenuListener(menuBtn);

    // Applying CSS classes
    winnerDiv.classList.add('winner-box');
    winnerIcon.classList.add('winner-icon');
    winnerIconBG.classList.add('winner-icon-bg');
    winnerHeading.classList.add('winner-heading');
    winnerText.classList.add('winner-text');
    buttonsFlex.classList.add('winner-options');
    restartBtn.classList.add('winner-button');
    menuBtn.classList.add('winner-button');

    // Appending content
    matchupList.appendChild(winnerDiv);
    winnerIconBG.appendChild(winnerIcon);
    winnerDiv.appendChild(winnerIconBG);
    winnerDiv.appendChild(winnerHeading);
    winnerDiv.appendChild(winnerText);
    buttonsFlex.appendChild(restartBtn);
    buttonsFlex.appendChild(menuBtn);
    winnerDiv.appendChild(buttonsFlex);
}

// Removes button from the page. Technically would remove anything from the page, but I'm using it for buttons. Science.
export function hideElement(button) {
    button.innerHTML = '';  // Clear content
    button.classList.add('hidden');
}