// blog.js - Blog principal BaybladeStore (demo, filtrado, búsqueda, paginación)

const articulos = [
  {
    id: 1,
    titulo: '5 Estrategias para Ganar Torneos Beyblade',
    extracto: 'Descubre las mejores tácticas para dominar la arena y vencer a tus rivales en torneos oficiales.',
    imagen: 'img/Blog/12452.jpg',
    fecha: '2025-09-08',
    autor: 'Admin',
    categorias: ['Estrategias', 'Torneos'],
    etiquetas: ['tácticas', 'competencia'],
    popular: true
  },
  {
    id: 2,
    titulo: 'Nuevos Lanzamientos: Beyblade 2025',
    extracto: 'Conoce los nuevos modelos y mejoras que llegan este año a la colección Beyblade.',
    imagen: 'img/Blog/13-180232_5mej_WhatsApp-Image-2025-08-13-at-1.42.26-PM-1200x648.jpeg',
    fecha: '2025-09-06',
    autor: 'Equipo BaybladeStore',
    categorias: ['Nuevos Productos', 'Noticias'],
    etiquetas: ['lanzamientos', 'novedades'],
    popular: true
  },
  {
    id: 3,
    titulo: 'Tutorial: Cómo Personalizar tu Beyblade',
    extracto: 'Aprende paso a paso a modificar y mejorar tu Beyblade para obtener el máximo rendimiento.',
    imagen: 'img/Blog/16dea73c6e8bc4bb2dcaa3618d88b771adf0a620ec153d58fd9c5f54f8367a90.avif',
    fecha: '2025-09-04',
    autor: 'Admin',
    categorias: ['Tutoriales'],
    etiquetas: ['personalización', 'guía'],
    popular: false
  },
  {
    id: 4,
    titulo: 'Resumen del Torneo Nacional 2025',
    extracto: 'Revive los mejores momentos, combates y ganadores del torneo nacional de este año.',
    imagen: 'img/Blog/el_coleccionista_villano_beyblade.jpg',
    fecha: '2025-09-02',
    autor: 'Equipo BaybladeStore',
    categorias: ['Torneos', 'Noticias'],
    etiquetas: ['eventos', 'resultados'],
    popular: true
  },
  {
    id: 5,
    titulo: '¿Qué Beyblade es Mejor para Principiantes?',
    extracto: 'Analizamos los modelos ideales para quienes se inician en el mundo Beyblade.',
    imagen: 'img/Blog/Hasbro-sorprende-al-mundo-Beyblade-con-nuevo-auspicio-para-El-coleccionista-Dolapebeyblade-y-Rmbeyblade-de-la-comunidad.jpg',
    fecha: '2025-08-30',
    autor: 'Admin',
    categorias: ['Tutoriales', 'Nuevos Productos'],
    etiquetas: ['guía', 'principiantes'],
    popular: false
  },
  {
    id: 6,
    titulo: 'Noticias: Cambios en las Reglas Oficiales',
    extracto: 'Te contamos las últimas actualizaciones en el reglamento de torneos Beyblade.',
    imagen: 'img/Blog/hq720.jpg',
    fecha: '2025-08-28',
    autor: 'Equipo BaybladeStore',
    categorias: ['Noticias'],
    etiquetas: ['reglas', 'actualización'],
    popular: false
  },
  {
    id: 7,
    titulo: 'Top 5 Combos Imparables',
    extracto: 'Los combos de piezas más efectivos para arrasar en la arena este año.',
    imagen: 'img/Blog/images (1).jpeg',
    fecha: '2025-08-25',
    autor: 'Admin',
    categorias: ['Estrategias'],
    etiquetas: ['combos', 'tácticas'],
    popular: true
  },
  {
    id: 8,
    titulo: 'Cómo Organizar tu Propio Torneo',
    extracto: 'Guía práctica para crear y gestionar un torneo Beyblade en tu ciudad.',
    imagen: 'img/Blog/images.jpeg',
    fecha: '2025-08-20',
    autor: 'Equipo BaybladeStore',
    categorias: ['Torneos', 'Tutoriales'],
    etiquetas: ['organización', 'eventos'],
    popular: false
  }
];

const pageSize = 6;
let currentPage = 1;
let currentCat = '';
let currentSearch = '';

function renderArticulos() {
  let lista = articulos.filter(a =>
    (currentCat === '' || a.categorias.includes(currentCat)) &&
    (a.titulo.toLowerCase().includes(currentSearch) || a.extracto.toLowerCase().includes(currentSearch) || a.etiquetas.join(' ').toLowerCase().includes(currentSearch))
  );
  const grid = document.getElementById('blog-grid');
  grid.innerHTML = lista.slice(0, currentPage * pageSize).map((a, idx) => {
    let detalleHref = (idx % 2 === 0) ? 'detalle-blog-1.html' : 'detalle-blog-2.html';
    return `
      <div class="blog-card">
        <img src="${a.imagen}" class="blog-card-img" alt="${a.titulo}">
        <div class="blog-card-body">
          <div class="blog-card-title">${a.titulo}</div>
          <div class="blog-card-meta">
            <i class="bi bi-calendar-event"></i> ${a.fecha} &nbsp; <i class="bi bi-person"></i> ${a.autor}
          </div>
          <div class="blog-card-tags mb-2">
            ${a.categorias.map(c=>`<span class="badge">${c}</span>`).join(' ')}
          </div>
          <div class="blog-card-extract">${a.extracto}</div>
          <div class="blog-card-footer">
            <span></span>
            <a href="${detalleHref}" class="btn btn-sm">Leer más <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      </div>
    `;
  }).join('');
  // Paginación
  document.getElementById('load-more').style.display = (lista.length > currentPage * pageSize) ? 'inline-block' : 'none';
}

function renderPopulares() {
  const pop = articulos.filter(a => a.popular).slice(0,4);
  document.getElementById('populares-list').innerHTML = pop.map((a, idx) =>
    `<li><a href="${idx % 2 === 0 ? 'detalle-blog-1.html' : 'detalle-blog-2.html'}">${a.titulo}</a></li>`
  ).join('');
}

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    currentPage = 1;
    renderArticulos();
  };
});
document.querySelectorAll('.category-link').forEach(link => {
  link.onclick = function(e) {
    e.preventDefault();
    document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
    document.querySelector(`.category-btn[data-cat='${link.dataset.cat}']`).classList.add('active');
    currentCat = link.dataset.cat;
    currentPage = 1;
    renderArticulos();
  };
});
document.getElementById('blog-search').addEventListener('input', e => {
  currentSearch = e.target.value.toLowerCase();
  currentPage = 1;
  renderArticulos();
});
document.getElementById('load-more').onclick = function() {
  currentPage++;
  renderArticulos();
};

document.getElementById('newsletter-form').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email');
  const success = document.getElementById('newsletter-success');
  if (/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email.value)) {
    success.classList.remove('d-none');
    setTimeout(()=>success.classList.add('d-none'), 2000);
    email.value = '';
  } else {
    email.classList.add('is-invalid');
    setTimeout(()=>email.classList.remove('is-invalid'), 1200);
  }
};

// Inicializar
renderArticulos();
renderPopulares();
