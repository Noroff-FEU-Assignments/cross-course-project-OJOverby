const cartCounter = document.querySelector(".cart-counter");
let shopCart = JSON.parse(localStorage.getItem("cart")) || [];


cartCounter.innerHTML = shopCart.length;

if (shopCart!==undefined && shopCart.length!==0){
    cartCounter.classList.remove("hidden");
}