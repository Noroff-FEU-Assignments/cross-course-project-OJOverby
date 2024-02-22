const gameDetails = document.querySelector(".infoPageWrapper");
const gameGenre = document.querySelector(".genres");
const currentGame = document.querySelector(".currentGame");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products/" + id;
let details;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchGame(){
  try {
    const response = await fetch(url);
    const details = await response.json();

    gameGenre.innerHTML = details.categories[0].name.toUpperCase();
    gameGenre.href = "/genre.html?genre="+details.categories[0].name;
    currentGame.innerHTML = details.name.toUpperCase();

    gameDetails.innerHTML = `
    <section class="coverImg"><img src="${details.images[0].src}" alt="${details.name} Cover image"></section>
    <section class="gameInfo">
    
    <h2>${details.name}</h2>
    <table>
    <tr><th><h3>Age Rating:</h3></th><td><p>${details.attributes[1].terms[0].name}</p></td></tr>
    <tr><th><h3>Genre:</h3></th><td><p>${details.categories[0].name}</p></td></tr>
    <tr><th><h3>Release date:</h3></th><td><p>${details.attributes[0].terms[0].name}</p></td></tr>
  </table>
    <h3>Description:</h3><p>${details.description}
    </p>
    </section>
  <section class="saleInfo">
    <h2>$${(details.prices.regular_price / 100).toFixed(2)}</h2>
    <button class="CTA CTAinfo cartButton" data-id="${details.id}"><h3>ADD TO CART</h3></button>
  </section>`;
  const cartButton = document.querySelector(".cartButton")
  cartButton.addEventListener("click", function() {
    const gameId = cartButton.getAttribute("data-id");
    addToCart(gameId);
  })
} catch (error) {
  gameDetails.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
  console.log(error);
}
  }
  
fetchGame();

function addToCart(gameId){

  if (cart.some((item) => item.id === gameId)){
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


