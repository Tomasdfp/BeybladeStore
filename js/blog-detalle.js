// blog-detalle.js - Renderiza el detalle de un artículo del blog

const articulos = [
  {
    id: 1,
    titulo: '5 Estrategias para Ganar Torneos Beyblade',
    contenido: `<p>Descubre las mejores tácticas para dominar la arena y vencer a tus rivales en torneos oficiales. Aquí te compartimos 5 estrategias clave para mejorar tu juego:</p>
    <ol>
      <li><b>Conoce tu Beyblade:</b> Analiza sus fortalezas y debilidades.</li>
      <li><b>Observa a tus rivales:</b> Aprende de sus lanzamientos y movimientos.</li>
      <li><b>Practica diferentes lanzamientos:</b> El lanzamiento correcto puede cambiar el resultado.</li>
      <li><b>Cuida el estado de tus piezas:</b> Un Beyblade bien mantenido rinde mejor.</li>
      <li><b>Adapta tu estrategia:</b> Cambia de táctica según el oponente.</li>
    </ol>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/2/2d/ValtryekV2.png',
    fecha: '2025-09-08',
    autor: 'Admin',
    categorias: ['Estrategias', 'Torneos'],
    etiquetas: ['tácticas', 'competencia']
  },
  {
    id: 2,
    titulo: 'Nuevos Lanzamientos: Beyblade 2025',
    contenido: `<p>Conoce los nuevos modelos y mejoras que llegan este año a la colección Beyblade. Los lanzamientos incluyen:</p>
    <ul>
      <li>Valtryek V4: Más rápido y resistente.</li>
      <li>Spryzen S5: Mejoras en defensa y balance.</li>
      <li>Fafnir F4: Absorción de energía mejorada.</li>
    </ul>
    <p>¡No te pierdas las novedades en nuestra tienda!</p>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/6/6e/Spryzen.png',
    fecha: '2025-09-06',
    autor: 'Equipo BaybladeStore',
    categorias: ['Nuevos Productos', 'Noticias'],
    etiquetas: ['lanzamientos', 'novedades']
  },
  {
    id: 3,
    titulo: 'Tutorial: Cómo Personalizar tu Beyblade',
    contenido: `<p>Aprende paso a paso a modificar y mejorar tu Beyblade para obtener el máximo rendimiento. Consejos:</p>
    <ul>
      <li>Elige piezas compatibles y de calidad.</li>
      <li>Prueba diferentes combinaciones.</li>
      <li>Mantén el equilibrio entre ataque y defensa.</li>
    </ul>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/7/7e/Fafnir.png',
    fecha: '2025-09-04',
    autor: 'Admin',
    categorias: ['Tutoriales'],
    etiquetas: ['personalización', 'guía']
  },
  {
    id: 4,
    titulo: 'Resumen del Torneo Nacional 2025',
    contenido: `<p>Revive los mejores momentos, combates y ganadores del torneo nacional de este año. ¡Felicidades a todos los participantes!</p>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/8/8e/Achilles.png',
    fecha: '2025-09-02',
    autor: 'Equipo BaybladeStore',
    categorias: ['Torneos', 'Noticias'],
    etiquetas: ['eventos', 'resultados']
  },
  {
    id: 5,
    titulo: '¿Qué Beyblade es Mejor para Principiantes?',
    contenido: `<p>Analizamos los modelos ideales para quienes se inician en el mundo Beyblade. Recomendaciones:</p>
    <ul>
      <li>Valtryek: Fácil de usar y resistente.</li>
      <li>Spryzen: Buen balance para aprender técnicas.</li>
    </ul>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/2/2d/ValtryekV2.png',
    fecha: '2025-08-30',
    autor: 'Admin',
    categorias: ['Tutoriales', 'Nuevos Productos'],
    etiquetas: ['guía', 'principiantes']
  },
  {
    id: 6,
    titulo: 'Noticias: Cambios en las Reglas Oficiales',
    contenido: `<p>Te contamos las últimas actualizaciones en el reglamento de torneos Beyblade. Consulta siempre las reglas antes de competir.</p>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/6/6e/Spryzen.png',
    fecha: '2025-08-28',
    autor: 'Equipo BaybladeStore',
    categorias: ['Noticias'],
    etiquetas: ['reglas', 'actualización']
  },
  {
    id: 7,
    titulo: 'Top 5 Combos Imparables',
    contenido: `<p>Los combos de piezas más efectivos para arrasar en la arena este año. ¡Experimenta y encuentra tu favorito!</p>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/7/7e/Fafnir.png',
    fecha: '2025-08-25',
    autor: 'Admin',
    categorias: ['Estrategias'],
    etiquetas: ['combos', 'tácticas']
  },
  {
    id: 8,
    titulo: 'Cómo Organizar tu Propio Torneo',
    contenido: `<p>Guía práctica para crear y gestionar un torneo Beyblade en tu ciudad. Pasos:</p>
    <ol>
      <li>Define las reglas y formato.</li>
      <li>Promociona el evento.</li>
      <li>Prepara el espacio y materiales.</li>
    </ol>`,
    imagen: 'https://static.wikia.nocookie.net/beyblade/images/8/8e/Achilles.png',
    fecha: '2025-08-20',
    autor: 'Equipo BaybladeStore',
    categorias: ['Torneos', 'Tutoriales'],
    etiquetas: ['organización', 'eventos']
  }
];

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

function renderDetalle() {
  const id = getQueryId();
  const art = articulos.find(a => a.id === id);
  if (!art) {
    document.getElementById('blog-detalle').innerHTML = '<div class="alert alert-danger">Artículo no encontrado.</div>';
    return;
  }
  document.getElementById('blog-detalle').innerHTML = `
    <div class="card mb-4 shadow-sm">
      <img src="${art.imagen}" class="card-img-top" alt="${art.titulo}">
      <div class="card-body">
        <h1 class="card-title mb-2" style="color:#c31432;">${art.titulo}</h1>
        <div class="mb-2 text-muted">
          <i class="bi bi-calendar-event"></i> ${art.fecha} &nbsp; <i class="bi bi-person"></i> ${art.autor}
        </div>
        <div class="mb-3">
          ${art.categorias.map(c=>`<span class='badge bg-primary me-1'>${c}</span>`).join(' ')}
          ${art.etiquetas.map(e=>`<span class='badge bg-warning text-dark me-1'>#${e}</span>`).join(' ')}
        </div>
        <div class="fs-5 mb-3">${art.contenido}</div>
        <a href="blog.html" class="btn btn-outline-primary"><i class="bi bi-arrow-left"></i> Volver al blog</a>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderDetalle);
