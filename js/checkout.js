const checkoutContainer = document.querySelector(".checkout-container");
const loadingWrapper = document.querySelector(".loading-wrapper");
const checkoutPrice = document.querySelector(".total-price");
const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products/";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;



async function getCartItem(gameId){
    try {
        const url = "https://olejorgen.no/gamehubapi/wp-json/wc/store/products/"+gameId;
      const response = await fetch(url);
      const cartItem = await response.json();
      cartQuantity = cart.find(item => item.id == cartItem.id);
      loadingWrapper.innerHTML = "";
      checkoutContainer.innerHTML += `
        
      <tr>
              <td><img src="${cartItem.images[0].src}" alt="${cartItem.name} game cover" class="cartCover"></td>
              <td><h3><b>${cartItem.name}</b></h2>
                    <p>Digital CD key</p>
                    <p>Quantity: ${cartQuantity.quantity}</p>
                    <p>Price: ${(cartItem.prices.regular_price / 100).toFixed(2)*cartQuantity.quantity}</p>
                </td>
            </tr>
        
      `;
     
     totalPrice += (cartItem.prices.regular_price / 100).toFixed(2)*cartQuantity.quantity;
     checkoutPrice.innerHTML = `$`+ totalPrice.toFixed(2);
    
  
  } catch (error) {
    checkoutContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
  }
    }

    function runCart(){
      
        const idArray = cart.map(item => item.id);
        if(idArray.length===0){
          cartContainer.innerHTML = `<p>There are no items in your cart<p>`
        } else {
          idArray.forEach(function(gameId){
            getCartItem(gameId);
     
        })
        }
      }

      runCart();