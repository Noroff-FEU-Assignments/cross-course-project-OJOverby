const gameDetails = document.querySelector(".infoPageWrapper");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/gamehub/" + id;

async function fetchGame(){
    const response = await fetch(url);
    const details = await response.json();
    console.log(details);

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
    <a href="../cart.html"><div class="CTA CTAinfo"><h3>ADD TO CART</h3></div></a>
  </section>`
}

fetchGame();
