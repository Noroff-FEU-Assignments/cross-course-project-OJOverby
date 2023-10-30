const url = "https://api.noroff.dev/api/v1/gamehub";
const gameContainer = document.querySelector(".gamecontainer");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const genre = params.get("genre");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const header = document.querySelector(".bannerheading");

if (genre === "Sports") {
    header.src ="/images/SportsBigBanner.jpg";
} else if (genre === "Action") {
    header.src ="/images/ActionBigBanner.jpg";
} else if (genre === "Horror") {
    header.src ="/images/horrorbigbanner.jpg";
} else if (genre === "Adventure") {
    header.src ="/images/adventurebigbanner.jpg";
}

async function getGenreGames() {

    try {
        const response = await fetch(url);
        const games = await response.json();
        console.log(games);
        gameContainer.innerHTML = "";
        filteredGames = games.filter(game => game.genre === genre);
    
        filteredGames.forEach(function(game){
            gameContainer.innerHTML += `
            <section class="gamescard">
            <img src="${game.image}" alt="${game.title} game cover" class="cover-card">
            <h2>${game.title}</h2>
            <h2>${game.price}</h2>
            <div class="addgamesbutton-card CTA" onclick="addToCart('${game.id}')">ADD TO CART</div>
            <a href="/details.html?id=${game.id}"><div class="readmorebutton-card">READ MORE</div></a>
            </section>
            `;
        })
    } catch (error) {
        console.log("Not working", error);
    }
    
}

getGenreGames();

function addToCart(gameId){
    console.log("addToCart called with gameId:", gameId);
    cart.push({id: gameId, quantity:1});
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart updated:", cart);
      window.location.assign("cart.html");
   }
  