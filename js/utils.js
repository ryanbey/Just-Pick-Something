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

export function createRound2ButtonListener(nextButton) {
    nextButton.addEventListener('click', () => {
        brackets.buildRound2();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })
}

export function createRound3ButtonListener(nextButton) {
    nextButton.addEventListener('click', () => {
        brackets.buildRound3();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })
}

export function createWinnerButtonListener(nextButton) {
    nextButton.addEventListener('click', () => {
        brackets.buildWinnerBox();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    })
}
