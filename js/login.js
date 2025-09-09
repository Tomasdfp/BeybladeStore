// login.js - Lógica de inicio de sesión BaybladeStore

// login.js - Validación y experiencia de usuario para login BaybladeStore

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    const type = document.getElementById('login-type');
    const remember = document.getElementById('remember');
    const loader = document.getElementById('login-loader');
    const errorEmail = document.getElementById('error-login-email');
    const errorPassword = document.getElementById('error-login-password');

    // Mostrar/ocultar contraseña
    document.getElementById('toggle-login-password').onclick = () => {
        password.type = password.type === 'password' ? 'text' : 'password';
        document.getElementById('toggle-login-password').innerHTML = password.type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    };

    // Recordar email
    if (localStorage.getItem('baystore_remember_email')) {
        email.value = localStorage.getItem('baystore_remember_email');
        remember.checked = true;
    }

    // Validación en tiempo real
    email.addEventListener('input', () => {
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email.value)) {
            errorEmail.textContent = 'Correo electrónico inválido';
        } else {
            errorEmail.textContent = '';
        }
    });
    password.addEventListener('input', () => {
        if (!password.value) {
            errorPassword.textContent = 'Ingresa tu contraseña';
        } else {
            errorPassword.textContent = '';
        }
    });

    // Submit
    form.onsubmit = (e) => {
        e.preventDefault();
        let valid = true;
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email.value)) {
            errorEmail.textContent = 'Correo electrónico inválido';
            valid = false;
        }
        if (!password.value) {
            errorPassword.textContent = 'Ingresa tu contraseña';
            valid = false;
        }
        if (!valid) return;
        // Recordar email
        if (remember.checked) {
            localStorage.setItem('baystore_remember_email', email.value);
        } else {
            localStorage.removeItem('baystore_remember_email');
        }
        // Animación de carga
        loader.style.display = 'block';
        form.querySelector('button[type="submit"]').disabled = true;
        setTimeout(() => {
            loader.style.display = 'none';
            form.querySelector('button[type="submit"]').disabled = false;
            // Redirección según tipo de usuario
            if (type.value === 'admin') {
                window.location.href = 'file:///C:/Users/tomas/Desktop/BayStore/admin/index.html';
            } else {
                window.location.href = 'carrito.html';
            }
        }, 1400);
    };
});
