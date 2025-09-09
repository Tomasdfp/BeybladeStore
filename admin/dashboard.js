// dashboard.js - Dashboard Admin BaybladeStore (demo datos)

document.addEventListener('DOMContentLoaded', () => {
    // Estadísticas demo
    document.getElementById('ventas-hoy').textContent = '$1,250';
    document.getElementById('usuarios-registrados').textContent = '312';
    document.getElementById('total-productos').textContent = '48';

    // Gráfico de ventas (demo)
    const ctx = document.getElementById('ventasChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Ventas ($)',
                data: [200, 350, 400, 300, 500, 700, 1250],
                borderColor: '#2196f3',
                backgroundColor: 'rgba(33,150,243,0.08)',
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#c31432',
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Productos más vendidos (demo)
    const masVendidos = [
        { nombre: 'Beyblade Valtryek', cantidad: 32 },
        { nombre: 'Beyblade Spryzen', cantidad: 27 },
        { nombre: 'Beyblade Fafnir', cantidad: 19 },
        { nombre: 'Beyblade Achilles', cantidad: 15 }
    ];
    document.getElementById('mas-vendidos').innerHTML = masVendidos.map(p =>
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${p.nombre}
            <span class="badge bg-primary rounded-pill">${p.cantidad}</span>
        </li>`
    ).join('');

    // Últimos pedidos (demo)
    const ultimosPedidos = [
        { id: 1012, cliente: 'Juan Pérez', fecha: '09/09/2025', total: '$120', estado: 'Pendiente' },
        { id: 1011, cliente: 'Ana Torres', fecha: '09/09/2025', total: '$85', estado: 'Enviado' },
        { id: 1010, cliente: 'Carlos Ruiz', fecha: '08/09/2025', total: '$210', estado: 'Entregado' },
        { id: 1009, cliente: 'Lucía Gómez', fecha: '08/09/2025', total: '$60', estado: 'Pendiente' }
    ];
    document.getElementById('ultimos-pedidos').innerHTML = ultimosPedidos.map(p =>
        `<tr>
            <td>${p.id}</td>
            <td>${p.cliente}</td>
            <td>${p.fecha}</td>
            <td>${p.total}</td>
            <td><span class="badge ${p.estado==='Pendiente'?'bg-warning text-dark':p.estado==='Enviado'?'bg-info text-dark':'bg-success'}">${p.estado}</span></td>
        </tr>`
    ).join('');

    // Alertas (demo)
    const alertas = [
        { tipo: 'stock', mensaje: 'Stock bajo: Beyblade Fafnir (3 uds)' },
        { tipo: 'pedido', mensaje: '2 pedidos pendientes de envío' }
    ];
    document.getElementById('alertas').innerHTML = alertas.map(a =>
        `<div class="alert alert-${a.tipo==='stock'?'warning':'danger'} alert-stock py-2 mb-2">
            <i class="bi ${a.tipo==='stock'?'bi-exclamation-triangle':'bi-bag'} me-2"></i>${a.mensaje}
        </div>`
    ).join('');
});
