import * as brackets from './brackets.js';

// Fetches premade JSON file
export function getJSON(url) {
    return fetch(url)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            // console.log(response.json());
            return response.json();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export function getCategoryTitle() {
    let pageTitle = document.getElementsByTagName('title')[0].innerHTML;
    let categoryTitle =  pageTitle.substring(0, pageTitle.indexOf(' |'));
    return categoryTitle;
}

// Gets all checked radio inputs on page starting from specified index
export function getCheckedRadios(index, allRadios, allLabels) {
    let checkedRadios = [];  // Array for all checked options
    for (let i = index; i < allRadios.length; i++) {
        // If the radio is checked
        if (allRadios[i].checked) {
            // Add that labels text to the checkedRadios array
            checkedRadios.push(allLabels[i].innerHTML);
        }
    }
    return checkedRadios;
}

// Shuffles arrays for building initial brackets to randomize matchups
export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Creates event listener for the next button in round 1
export function createRound2ButtonListener(nextButton) {
    nextButton.addEventListener('click', () => {
        brackets.buildRound2();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })
}

// Creates event listener for the next button in round 2
export function createRound3ButtonListener(nextButton) {
    nextButton.addEventListener('click', () => {
        brackets.buildRound3();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })
}

// Creates event listener for the next button in round 3
export function createWinnerButtonListener(nextButton) {
    nextButton.addEventListener('click', () => {
        brackets.buildWinnerBox();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })
}

// Creates event listener for the restart button at the end of the bracket
export function createRestartListener(button) {
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {  location.reload(); }, 750);
    })
}

// Creates event listener for the main menu button at the end of the bracket
export function createMenuListener(button) {
    button.addEventListener('click', () => {
        location.href = "https://ryanbey.github.io/just-pick-something/index.html";
    })
}
