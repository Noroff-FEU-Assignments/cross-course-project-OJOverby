const url2 = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products?per_page=12";
const newsContainer = document.querySelector(".news-container");
let cart2 = JSON.parse(localStorage.getItem("cart")) || [];



async function getNewestGames() {

    try {
        const response = await fetch(url2);
        const games = await response.json();
        newsContainer.innerHTML = "";
        const sortedGames = games.sort((a, b) => new Date(b.attributes[0].terms[0].name) - new Date(a.attributes[0].terms[0].name)).slice(0, 3);
        console.log(sortedGames);
    
        sortedGames.forEach(function(game){
            newsContainer.innerHTML += `
            <section class="gamescard">
            <a href="/details.html?id=${game.id}"><img src="${game.images[0].src}" alt="${game.name} game cover" class="cover-card">
            <h2>${game.name}</h2>
            </a>
            </section>
            `;

        })
    } catch (error) {
        newsContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
        console.log(error);
    }
    
}

getNewestGames();

function addToCart(gameId){

    if (cart2.some((item) => item.id === gameId)){
       console.log(gameId.quantity);
       cart2 = cart2.map((item) => {
   
        if (item.id === gameId){
          item.quantity++;
          localStorage.setItem("cart", JSON.stringify(cart2));}
        })
        
    } else {
        cart2.push({id: gameId, quantity:1});
      localStorage.setItem("cart", JSON.stringify(cart2));
      
    }
    window.location.assign("cart.html");
   }
  
