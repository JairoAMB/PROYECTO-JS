function checkUser() {
    event.preventDefault();
    const emailUser = document.querySelector('#email').value.toLowerCase();
    const passwordUser = document.querySelector('#password').value;
    const messageDiv = document.querySelector('#message');
    const users = JSON.parse(localStorage.getItem('users'));

    if (emailUser === "") {
        messageDiv.style.display = 'block';
        messageDiv.textContent = 'Enter an email address';
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(emailUser)) {
        messageDiv.style.display = 'block';
        messageDiv.textContent = 'Enter a valid email address (example: usuario@gmail.com)';
        return;
    }

    if (passwordUser === "") {
        messageDiv.style.display = 'block';
        messageDiv.textContent = 'Enter a password';
        return;
    }

    const user = users.find(user => user.email === emailUser && user.password === passwordUser);
    if (!user) {
        messageDiv.style.display = 'block';
        messageDiv.textContent = 'Email or password is incorrect';
    } else {
        messageDiv.style.display = 'none';
        alert('Successfully logged in');

        const expirationTime = Math.floor(Date.now() / 1000);
        localStorage.setItem("user_logged", JSON.stringify(user));

        const userObject = JSON.parse(localStorage.getItem("user_logged"));
        const name = userObject.name.toUpperCase();

        function borrarContenido() {
            document.body.innerHTML = "";
            document.body.style.backgroundColor = "#142747";
            const texto = document.createElement("div");
            texto.className = "text-overlay";
            texto.innerText = 'Hello ' + name + ', Welcome to VIP FLAT';
            document.body.appendChild(texto);
            setTimeout(() => {
                texto.classList.add("visible");
            }, 100);
            setTimeout(() => {
                texto.remove();
                window.location.href = "home.html";
            }, 3000);
        }
        borrarContenido();
    }
}
















