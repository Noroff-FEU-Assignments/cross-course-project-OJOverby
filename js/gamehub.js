var dimmed = document.querySelector('.dimmed')
var checkbox = document.querySelector('#menu-checkbox');
var menu = document.querySelector('#navmenu');
var screenheight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
var racingGames = document.querySelectorAll('.racingSelector');



dimmed.addEventListener('click', function() {
    checkbox.checked = false;
});

console.log(dimmed.style.height = screenheight+('px'));

dimmed.style.height = screenheight+('px');

console.log(menu)

console.log(document.body.height);

menu.style.height = screenheight+('px');

