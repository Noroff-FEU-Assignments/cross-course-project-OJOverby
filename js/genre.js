const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products?per_page=12";
const gameContainer = document.querySelector(".gamecontainer");
const navGenre = document.querySelector(".navGenre");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const genre = params.get("genre");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const header = document.querySelector(".bannerheading");

if (genre === "Sports") {
    header.src ="/images/SportsBigBanner.jpg";
    navGenre.innerHTML = "SPORTS";
} else if (genre === "Action") {
    header.src ="/images/ActionBigBanner.jpg";
    navGenre.innerHTML = "ACTION";
} else if (genre === "Horror") {
    header.src ="/images/horrorbigbanner.jpg";
    navGenre.innerHTML = "HORROR";
} else if (genre === "Adventure") {
    header.src ="/images/adventurebigbanner.jpg";
    navGenre.innerHTML = "ADVENTURE";
}

async function getGenreGames() {

    try {
        const response = await fetch(url);
        const games = await response.json();
        gameContainer.innerHTML = "";
        filteredGames = games.filter(game => game.categories[0].name === genre);
        sortName(filteredGames);
    
        filteredGames.forEach(function(game){
            gameContainer.innerHTML += `
            <section class="gamescard">
            <a href="/details.html?id=${game.id}"><img src="${game.images[0].src}" alt="${game.name} game cover" class="cover-card"></a>
            <h2>${game.name}</h2>
            <h2>$${(game.prices.regular_price / 100).toFixed(2)}</h2>
            <button class="addgamesbutton-card CTA" onclick="addToCart('${game.id}')">ADD TO CART</button>
            <a href="/details.html?id=${game.id}"><button class="CTA readmorebutton-card">READ MORE</button></a>
            </section>
            `;
        })
    } catch (error) {
        gameContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    }
    
}

function showGames() {
    filteredGames.forEach(function(game){
        gameContainer.innerHTML += `
        <section class="gamescard">
        <a href="/details.html?id=${game.id}"><img src="${game.images[0].src}" alt="${game.name} game cover" class="cover-card"></a>
        <h2>${game.name}</h2>
        <h2>$${(game.prices.regular_price / 100).toFixed(2)}</h2>
        <button class="addgamesbutton-card CTA" onclick="addToCart('${game.id}')">ADD TO CART</button>
        <a href="/details.html?id=${game.id}"><button class="CTA readmorebutton-card">READ MORE</button></a>
        </section>
        `;
    })
}

getGenreGames();

function addToCart(gameId){

    if (cart.some((item) => item.id === gameId)){
       console.log(gameId.quantity);
       cart = cart.map((item) => {
   
        if (item.id === gameId){
          item.quantity++;
          localStorage.setItem("cart", JSON.stringify(cart));}
        })
        
    } else {
        cart.push({id: gameId, quantity:1});
      localStorage.setItem("cart", JSON.stringify(cart));
      
    }
    window.location.assign("cart.html");
   }
  
