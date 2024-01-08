var dimmed = document.querySelector('.dimmed')
var checkbox = document.querySelector('#menu-checkbox');
var menu = document.querySelector('#navmenu');
var screenheight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
var racingGames = document.querySelectorAll('.racingSelector');




<<<<<<< Updated upstream
console.log(dimmed.style.height = screenheight+('px'));

dimmed.style.height = screenheight+('px');

console.log(menu)

console.log(document.body.height);

menu.style.height = screenheight+('px');

=======

var checkbox = document.getElementById('menu-checkbox');
const menuButton = document.querySelector('.mobile-menu-button');

menuButton.addEventListener('click', () => {
    if (checkbox.checked==0){
        menuButton.classList.add('open');
    } else {
        menuButton.classList.remove('open');
    }
})


// Added code for search input

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    searchButton.disabled = !searchInput.value;
    searchInput.addEventListener('input', () => {
        searchButton.disabled = !searchInput.value;
    });
});
>>>>>>> Stashed changes
