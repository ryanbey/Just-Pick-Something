import { buildNextRound } from './renderer.js';

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

export function createNextButtonListener(nextButton) {
    nextButton.addEventListener('click', () => {
        buildNextRound();
    })
}

export function getCategoryTitle() {
    let pageTitle = document.getElementsByTagName('title')[0].innerHTML;
    let categoryTitle =  pageTitle.substring(0, pageTitle.indexOf(' |'));
    return categoryTitle;
}