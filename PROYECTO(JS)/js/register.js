const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;

    const user = {
        name: form.elements["first-name"].value,
        email: form.elements["email"].value,
        password: form.elements["password"].value,
        confirmPassword: form.elements['confirm-password'].value,
        lastName: form.elements["last-name"].value,
        birthDay: form.elements["birth-day"].value,
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(user.email)){
        alert('Ingrese un email válido (Ej: usuario@gmail.com)')
        return
    }
    if (user.password !== user.confirmPassword) {
        alert('Las contraseñas no coinciden')
        return
    }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!passwordRegex.test(user.password)) {
        alert('La contraseña debe tener al menos una letra, un número y un carácter especial')
        return
    }
    const birthDay = new Date(user.birthDay);
    const today = new Date()
    const age = today.getFullYear() - birthDay.getFullYear();
    if (age < 18 || age > 120){
        alert('debes ser mayor de 18 años y menor de 120')
        return
    }

    const users = JSON.parse(localStorage.getItem('users'))
    if (users == null) {    
        const arrayUsers=[user]
        localStorage.setItem('users',JSON.stringify(arrayUsers))
    }else{
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users))
    }

    function redirect() {
        alert('Usuario registrado. Inicia sesión')
        window.location.href = "login.html";
    }
    redirect()
}

