// carrito.js - Lógica de carrito de compras BaybladeStore

// Utilidad para formatear CLP
function clp(n) { return '$' + n.toLocaleString('es-CL'); }

// Cargar carrito desde localStorage o ejemplo
let cart = JSON.parse(localStorage.getItem('cart')) || [
    {id:1, nombre:'Valtryek V2', precio:12990, imagen:'img/Productos/0019516626537.webp', cantidad:2},
    {id:2, nombre:'Spryzen S2', precio:13990, imagen:'img/Productos/10421001608_GRIS_5.jpg', cantidad:1}
];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const tbody = document.getElementById('cart-body');
    tbody.innerHTML = '';
    if(cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-white-50">Tu carrito está vacío.</td></tr>';
    }
    cart.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.imagen}" class="cart-img"></td>
            <td>${item.nombre}</td>
            <td>${clp(item.precio)}</td>
            <td><input type="number" min="1" value="${item.cantidad}" class="form-control form-control-sm w-auto cart-qty" data-idx="${idx}"></td>
            <td>${clp(item.precio * item.cantidad)}</td>
            <td><button class="btn btn-sm btn-danger cart-del" data-idx="${idx}"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById('cart-count').textContent = cart.reduce((a,b)=>a+b.cantidad,0);
    calcSummary();
    setCartEvents();
}

function setCartEvents() {
    document.querySelectorAll('.cart-qty').forEach(input => {
        input.addEventListener('change', function() {
            let idx = parseInt(this.dataset.idx);
            let val = parseInt(this.value);
            if(val < 1) val = 1;
            cart[idx].cantidad = val;
            saveCart();
            renderCart();
        });
    });
    document.querySelectorAll('.cart-del').forEach(btn => {
        btn.addEventListener('click', function() {
            let idx = parseInt(this.dataset.idx);
            cart.splice(idx,1);
            saveCart();
            renderCart();
        });
    });
}

function calcSummary() {
    let totalBruto = cart.reduce((a,b)=>a+b.precio*b.cantidad,0);
    // Calcular neto y IVA
    let subtotal = Math.round(totalBruto / 1.19);
    let tax = totalBruto - subtotal;
    let envioSel = document.getElementById('envio')?.value || 'normal';
    let shipping = envioSel==='express'?3000 : envioSel==='retiro'?0 : 1500;
    if(cart.length === 0) shipping = 0;
    let total = totalBruto + shipping;
    document.getElementById('summary-subtotal').textContent = clp(subtotal);
    document.getElementById('summary-tax').textContent = clp(tax);
    document.getElementById('summary-shipping').textContent = clp(shipping);
    document.getElementById('summary-total').textContent = clp(total);
}

// Formulario de envío y pago
const form = document.getElementById('shipping-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input,select').forEach(input => {
        if(input.id === 'email') {
            const val = input.value.trim();
            const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
            if(!emailValid) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        } else if(input.id === 'telefono') {
            const val = input.value.trim();
            const telValid = /^[0-9]{9}$/.test(val);
            if(!telValid) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        } else if(!input.checkValidity()) {
            input.classList.add('is-invalid');
            valid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    if(!form.querySelector('input[name="pago"]:checked')) {
        form.querySelectorAll('input[name="pago"]').forEach(i=>i.classList.add('is-invalid'));
        valid = false;
    } else {
        form.querySelectorAll('input[name="pago"]').forEach(i=>i.classList.remove('is-invalid'));
    }
    if(!valid) return;
    // Simular compra exitosa
    form.reset();
    cart = [];
    saveCart();
    renderCart();
    document.getElementById('form-success').classList.remove('d-none');
    setTimeout(()=>document.getElementById('form-success').classList.add('d-none'), 3000);
});

// Cambios de método de envío
const envioSel = document.getElementById('envio');
if(envioSel) {
    envioSel.addEventListener('change', calcSummary);
}

// Inicializar
renderCart();
