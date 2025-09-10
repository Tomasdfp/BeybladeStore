// productos.js - CRUD Productos Admin BaybladeStore (demo localStorage)

let productos = JSON.parse(localStorage.getItem('admin_productos')) || [
  {id: 1, nombre: 'Valtryek', categoria: 'Ataque', precio: 19.99, stock: 12, descripcion: 'Beyblade de ataque', imagenes: 'https://static.wikia.nocookie.net/beyblade/images/2/2d/ValtryekV2.png', especificaciones: 'Peso: 45g'},
  {id: 2, nombre: 'Spryzen', categoria: 'Defensa', precio: 21.5, stock: 7, descripcion: 'Beyblade de defensa', imagenes: '', especificaciones: 'Peso: 48g'},
  {id: 3, nombre: 'Fafnir', categoria: 'Resistencia', precio: 22.0, stock: 3, descripcion: 'Beyblade de resistencia', imagenes: '', especificaciones: 'Peso: 44g'}
];
let editId = null;

function guardarProductos() {
  localStorage.setItem('admin_productos', JSON.stringify(productos));
}

function renderTabla(filtro = '', categoria = '') {
  const tbody = document.getElementById('tabla-productos');
  let lista = productos.filter(p =>
    (p.nombre.toLowerCase().includes(filtro.toLowerCase()) || p.categoria.toLowerCase().includes(filtro.toLowerCase())) &&
    (categoria ? p.categoria === categoria : true)
  );
  tbody.innerHTML = lista.map((p, i) => `
    <tr>
      <td>${i+1}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${p.precio.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-sm btn-info btn-action" onclick="verProducto(${p.id})"><i class="bi bi-eye"></i></button>
        <button class="btn btn-sm btn-warning btn-action" onclick="editarProducto(${p.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-danger btn-action" onclick="confirmarEliminar(${p.id})"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
  renderCategorias();
}

function renderCategorias() {
  const select = document.getElementById('filtro-categoria');
  const cats = [...new Set(productos.map(p => p.categoria))];
  select.innerHTML = '<option value="">Todas las categorías</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

document.getElementById('busqueda').addEventListener('input', e => {
  renderTabla(e.target.value, document.getElementById('filtro-categoria').value);
});
document.getElementById('filtro-categoria').addEventListener('change', e => {
  renderTabla(document.getElementById('busqueda').value, e.target.value);
});

document.getElementById('formProducto').onsubmit = function(e) {
  e.preventDefault();
  // Validación
  const nombre = document.getElementById('nombre');
  const categoria = document.getElementById('categoria');
  const precio = document.getElementById('precio');
  const stock = document.getElementById('stock');
  let valido = true;
  [nombre, categoria, precio, stock].forEach(f => f.classList.remove('is-invalid'));
  if (!nombre.value.trim()) { nombre.classList.add('is-invalid'); valido = false; }
  if (!categoria.value.trim()) { categoria.classList.add('is-invalid'); valido = false; }
  if (!(+precio.value > 0)) { precio.classList.add('is-invalid'); valido = false; }
  if (!Number.isInteger(+stock.value) || +stock.value < 0) { stock.classList.add('is-invalid'); valido = false; }
  if (!valido) return;
  // Crear o editar
  const prod = {
    id: editId || (productos.length ? Math.max(...productos.map(p=>p.id))+1 : 1),
    nombre: nombre.value,
    categoria: categoria.value,
    precio: +precio.value,
    stock: +stock.value,
    descripcion: document.getElementById('descripcion').value,
    imagenes: document.getElementById('imagenes').value,
    especificaciones: document.getElementById('especificaciones').value
  };
  let exito = false;
  if (editId) {
    productos = productos.map(p => p.id === editId ? prod : p);
  } else {
    productos.push(prod);
    exito = true;
  }
  guardarProductos();
  renderTabla();
  document.getElementById('formProducto').reset();
  editId = null;
  document.getElementById('modalProductoLabel').textContent = 'Nuevo Producto';
  var modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
  modal.hide();
  if (exito) {
    mostrarMensajeExito('¡Producto creado con éxito!');
  }

  function mostrarMensajeExito(msg) {
    let alerta = document.createElement('div');
    alerta.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow';
    alerta.style.zIndex = 2000;
    alerta.textContent = msg;
    document.body.appendChild(alerta);
    setTimeout(()=>{ alerta.remove(); }, 2200);
  }
};

window.editarProducto = function(id) {
  const p = productos.find(p => p.id === id);
  if (!p) return;
  editId = id;
  document.getElementById('nombre').value = p.nombre;
  document.getElementById('categoria').value = p.categoria;
  document.getElementById('precio').value = p.precio;
  document.getElementById('stock').value = p.stock;
  document.getElementById('descripcion').value = p.descripcion;
  document.getElementById('imagenes').value = p.imagenes;
  document.getElementById('especificaciones').value = p.especificaciones;
  document.getElementById('modalProductoLabel').textContent = 'Editar Producto';
  var modal = new bootstrap.Modal(document.getElementById('modalProducto'));
  modal.show();
};

window.verProducto = function(id) {
  const p = productos.find(p => p.id === id);
  if (!p) return alert('Producto no encontrado');
  alert(`Nombre: ${p.nombre}\nCategoría: ${p.categoria}\nPrecio: $${p.precio}\nStock: ${p.stock}\nDescripción: ${p.descripcion}`);
};

window.confirmarEliminar = function(id) {
  document.getElementById('btnEliminarConfirmado').onclick = function() {
    productos = productos.filter(p => p.id !== id);
    guardarProductos();
    renderTabla();
    var modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmar'));
    modal.hide();
  };
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmar'));
  modal.show();
};

// Reset modal al cerrar
['modalProducto'].forEach(mid => {
  document.getElementById(mid).addEventListener('hidden.bs.modal', () => {
    document.getElementById('formProducto').reset();
    editId = null;
    document.getElementById('modalProductoLabel').textContent = 'Nuevo Producto';
    ['nombre','categoria','precio','stock'].forEach(f=>document.getElementById(f).classList.remove('is-invalid'));
  });
});

// Inicializar
renderTabla();
