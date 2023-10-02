const url = "https://api.noroff.dev/api/v1/gamehub";
const gameContainer = document.querySelector(".gamecontainer");

async function getAllGames() {
    const response = await fetch(url);
    const games = await response.json();
    console.log(games);

    games.forEach(function(game){
        gameContainer.innerHTML += `
        <section class="gamescard">
        <img src="${game.image}" alt="${game.title} game cover" class="cover-card">
        <h2>${game.title}</h2>
        <h2>${game.price}</h2>
        <a href="#"><div class="addgamesbutton-card CTA">ADD TO CART</div></a>
        <a href="/details.html?id=${game.id}"><div class="readmorebutton-card">READ MORE</div></a>
        </section>
        `
    })
}

getAllGames();
