const expirationDuration = 3600; 
function checkSessionExpiration() {
    const currentTime = Math.floor(Date.now() / 1000);  
    const storedExpirationTime = parseInt(localStorage.getItem('expirationTime'), 10);

    if (storedExpirationTime && currentTime >= storedExpirationTime) {
        localStorage.removeItem('user_logged');
        localStorage.removeItem('expirationTime');
        alert("Your session has expired. Please log in again.");
        window.location.href = "login.html";
    }
}
checkSessionExpiration();