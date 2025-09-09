// main.js - Interactividad para BaybladeStore

document.addEventListener('DOMContentLoaded', function() {
    // Carrito persistente
    const cartCountSpan = document.getElementById('cart-count');
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountSpan.textContent = cart.reduce((a,b)=>a+b.cantidad,0);
    }
    updateCartCount();
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.product-card');
            const nombre = card.querySelector('.card-title').textContent.trim();
            const precio = parseInt(card.querySelector('.card-text').textContent.replace(/[^0-9]/g, ''));
            const imagen = card.querySelector('img').src;
            const id = nombre;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let idx = cart.findIndex(p => p.id === id);
            if(idx >= 0) {
                cart[idx].cantidad += 1;
            } else {
                cart.push({id, nombre, precio, imagen, cantidad:1});
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            btn.classList.add('btn-success');
            btn.classList.remove('btn-danger','btn-warning');
            btn.textContent = '¡Agregado!';
            setTimeout(() => {
                btn.textContent = 'Añadir al carrito';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-danger','btn-warning');
            }, 1200);
        });
    });

    // Carrusel: reiniciar a primer slide si llega al final (opcional)
    const carousel = document.getElementById('beybladeCarousel');
    if(carousel) {
        carousel.addEventListener('slid.bs.carousel', function (e) {
            // Puedes agregar lógica personalizada aquí si agregas más slides
        });
    }
});
