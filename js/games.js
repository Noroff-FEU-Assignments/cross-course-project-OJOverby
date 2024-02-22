const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products?per_page=12";
const gameContainer = document.querySelector(".gamecontainer");
let cart = JSON.parse(localStorage.getItem("cart")) || [];


async function getAllGames() {

    try {
        const response = await fetch(url);
        const games = await response.json();
        gameContainer.innerHTML = "";
        console.log(games);
    
        games.forEach(function(game){
            gameContainer.innerHTML += `
            <section class="gamescard">
            <a href="/details.html?id=${game.id}"><img src="${game.images[0].src}" alt="${game.title} game cover" class="cover-card"></a>
            <h2>${game.name}</h2>
            <h2>$${(game.prices.regular_price / 100).toFixed(2)}</h2>
            <div class="button-container">
            <button class="addgamesbutton-card CTA" onclick="addToCart('${game.id}')">ADD TO CART</button>
            <a href="/details.html?id=${game.id}"><button class="CTA readmorebutton-card">READ MORE</button></a>
            </div>
            </section>
            `;

        })
    } catch (error) {
        gameContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    }
    
}

getAllGames();

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
  
