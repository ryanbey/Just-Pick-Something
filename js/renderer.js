import { getJSON } from "./utils.js";

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
export function buildMatchups(jsonURL) {
    getJSON(jsonURL).then(data => {
        // Index for choosing correct bracket based on page title
        let bracketIndex = 0;

        // Get HTML page title
        let fullTitle = document.getElementsByTagName('title')[0].innerHTML;
        let pageTitle = fullTitle.substring(0, fullTitle.indexOf(' |'));
        let categoryHeading = document.querySelector('.heading-category');
        categoryHeading.innerHTML = pageTitle;
        
        // Check if a category in json that matches page title
        let brackets = data['brackets'];
        for (let i = 0; i < brackets.length; i++) {
            // If there is a match, set idex to corresponding bracket
            if (pageTitle ==  brackets[i].name) {
                bracketIndex = i;
            }
        }

        let category = brackets[bracketIndex].list;
        console.log(category);

        
        // Now that we have the correct category from the json, build the matchups HTML
        let matchupNum = 1;  // Used in loop for attribute naming
        for (let i = 0; i < category.length; i+=2) {
            // Creating elements
            let matchupList = document.querySelector('.matchup-list');
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
    });

    // Event listener for button press animation
    // let allButtons = document.querySelectorAll('body');
    // allButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         console.log("hello");
    //     })
    // })
}

// Builds bracket on the page
// export function buildBracket(jsonURL) {
//     getJSON(jsonURL).then(data => {
        
//     });
// }