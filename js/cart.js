const cartContainer = document.querySelector(".cart-container");
const emptyButton = document.querySelector(".empty-button");
const checkoutButton = document.querySelector(".checkout-button");
const loadingWrap = document.querySelector(".loading-wrapper");
const price = document.querySelector(".price");
const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products/";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;

emptyButton.addEventListener("click", function() {
  const emptyCart = confirm("Do you really want to empty your cart?");
  if(emptyCart){
    localStorage.clear();
  }
  })

async function getCartItem(gameId){
    try {
        const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products/"+gameId;
      const response = await fetch(url);
      const cartItem = await response.json();

      cartQuantity = cart.find(item => item.id == cartItem.id);
      console.log(gameId);
      cartContainer.innerHTML += `
        
      <tr>
          <td><a href="/details.html?id=${cartItem.id}"><img src="${cartItem.images[0].src}" alt="${cartItem.name} game cover" class="cartCover"></a></td>
          <td><b>${cartItem.name}</b><p>Digital CD key</p></td>
          <td><div class="inline"><div class="minus-button" onclick="decreaseItems('${cartItem.id}')">-</div><div id="quantity-id-${cartItem.id}" class="quantity-number">${cartQuantity.quantity}</div><div class="plus-button" onclick="increaseItems('${cartItem.id}')">+</div></div></td>
          <td><div id="item-price-${cartItem.id}" class="item-price">$${((cartItem.prices.regular_price)/100*cartQuantity.quantity).toFixed(2)}</div></td>
        </tr>
        
      `;
      console.log(cartItem);
     
      totalPrice += (cartItem.prices.regular_price/100)*cartQuantity.quantity;
      price.innerHTML = `$`+ totalPrice.toFixed(2);
    
  
  } catch (error) {
    cartContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    console.log(error);
  }
    }

    function runCart(){
    const idArray = cart.map(item => item.id);
    loadingWrap.innerHTML = "";
    if(idArray.length===0){
      cartContainer.innerHTML = `<p>There are no items in your cart<p>`; 
      checkoutButton.style.display = 'none';
    } else {
      idArray.forEach(function(gameId){
        getCartItem(gameId);
    })
    }
  }

  runCart();

