// usuarios.js - Gestión de usuarios admin BaybladeStore (demo localStorage)

let usuarios = JSON.parse(localStorage.getItem('admin_usuarios')) || [
  {id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', fecha: '2025-09-01', estado: 'activo', rol: 'usuario'},
  {id: 2, nombre: 'Ana Torres', email: 'ana@email.com', fecha: '2025-09-02', estado: 'activo', rol: 'admin'},
  {id: 3, nombre: 'Carlos Ruiz', email: 'carlos@email.com', fecha: '2025-09-03', estado: 'inactivo', rol: 'usuario'}
];
let editId = null;
let accionPendiente = null;

function guardarUsuarios() {
  localStorage.setItem('admin_usuarios', JSON.stringify(usuarios));
}

function renderTabla(filtro = '', rol = '', estado = '') {
  const tbody = document.getElementById('tabla-usuarios');
  let lista = usuarios.filter(u =>
    (u.nombre.toLowerCase().includes(filtro.toLowerCase()) || u.email.toLowerCase().includes(filtro.toLowerCase())) &&
    (rol ? u.rol === rol : true) &&
    (estado ? u.estado === estado : true)
  );
  tbody.innerHTML = lista.map((u, i) => `
    <tr>
      <td>${i+1}</td>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${u.fecha}</td>
      <td><span class="badge ${u.estado==='activo'?'bg-success':'bg-secondary'}">${u.estado.charAt(0).toUpperCase()+u.estado.slice(1)}</span></td>
      <td><span class="badge ${u.rol==='admin'?'bg-warning text-dark':'bg-primary'}">${u.rol.charAt(0).toUpperCase()+u.rol.slice(1)}</span></td>
      <td>
        <button class="btn btn-sm btn-warning btn-action" onclick="editarUsuario(${u.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-danger btn-action" onclick="confirmarEliminar(${u.id})"><i class="bi bi-trash"></i></button>
        <button class="btn btn-sm btn-secondary btn-action" onclick="confirmarCambioRol(${u.id})"><i class="bi bi-shield-lock"></i></button>
      </td>
    </tr>
  `).join('');
  renderEstadisticas();
}

function renderEstadisticas() {
  const activos = usuarios.filter(u => u.estado === 'activo').length;
  const inactivos = usuarios.filter(u => u.estado === 'inactivo').length;
  document.getElementById('usuarios-activos').textContent = activos;
  document.getElementById('usuarios-inactivos').textContent = inactivos;
}

document.getElementById('busqueda').addEventListener('input', e => {
  renderTabla(e.target.value, document.getElementById('filtro-rol').value, document.getElementById('filtro-estado').value);
});
document.getElementById('filtro-rol').addEventListener('change', e => {
  renderTabla(document.getElementById('busqueda').value, e.target.value, document.getElementById('filtro-estado').value);
});
document.getElementById('filtro-estado').addEventListener('change', e => {
  renderTabla(document.getElementById('busqueda').value, document.getElementById('filtro-rol').value, e.target.value);
});

document.getElementById('formUsuario').onsubmit = function(e) {
  e.preventDefault();
  // Validación
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const rol = document.getElementById('rol');
  const estado = document.getElementById('estado');
  let valido = true;
  [nombre, email, rol, estado].forEach(f => f.classList.remove('is-invalid'));
  if (!nombre.value.trim()) { nombre.classList.add('is-invalid'); valido = false; }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) { email.classList.add('is-invalid'); valido = false; }
  if (!rol.value) { rol.classList.add('is-invalid'); valido = false; }
  if (!estado.value) { estado.classList.add('is-invalid'); valido = false; }
  if (!valido) return;
  // Editar
  usuarios = usuarios.map(u => u.id === editId ? {
    ...u,
    nombre: nombre.value,
    email: email.value,
    rol: rol.value,
    estado: estado.value
  } : u);
  guardarUsuarios();
  renderTabla();
  var modal = bootstrap.Modal.getInstance(document.getElementById('modalUsuario'));
  modal.hide();
};

window.editarUsuario = function(id) {
  const u = usuarios.find(u => u.id === id);
  if (!u) return;
  editId = id;
  document.getElementById('nombre').value = u.nombre;
  document.getElementById('email').value = u.email;
  document.getElementById('rol').value = u.rol;
  document.getElementById('estado').value = u.estado;
  var modal = new bootstrap.Modal(document.getElementById('modalUsuario'));
  modal.show();
};

window.confirmarEliminar = function(id) {
  accionPendiente = () => {
    usuarios = usuarios.filter(u => u.id !== id);
    guardarUsuarios();
    renderTabla();
  };
  document.getElementById('confirmarMensaje').textContent = '¿Estás seguro de eliminar este usuario?';
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmar'));
  modal.show();
};

window.confirmarCambioRol = function(id) {
  const u = usuarios.find(u => u.id === id);
  if (!u) return;
  accionPendiente = () => {
    u.rol = u.rol === 'admin' ? 'usuario' : 'admin';
    guardarUsuarios();
    renderTabla();
  };
  document.getElementById('confirmarMensaje').textContent = `¿Cambiar rol de ${u.nombre} a ${u.rol === 'admin' ? 'Usuario' : 'Administrador'}?`;
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmar'));
  modal.show();
};

document.getElementById('btnConfirmarAccion').onclick = function() {
  if (accionPendiente) accionPendiente();
  var modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmar'));
  modal.hide();
};

// Reset modal al cerrar
['modalUsuario'].forEach(mid => {
  document.getElementById(mid).addEventListener('hidden.bs.modal', () => {
    document.getElementById('formUsuario').reset();
    editId = null;
    ['nombre','email','rol','estado'].forEach(f=>document.getElementById(f).classList.remove('is-invalid'));
  });
});

// Inicializar
renderTabla();
