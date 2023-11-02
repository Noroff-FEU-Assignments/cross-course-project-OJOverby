const url = "https://api.noroff.dev/api/v1/gamehub";
const gameContainer = document.querySelector(".gamecontainer");
let cart = JSON.parse(localStorage.getItem("cart")) || [];


async function getAllGames() {

    try {
        const response = await fetch(url);
        const games = await response.json();
        console.log(games);
        gameContainer.innerHTML = "";
    
        games.forEach(function(game){
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
  
