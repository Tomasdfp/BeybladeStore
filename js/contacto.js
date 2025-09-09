// contacto.js - Validación y lógica de formularios de contacto y newsletter

// Validación en tiempo real para el formulario de contacto
const form = document.getElementById('contact-form');
const fields = ['nombre', 'email', 'asunto', 'mensaje'];
const errors = {
    nombre: 'Por favor ingresa tu nombre.',
    email: 'Ingresa un email válido.',
    asunto: 'El asunto es obligatorio.',
    mensaje: 'El mensaje no puede estar vacío.'
};

function validateField(id) {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById('error-' + id);
    let valid = true;
    let value = input.value.trim();
    if (id === 'email') {
        valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    } else {
        valid = value.length > 0;
    }
    if (!valid) {
        errorDiv.textContent = errors[id];
        input.classList.add('is-invalid');
    } else {
        errorDiv.textContent = '';
        input.classList.remove('is-invalid');
    }
    return valid;
}

fields.forEach(id => {
    document.getElementById(id).addEventListener('input', () => validateField(id));
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    fields.forEach(id => {
        if (!validateField(id)) valid = false;
    });
    if (!valid) return;
    // Simular envío exitoso
    form.reset();
    fields.forEach(id => document.getElementById('error-' + id).textContent = '');
    document.getElementById('form-success').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('form-success').classList.add('d-none');
    }, 3000);
});

// Newsletter
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterError = document.getElementById('error-newsletter');
const newsletterSuccess = document.getElementById('newsletter-success');

newsletterEmail.addEventListener('input', function() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.value.trim())) {
        newsletterError.textContent = 'Ingresa un email válido.';
        this.classList.add('is-invalid');
    } else {
        newsletterError.textContent = '';
        this.classList.remove('is-invalid');
    }
});

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newsletterEmail.value.trim())) {
        newsletterError.textContent = 'Ingresa un email válido.';
        newsletterEmail.classList.add('is-invalid');
        return;
    }
    newsletterForm.reset();
    newsletterError.textContent = '';
    newsletterEmail.classList.remove('is-invalid');
    newsletterSuccess.classList.remove('d-none');
    setTimeout(() => newsletterSuccess.classList.add('d-none'), 3000);
});
