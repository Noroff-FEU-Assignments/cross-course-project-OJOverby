const gameDetails = document.querySelector(".infoPageWrapper");
const gameGenre = document.querySelector(".genres");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/gamehub/" + id;
let details;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchGame(){
  try {
    const response = await fetch(url);
    const details = await response.json();

    gameGenre.innerHTML = details.genre.toUpperCase();
    gameGenre.href = "/genre.html?genre="+details.genre;

    gameDetails.innerHTML = `
    <section class="coverImg"><img src="${details.image}" alt="${details.title} Cover image"></section>
    <section class="gameInfo">
    
    <h2>${details.title}</h2>
    <table>
    <tr><th><h3>Age Rating:</h3></th><td><p>${details.ageRating}</p></td></tr>
    <tr><th><h3>Genre:</h3></th><td><p>${details.genre}</p></td></tr>
    <tr><th><h3>Release date:</h3></th><td><p>${details.released}</p></td></tr>
  </table>
    <h3>Description:</h3><p>${details.description}
    </p>
    </section>
  <section class="saleInfo">
    <h2>${details.price}</h2>
    <div class="CTA CTAinfo cartButton" data-id="${details.id}"><h3>ADD TO CART</h3></div>
  </section>`;
  const cartButton = document.querySelector(".cartButton")
  console.log(cartButton);
  cartButton.addEventListener("click", function() {
    const gameId = cartButton.getAttribute("data-id");
    addToCart(gameId);
    console.log("added to game:",gameId)
  })
} catch (error) {
  gameDetails.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
}
  }
  
fetchGame();

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


