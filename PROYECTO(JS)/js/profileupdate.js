const currentUser = JSON.parse(localStorage.getItem('user_logged'));
const emailInput = document.getElementById("email-confirm");
const firstNameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const birthDayInput = document.getElementById("birth-day");
const passwordInput = document.getElementById("new-password");

emailInput.value = currentUser.email;
firstNameInput.value = currentUser.name;
lastNameInput.value = currentUser.lastName;
birthDayInput.value = currentUser.birthDay;

const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedUser = {
        name: form.elements["first-name"].value,
        email: form.elements["email"].value,
        password: form.elements["password"].value,
        confirmPassword: form.elements["confirm-password"].value,
        lastName: form.elements["last-name"].value,
        birthDay: form.elements["birth-day"].value,
    };

    if (updatedUser.password !== "") {
        if (updatedUser.password !== updatedUser.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden'
            });
            return;
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/;
        if (!passwordRegex.test(updatedUser.password)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos una letra, un número y un carácter especial'
            });
            return;
        }
    } else {
        updatedUser.password = currentUser.password;
        updatedUser.confirmPassword = currentUser.password;
    }

    Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#346dd6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar"
    }).then((result) => {
        if (result.isConfirmed) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map(user =>
                user.email === currentUser.email ? updatedUser : user
            );

            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('user_logged', JSON.stringify(updatedUser));

            Swal.fire({
                title: "¡Actualizado!",
                text: "Tu información ha sido actualizada con éxito.",
                icon: "success"
            }).then(() => {
                window.location = "home.html";
            });
        }
    });
};




