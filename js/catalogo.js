// catalogo.js - Catálogo interactivo de BeybladeStore

const productos = [
    {
        id: 1,
        nombre: "Valtryek V2",
        precio: 12990,
        tipo: "Ataque",
        elemento: "Viento",
        marca: "Hasbro",
        rating: 4.5,
        popularidad: 90,
        novedades: 2,
        imagen: "img/Productos/0019516626537.webp",
        detalles: "Incluye lanzador. Beyblade de ataque con gran velocidad."
    },
    {
        id: 2,
        nombre: "Spryzen S2",
        precio: 13990,
        tipo: "Equilibrio",
        elemento: "Fuego",
        marca: "Takara Tomy",
        rating: 5,
        popularidad: 95,
        novedades: 1,
        imagen: "img/Productos/10421001608_GRIS_5.jpg",
        detalles: "Beyblade de equilibrio, adaptable a cualquier combate."
    },
    {
        id: 3,
        nombre: "Roktavor R2",
        precio: 11990,
        tipo: "Defensa",
        elemento: "Tierra",
        marca: "Hasbro",
        rating: 4,
        popularidad: 80,
        novedades: 3,
        imagen: "img/Productos/3e58b5f1-fao_144631501_1.jpg",
        detalles: "Gran resistencia y defensa. Ideal para batallas largas."
    },
    {
        id: 4,
        nombre: "Luinor L2",
        precio: 14990,
        tipo: "Ataque",
        elemento: "Metal",
        marca: "Takara Tomy",
        rating: 4.8,
        popularidad: 92,
        novedades: 4,
        imagen: "img/Productos/81CFov0S0ZL._AC_UF894_1000_QL80_grande.webp",
        detalles: "Ataque giratorio, diseño metálico robusto."
    },
    {
        id: 5,
        nombre: "Genesis Valtryek V3",
        precio: 15990,
        tipo: "Ataque",
        elemento: "Fuego",
        marca: "Hasbro",
        rating: 5,
        popularidad: 98,
        novedades: 0,
        imagen: "img/Productos/81V1UP7Cp1L.jpg",
        detalles: "Edición limitada, máxima potencia de ataque."
    },
    {
        id: 6,
        nombre: "Satomb S3",
        precio: 16990,
        tipo: "Defensa",
        elemento: "Tierra",
        marca: "Takara Tomy",
        rating: 4.2,
        popularidad: 70,
        novedades: 1,
        imagen: "img/Productos/beyblade-x-lanzador-premium-con-peonza-0-20250329060652.jpg",
        detalles: "Defensa impenetrable, ideal para torneos."
    },
    {
        id: 7,
        nombre: "Fafnir F3",
        precio: 17990,
        tipo: "Equilibrio",
        elemento: "Agua",
        marca: "Hasbro",
        rating: 4.7,
        popularidad: 85,
        novedades: 2,
        imagen: "img/Productos/f38c373a-dbe0-4218-acb9-e97c2f29c433__15523.1731275026_2048x.webp",
        detalles: "Absorbe energía del rival, giro inverso."
    },
    {
        id: 8,
        nombre: "Wyvron W2",
        precio: 10990,
        tipo: "Defensa",
        elemento: "Viento",
        marca: "Takara Tomy",
        rating: 3.9,
        popularidad: 60,
        novedades: 3,
        imagen: "img/Productos/f9aa2892-fao_144631301_6.jpg",
        detalles: "Defensa aérea, diseño ligero."
    },
    {
        id: 9,
        nombre: "Kerbeus K2",
        precio: 9990,
        tipo: "Defensa",
        elemento: "Tierra",
        marca: "Hasbro",
        rating: 4.1,
        popularidad: 65,
        novedades: 4,
        imagen: "img/Productos/F_71i0bu-y5rl2735.JPG",
        detalles: "Gran estabilidad y resistencia."
    },
    {
        id: 10,
        nombre: "Doomscizor D2",
        precio: 12490,
        tipo: "Ataque",
        elemento: "Metal",
        marca: "Takara Tomy",
        rating: 4.3,
        popularidad: 75,
        novedades: 2,
        imagen: "img/Productos/gu967808_6_1.avif",
        detalles: "Ataque cortante, diseño agresivo."
    },
    {
        id: 11,
        nombre: "Xcalius X2",
        precio: 18990,
        tipo: "Ataque",
        elemento: "Fuego",
        marca: "Hasbro",
        rating: 4.9,
        popularidad: 99,
        novedades: 0,
        imagen: "img/Productos/trompo-beyblade-x-chain-incendio-5-60ht-y-arrow-wizard-4-60n.jpg",
        detalles: "Edición especial, máxima potencia."
    },
    {
        id: 12,
        nombre: "Zillion Zeus Z2",
        precio: 14990,
        tipo: "Equilibrio",
        elemento: "Metal",
        marca: "Takara Tomy",
        rating: 4.6,
        popularidad: 88,
        novedades: 1,
        imagen: "img/Productos/trompo-beyblade-x-kit-inicial-sword-dran-3-60f.jpg",
        detalles: "Equilibrio perfecto, diseño metálico."
    }
];

const pageSize = 8;
let currentPage = 1;
let filteredProducts = [...productos];
let sortBy = 'novedades';

function renderStars(rating) {
    let html = '';
    for(let i=1; i<=5; i++) {
        if(rating >= i) html += '<i class="bi bi-star-fill text-warning"></i>';
        else if(rating >= i-0.5) html += '<i class="bi bi-star-half text-warning"></i>';
        else html += '<i class="bi bi-star text-warning"></i>';
    }
    return html;
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    const start = (currentPage-1)*pageSize;
    const end = start+pageSize;
    const pageProducts = filteredProducts.slice(start, end);
    if(pageProducts.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center text-white-50">No se encontraron productos.</div>';
    }
    pageProducts.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'col-md-3';
        card.innerHTML = `
        <div class="card product-card h-100 position-relative product-hover" data-id="${prod.id}">
            <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
            <div class="card-body text-center">
                <h5 class="card-title">
                  <a href="detalle.html" class="text-decoration-none text-dark fw-bold">${prod.nombre}</a>
                </h5>
                <p class="mb-1"><span class="badge bg-danger">${prod.tipo}</span> <span class="badge bg-primary">${prod.elemento}</span></p>
                <div class="mb-1">${renderStars(prod.rating)}</div>
                <p class="card-text fw-bold">$${prod.precio.toLocaleString('es-CL')}</p>
                <button class="btn btn-danger add-to-cart w-100">Añadir al carrito</button>
            </div>
            <div class="product-modal card bg-dark text-white shadow-lg position-absolute d-none" style="z-index:10; left:50%; top:50%; transform:translate(-50%,-50%); width:220px; padding:0.7rem 1rem; border-radius:0.7rem;">
                <h6>Detalles</h6>
                <p class="mb-1">${prod.detalles}</p>
                <p class="mb-1"><b>Marca:</b> ${prod.marca}</p>
                <p class="mb-1"><b>Popularidad:</b> ${prod.popularidad}</p>
            </div>
        </div>`;
        grid.appendChild(card);
    });
    document.getElementById('product-count').textContent = `${filteredProducts.length} productos encontrados`;
    renderPagination();
    setProductEvents();
}

function renderPagination() {
    const pag = document.getElementById('pagination');
    pag.innerHTML = '';
    const totalPages = Math.ceil(filteredProducts.length/pageSize);
    if(totalPages <= 1) return;
    for(let i=1; i<=totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item'+(i===currentPage?' active':'');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', e => {
            e.preventDefault();
            currentPage = i;
            renderProducts();
        });
        pag.appendChild(li);
    }
}

function setProductEvents() {
    // Modal rápido al hover
    document.querySelectorAll('.product-hover').forEach(card => {
        const modal = card.querySelector('.product-modal');
        card.addEventListener('mouseenter', () => {
            modal.classList.remove('d-none');
        });
        card.addEventListener('mouseleave', () => {
            modal.classList.add('d-none');
        });
        // Hacer el modal clickeable para ir a la página de detalle
        modal.style.cursor = 'pointer';
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
            // Obtener el id del producto
            const id = card.getAttribute('data-id');
            window.location.href = `detalle.html?id=${id}`;
        });
    });
    // Añadir al carrito con persistencia
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            // Obtener producto
            const card = btn.closest('.product-card');
            const nombre = card.querySelector('.card-title a, .card-title').textContent.trim();
            const precio = parseInt(card.querySelector('.card-text.fw-bold').textContent.replace(/[^0-9]/g, ''));
            const imagen = card.querySelector('img').src;
            // Buscar en productos para obtener id
            let prod = window.productos?.find(p => p.nombre === nombre);
            let id = prod ? prod.id : nombre;
            // Cargar carrito
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let idx = cart.findIndex(p => p.id === id);
            if(idx >= 0) {
                cart[idx].cantidad += 1;
            } else {
                cart.push({id, nombre, precio, imagen, cantidad:1});
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            // Actualizar contador
            let cartCountSpan = document.getElementById('cart-count');
            let count = cart.reduce((a,b)=>a+b.cantidad,0);
            cartCountSpan.textContent = count;
            btn.classList.add('btn-success');
            btn.classList.remove('btn-danger');
            btn.textContent = '¡Agregado!';
            setTimeout(() => {
                btn.textContent = 'Añadir al carrito';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-danger');
            }, 1200);
        });
    });
}

function applyFilters() {
    let tipo = Array.from(document.getElementById('filter-tipo').selectedOptions).map(o=>o.value);
    let elemento = Array.from(document.getElementById('filter-elemento').selectedOptions).map(o=>o.value);
    let marca = Array.from(document.getElementById('filter-marca').selectedOptions).map(o=>o.value);
    let precio = parseInt(document.getElementById('filter-precio').value)||25000;
    filteredProducts = productos.filter(p =>
        (tipo.length===0 || tipo.includes(p.tipo)) &&
        (elemento.length===0 || elemento.includes(p.elemento)) &&
        (marca.length===0 || marca.includes(p.marca)) &&
        (p.precio <= precio)
    );
    sortProducts();
    currentPage = 1;
    renderProducts();
}

function sortProducts() {
    if(sortBy==='precio-asc') filteredProducts.sort((a,b)=>a.precio-b.precio);
    else if(sortBy==='precio-desc') filteredProducts.sort((a,b)=>b.precio-a.precio);
    else if(sortBy==='popularidad') filteredProducts.sort((a,b)=>b.popularidad-a.popularidad);
    else filteredProducts.sort((a,b)=>a.novedades-b.novedades);
}

document.addEventListener('DOMContentLoaded', function() {
    // Filtros
    document.getElementById('filter-tipo').addEventListener('change', applyFilters);
    document.getElementById('filter-elemento').addEventListener('change', applyFilters);
    document.getElementById('filter-marca').addEventListener('change', applyFilters);
    document.getElementById('filter-precio').addEventListener('input', function() {
        document.getElementById('precio-max').textContent = `$${this.value.toLocaleString('es-CL')}`;
        applyFilters();
    });
    document.getElementById('clear-filters').addEventListener('click', function() {
        document.getElementById('filter-tipo').selectedIndex = -1;
        document.getElementById('filter-elemento').selectedIndex = -1;
        document.getElementById('filter-marca').selectedIndex = -1;
        document.getElementById('filter-precio').value = 25000;
        document.getElementById('precio-max').textContent = '$25.000';
        applyFilters();
    });
    document.getElementById('sort-select').addEventListener('change', function() {
        sortBy = this.value;
        sortProducts();
        currentPage = 1;
        renderProducts();
    });
    applyFilters();
});
