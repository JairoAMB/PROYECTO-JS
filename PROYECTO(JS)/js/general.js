document.addEventListener("DOMContentLoaded",function(){
    const user_logged = JSON.parse(localStorage.getItem('user_logged'));
    if(user_logged == null){
        window.location.href = "login.html"
    }
})
//header toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});



function eliminarLocalStorage(){
    localStorage.removeItem('user_logged');
    window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".pages a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === `./${currentPath}`) {
            link.classList.add("active");
        }
    });
});

const userLogged = localStorage.getItem("user_logged");
const userObject = JSON.parse(userLogged);
const name = userObject.name.toUpperCase();
const userName = document.getElementById('look-name');
userName.innerText = 'HELLO,'+' '+ name; 












