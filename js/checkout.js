const checkoutContainer = document.querySelector(".checkout-container");
const checkoutPrice = document.querySelector(".total-price");
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
                <td><img src="${cartItem.image}" alt="${cartItem.title} game cover" class="cartCover"></td>
                <td><h3><b>${cartItem.title}</b></h2>
                    <p>Digital CD key</p>
                    <p>${cartItem.price}</p>
                </td>
            </tr>
        
      `;
     
     totalPrice += cartItem.price*cartQuantity.quantity;
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