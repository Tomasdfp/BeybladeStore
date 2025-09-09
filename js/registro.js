// registro.js - Validación avanzada y experiencia de usuario para registro BaybladeStore

document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const form = document.getElementById('register-form');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const telefono = document.getElementById('telefono');
    const fecha = document.getElementById('fecha');
    const terminos = document.getElementById('terminos');
    const nextStepBtn = document.getElementById('next-step');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const stepDot1 = document.getElementById('step-dot-1');
    const stepDot2 = document.getElementById('step-dot-2');
    const registerSuccess = document.getElementById('register-success');
    const strengthBar = document.getElementById('strength-bar');
    // Errores
    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');
    const errorPassword2 = document.getElementById('error-password2');
    const errorTelefono = document.getElementById('error-telefono');
    const errorFecha = document.getElementById('error-fecha');

    // Mostrar/ocultar contraseña
    document.getElementById('toggle-password').onclick = () => {
        password.type = password.type === 'password' ? 'text' : 'password';
        document.getElementById('toggle-password').innerHTML = password.type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    };
    document.getElementById('toggle-password2').onclick = () => {
        password2.type = password2.type === 'password' ? 'text' : 'password';
        document.getElementById('toggle-password2').innerHTML = password2.type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    };

    // Tooltips
    nombre.title = 'Nombre y apellido, mínimo 3 caracteres';
    email.title = 'Ejemplo: usuario@email.com';
    password.title = 'Mínimo 8 caracteres, mayúscula, número';
    password2.title = 'Debe coincidir con la contraseña';
    telefono.title = 'Solo 9 dígitos, sin espacios';
    fecha.title = 'Debes tener al menos 13 años';

    // Validaciones en tiempo real
    nombre.addEventListener('input', () => {
        if (nombre.value.trim().length < 3) {
            errorNombre.textContent = 'Ingresa tu nombre completo (mínimo 3 caracteres)';
        } else {
            errorNombre.textContent = '';
        }
    });
    email.addEventListener('input', () => {
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email.value)) {
            errorEmail.textContent = 'Correo electrónico inválido';
        } else {
            errorEmail.textContent = '';
        }
    });
    password.addEventListener('input', () => {
        const val = password.value;
        let strength = 0;
        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;
        // Barra de fortaleza
        strengthBar.style.width = (strength * 25) + '%';
        strengthBar.style.background = ['#ccc', '#ff9800', '#2196f3', '#4caf50', '#c31432'][strength];
        // Mensaje
        if (val.length < 8) {
            errorPassword.textContent = 'Mínimo 8 caracteres';
        } else if (!/[A-Z]/.test(val)) {
            errorPassword.textContent = 'Incluye al menos una mayúscula';
        } else if (!/[0-9]/.test(val)) {
            errorPassword.textContent = 'Incluye al menos un número';
        } else {
            errorPassword.textContent = '';
        }
    });
    password2.addEventListener('input', () => {
        if (password2.value !== password.value) {
            errorPassword2.textContent = 'Las contraseñas no coinciden';
        } else {
            errorPassword2.textContent = '';
        }
    });
    telefono.addEventListener('input', () => {
        telefono.value = telefono.value.replace(/[^0-9]/g, '').slice(0,9);
        if (telefono.value.length !== 9) {
            errorTelefono.textContent = 'El teléfono debe tener 9 dígitos';
        } else {
            errorTelefono.textContent = '';
        }
    });
    fecha.addEventListener('input', () => {
        if (!mayorDeEdad(fecha.value)) {
            errorFecha.textContent = 'Debes tener al menos 13 años';
        } else {
            errorFecha.textContent = '';
        }
    });

    // Step 1 → Step 2
    nextStepBtn.onclick = () => {
        if (validarStep1()) {
            step1.style.display = 'none';
            step2.style.display = 'block';
            stepDot1.classList.remove('active');
            stepDot2.classList.add('active');
        }
    };

    // Validar Step 1
    function validarStep1() {
        let valid = true;
        if (nombre.value.trim().length < 3) {
            errorNombre.textContent = 'Ingresa tu nombre completo (mínimo 3 caracteres)';
            valid = false;
        }
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email.value)) {
            errorEmail.textContent = 'Correo electrónico inválido';
            valid = false;
        }
        if (password.value.length < 8 || !/[A-Z]/.test(password.value) || !/[0-9]/.test(password.value)) {
            errorPassword.textContent = 'Contraseña débil';
            valid = false;
        }
        if (password2.value !== password.value) {
            errorPassword2.textContent = 'Las contraseñas no coinciden';
            valid = false;
        }
        return valid;
    }

    // Validar Step 2 y submit
    form.onsubmit = (e) => {
        e.preventDefault();
        let valid = true;
        if (telefono.value.length !== 9) {
            errorTelefono.textContent = 'El teléfono debe tener 9 dígitos';
            valid = false;
        }
        if (!mayorDeEdad(fecha.value)) {
            errorFecha.textContent = 'Debes tener al menos 13 años';
            valid = false;
        }
        if (!terminos.checked) {
            terminos.focus();
            valid = false;
        }
        if (valid) {
            registerSuccess.classList.remove('d-none');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1800);
        }
    };

    // Edad mínima
    function mayorDeEdad(fechaStr) {
        if (!fechaStr) return false;
        const hoy = new Date();
        const fechaNac = new Date(fechaStr);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const m = hoy.getMonth() - fechaNac.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
        return edad >= 13;
    }
});
