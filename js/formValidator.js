const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError")
const message = document.querySelector("#message");
const msgError = document.querySelector("#msgError");

function validateForm() {
    event.preventDefault();

    if (fullName.value) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
    }

    if(validateEmail(email.value)){
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (message.value) {
        msgError.style.display = "none";
    } else {
        msgError.style.display = "block";
    }
}



form.addEventListener("submit", validateForm);

function validateEmail (email) {
const regEx = /\S+@\S+\.\S+/;
const checkEmail = regEx.test(email);
return checkEmail;
}