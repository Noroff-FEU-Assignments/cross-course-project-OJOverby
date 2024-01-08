const url2 = "https://api.noroff.dev/api/v1/gamehub";
const newsContainer = document.querySelector(".news-container");
let cart2 = JSON.parse(localStorage.getItem("cart")) || [];



async function getNewestGames() {

    try {
        const response = await fetch(url2);
        const games = await response.json();
        newsContainer.innerHTML = "";
        const sortedGames = games.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 3);
        console.log(sortedGames);
    
        sortedGames.forEach(function(game){
            newsContainer.innerHTML += `
            <section class="gamescard">
            <a href="/details.html?id=${game.id}"><img src="${game.image}" alt="${game.title} game cover" class="cover-card"></a>
            <h2>${game.title}</h2>
            <h2>${game.price}</h2>
            <div class="button-container">
            <button class="addgamesbutton-card CTA" onclick="addToCart('${game.id}')">ADD TO CART</button>
            <a href="/details.html?id=${game.id}"><button class="CTA readmorebutton-card">READ MORE</button></a>
            </div>
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
  
