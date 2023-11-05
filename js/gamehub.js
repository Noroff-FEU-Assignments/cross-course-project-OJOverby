/// Code from original HTML/CSS project

const dimmed = document.querySelector('.dimmed')
const checkbox = document.querySelector('#menu-checkbox');
const menu = document.querySelector('#navmenu');
const screenheight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

dimmed.addEventListener('click', function() {
    checkbox.checked = false;
});

dimmed.style.height = screenheight+('px');
menu.style.height = screenheight+('px');
