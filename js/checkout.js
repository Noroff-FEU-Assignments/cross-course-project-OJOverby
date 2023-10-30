const checkoutContainer = document.querySelector(".checkout-container");
const url = "https://api.noroff.dev/api/v1/gamehub/";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;
checkoutContainer.innerHTML = "";
async function getCartItem(gameId){
    try {
        const url = "https://api.noroff.dev/api/v1/gamehub/"+gameId;
      const response = await fetch(url);
      const cartItem = await response.json();
      console.log(cartItem);
      console.log(cartItem.title);

      cartQuantity = cart.find(item => item.id === cartItem.id);
      console.log(cartQuantity.quantity);
      
      checkoutContainer.innerHTML += `
        
      <tr>
                <td><img src="${cartItem.image}" alt="Racing game cover" class="cartCover"></td>
                <td><h2><b>${cartItem.title}</b></h2>
                    <h2>Digital CD key</h2>
                    <h2>${cartItem.price}</h2>
                </td>
            </tr>
        
      `;
     
     // totalPrice += cartItem.price*cartQuantity.quantity;
      // price.innerHTML = `$`+ totalPrice.toFixed(2);
    
  
  } catch (error) {
    console.log("Shits not working...", error);
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