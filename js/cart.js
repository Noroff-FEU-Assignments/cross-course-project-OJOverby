const cartContainer = document.querySelector(".cart-container");
const emptyButton = document.querySelector(".empty-button");
const price = document.querySelector(".price");
const url = "https://api.noroff.dev/api/v1/gamehub/";
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
        const url = "https://api.noroff.dev/api/v1/gamehub/"+gameId;
      const response = await fetch(url);
      const cartItem = await response.json();

      cartQuantity = cart.find(item => item.id === cartItem.id);
      cartContainer.innerHTML += `
        
      <tr>
          <td><img src="${cartItem.image}" alt="${cartItem.image} game cover" class="cartCover"></td>
          <td><b>${cartItem.title}</b><p>Digital CD key</p></td>
          <td><div class="inline"><div class="minus-button" onclick="decreaseItems('${cartItem.id}')">-</div><div id="quantity-id-${cartItem.id}" class="quantity-number">${cartQuantity.quantity}</div><div class="plus-button" onclick="increaseItems('${cartItem.id}')">+</div></div></td>
          <td><div id="item-price-${cartItem.id}" class="item-price">$${(cartItem.price*cartQuantity.quantity).toFixed(2)}</div></td>
        </tr>
        
      `;
     
      totalPrice += cartItem.price*cartQuantity.quantity;
      price.innerHTML = `$`+ totalPrice.toFixed(2);
    
  
  } catch (error) {
    cartContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
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

    function increaseItems (id){
      cart = cart.map((item) => {
      
        if (item.id === id){
          item.quantity++;
          const quantityNum = document.querySelector("#quantity-id-"+item.id);
          const itemPrice = document.querySelector("#item-price-"+item.id);
          quantityNum.innerHTML = item.quantity;
          getInfo(id).then (priceInfo => {
            let priceForItems = priceInfo*item.quantity;
            itemPrice.innerHTML = "$"+priceForItems.toFixed(2);
          
          });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      })
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      updateTotalPrice();
      updateCartCounter();
    }

    function decreaseItems (id){
      cart = cart.map((item) => {
        if (item.id === id && item.quantity > 1){
          item.quantity--;
          const quantityNum = document.querySelector("#quantity-id-"+item.id);
          const itemPrice = document.querySelector("#item-price-"+item.id);
          quantityNum.innerHTML = item.quantity;
          getInfo(id).then (priceInfo => {
            let priceForItems = priceInfo*item.quantity;
            itemPrice.innerHTML = "$"+priceForItems.toFixed(2);
          });
        }
        localStorage.setItem("cart", JSON.stringify(cart));

      })
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      updateTotalPrice();
      updateCartCounter();
    }

    async function getInfo(id){
      try {
        const response = await fetch(url+id);
        const gameInfo = await response.json();
        return gameInfo.price;
      }
      catch (error) {
        cartContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
      }
    }
  
    function updateTotalPrice() {
      let gameIds = cart.map(item => item.id);
      let totalPrices = 0;
      gameIds.forEach(gameId => {
          let itemQuantity = cart.find(item => item.id === gameId).quantity;
          getInfo(gameId).then(priceInfo => {
              totalPrices += priceInfo * itemQuantity;
              price.innerHTML = `$${totalPrices.toFixed(2)}`;
          });
      });
  }