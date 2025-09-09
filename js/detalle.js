// detalle.js - Interactividad para página de detalle de producto BaybladeStore

// Galería de imágenes
const mainImg = document.getElementById('main-img');
const thumbs = document.querySelectorAll('.thumb-img');
thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        mainImg.src = this.src;
    });
});

// Zoom (ya está en CSS, pero puedes agregar más interactividad si quieres)

// Selector de cantidad y añadir al carrito
const cantidadInput = document.getElementById('cantidad');
const addToCartBtn = document.getElementById('add-to-cart');
const cantidadError = document.getElementById('cantidad-error');
const stock = 12;
addToCartBtn.addEventListener('click', function() {
    let val = parseInt(cantidadInput.value);
    if(isNaN(val) || val < 1 || val > stock) {
        cantidadError.classList.remove('d-none');
        return;
    }
    cantidadError.classList.add('d-none');
    // Datos del producto
    const nombre = document.querySelector('.col-md-6.text-white h1').textContent.trim();
    const precio = 12990;
    const imagen = document.getElementById('main-img').src;
    const id = nombre;
    // Cargar carrito
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let idx = cart.findIndex(p => p.id === id);
    if(idx >= 0) {
        cart[idx].cantidad += val;
    } else {
        cart.push({id, nombre, precio, imagen, cantidad:val});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Actualizar contador
    let cartCountSpan = document.getElementById('cart-count');
    let count = cart.reduce((a,b)=>a+b.cantidad,0);
    cartCountSpan.textContent = count;
    addToCartBtn.classList.add('btn-success');
    addToCartBtn.classList.remove('btn-danger');
    addToCartBtn.textContent = '¡Agregado!';
    setTimeout(() => {
        addToCartBtn.textContent = 'Añadir al carrito';
        addToCartBtn.classList.remove('btn-success');
        addToCartBtn.classList.add('btn-danger');
    }, 1200);
});

// Sistema de reseñas
let reviews = [
    {nombre:'Carlos', rating:5, texto:'¡Excelente Beyblade, gira rapidísimo!', fecha:'2025-08-10'},
    {nombre:'Ana', rating:4, texto:'Muy bueno, pero el lanzador podría ser mejor.', fecha:'2025-08-20'}
];
function renderReviews() {
    const list = document.getElementById('reviews-list');
    if(!list) return;
    list.innerHTML = '';
    if(reviews.length === 0) {
        list.innerHTML = '<div class="text-white-50">Sé el primero en opinar.</div>';
    }
    reviews.forEach(r => {
        let stars = '';
        for(let i=1;i<=5;i++)
            stars += `<i class="bi ${i<=r.rating?'bi-star-fill text-warning':'bi-star text-warning'}"></i>`;
        list.innerHTML += `<div class="border-bottom border-secondary pb-2 mb-2">
            <div class="fw-bold">${r.nombre} <span class="small text-white-50">${r.fecha}</span></div>
            <div>${stars}</div>
            <div>${r.texto}</div>
        </div>`;
    });
    // Promedio
    let avg = reviews.reduce((a,b)=>a+b.rating,0)/reviews.length;
    let avgStars = '';
    for(let i=1;i<=5;i++)
        avgStars += `<i class="bi ${i<=Math.round(avg)?'bi-star-fill text-warning':'bi-star text-warning'}"></i>`;
    document.getElementById('avg-rating').innerHTML = avgStars + ` <span class="text-warning">${avg.toFixed(1)}</span>`;
    document.getElementById('review-count').textContent = `(${reviews.length} reseñas)`;
}
renderReviews();

// Enviar reseña
let selectedRating = 0;
document.querySelectorAll('.review-star').forEach(star => {
    star.addEventListener('mouseenter', function() {
        let val = parseInt(this.dataset.value);
        document.querySelectorAll('.review-star').forEach(s => {
            s.classList.toggle('selected', parseInt(s.dataset.value) <= val);
        });
    });
    star.addEventListener('mouseleave', function() {
        document.querySelectorAll('.review-star').forEach(s => {
            s.classList.toggle('selected', parseInt(s.dataset.value) <= selectedRating);
        });
    });
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.value);
        document.querySelectorAll('.review-star').forEach(s => {
            s.classList.toggle('selected', parseInt(s.dataset.value) <= selectedRating);
        });
    });
});
document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let texto = document.getElementById('review-text').value.trim();
    if(selectedRating === 0 || texto === '') return;
    reviews.unshift({nombre:'Invitado', rating:selectedRating, texto, fecha:new Date().toISOString().slice(0,10)});
    selectedRating = 0;
    document.getElementById('review-text').value = '';
    document.querySelectorAll('.review-star').forEach(s => s.classList.remove('selected'));
    renderReviews();
});
