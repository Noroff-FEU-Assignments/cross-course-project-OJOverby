const params = new URLSearchParams(window.location.search);
const searchTerm = params.get('search');
const searchQuery = document.querySelector(".search-query");
searchQuery.innerHTML = searchTerm;
const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products";
const gameContainer = document.querySelector(".gamecontainer");
const queryString = document.location.search;
let cart = JSON.parse(localStorage.getItem("cart")) || [];





async function getSearchedGames() {

    try {
        const response = await fetch(url);
        const games = await response.json();
        gameContainer.innerHTML = "";
        filteredGames = games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if(filteredGames.length > 0) {
        filteredGames.forEach(function(game){
            gameContainer.innerHTML += `
            <section class="gamescard">
            <a href="/details.html?id=${game.id}"><img src="${game.images[0].src}" alt="${game.name} game cover" class="cover-card"></a>
            <h2>${game.name}</h2>
            <h2>${(game.prices.regular_price / 100).toFixed(2)}</h2>
            <div class="addgamesbutton-card CTA" onclick="addToCart('${game.id}')">ADD TO CART</div>
            <a href="/details.html?id=${game.id}"><div class="CTA readmorebutton-card">READ MORE</div></a>
            </section>
            `;
        })
    } else {
        gameContainer.innerHTML = "<h3>We found no games with your search, try again with different title</h3>";
    }
    
    
    } catch (error) {
        gameContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    }
    
}

getSearchedGames();

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
  