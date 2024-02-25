const nameButton = document.querySelector('.name-sort-button')
const priceButton = document.querySelector('.price-sort-button')
const releaseButton = document.querySelector('.release-sort-button')


function sortName(games){
    gameContainer.innerHTML = "";
games.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

function sortRelease (games){
    gameContainer.innerHTML = "";
    games.sort((a, b) => new Date(b.attributes[0].terms[0].name) - new Date(a.attributes[0].terms[0].name));
}

function sortPrice(games) {
    gameContainer.innerHTML = "";
    games.sort(function (a, b) {
        return a.prices.regular_price - b.prices.regular_price;
    });
}

function handleNameSortClick (fetchFunction){
    return async function () {
        try {
            const games = await getAllGames();
            sortName(games);
            showGames(games);
            console.log(games);
        } catch (error) {
            gameContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
        }
    }
}

nameButton.addEventListener("click", async function () {
    try {
        const games = await getAllGames();
        sortName(games);
        showGames(games);
        console.log(games);
    } catch (error) {
        gameContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    }
});

priceButton.addEventListener("click", async function () {
    try {
        const games = await getAllGames();
        sortPrice(games);
        showGames(games);
        console.log(games);
    } catch (error) {
        gameContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    }
});

releaseButton.addEventListener("click", async function () {
    try {
        const games = await getAllGames();
        sortRelease(games);
        showGames(games);
        console.log(games);
    } catch (error) {
        gameContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    }
});