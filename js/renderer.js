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

export function buildBracket(jsonURL) {
    getJSON(jsonURL).then(data => {
        
    });
}