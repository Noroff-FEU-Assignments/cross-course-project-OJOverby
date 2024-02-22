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

    else if (item.id === id && item.quantity < 2){
      const removeItem = confirm("This will remove the item from your cart");
        if(removeItem){
        cart = cart.filter(cartItem => cartItem.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
  }
  
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
    return gameInfo.prices.regular_price/100;
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