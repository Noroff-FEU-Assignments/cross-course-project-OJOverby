const cartCounter = document.querySelector(".cart-counter");

function updateCartCounter (){

    let shopCart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = 0;
    let gameQuantity = shopCart.map(item => item.quantity);

    gameQuantity.forEach(item => {
        cartCount += item;
    });
    
    cartCounter.innerHTML = cartCount;
    
    if (shopCart!==undefined && shopCart.length!==0){
        cartCounter.classList.remove("hidden");
    }
}

updateCartCounter();

