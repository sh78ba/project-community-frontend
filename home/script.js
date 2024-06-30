// script.js
const menuToggle = document.getElementById("mobile-menu");
const nav = document.querySelector(".navbar ul");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

// Get all elements with class name "signinredirect"
var elements = document.getElementById("signinredirect");

// Attach event listener to each element

    elements.addEventListener("click", function() {
        // Redirect to sign-in page (replace with your actual sign-in page URL)
        window.location.href = "../signinSignup/index.html";
    });


var contactusbtn=document.getElementById("contactus-btn")
contactusbtn.addEventListener("click",function(){
    alert("Submitted Successfully")
})

if(localStorage.length==0){
    window.location.href = "../signinSignup/index.html";
}