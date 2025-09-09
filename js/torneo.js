// Lógica JS para inscripción a torneo BeybladeStore
// Validación, UX, localStorage, QR, PDF, etc.
document.addEventListener('DOMContentLoaded', function() {
    // --- Variables y Selectores ---
    const formSection = document.getElementById('form-section');
    const confirmationSection = document.getElementById('confirmation-section');
    const completedSection = document.getElementById('completed-section');
    const stepInfo = document.getElementById('step-info');
    const stepConfirm = document.getElementById('step-confirm');
    const stepComplete = document.getElementById('step-complete');
    let formData = JSON.parse(localStorage.getItem('torneoFormData')) || {};
    let currentStep = 1;
    let categoriaLimites = { 'Principiante': 30, 'Intermedio': 30, 'Avanzado': 20 };
    let categoriaContador = { 'Principiante': 12, 'Intermedio': 8, 'Avanzado': 5 }; // Simulado
    // --- Render Formulario ---
    function renderForm() {
        formSection.innerHTML = `
        <form id="inscripcion-form" autocomplete="off" novalidate>
            <div class="card mb-4">
                <div class="card-header bg-primary text-white"><i class="bi bi-person-fill"></i> Datos personales</div>
                <div class="card-body row g-3">
                    <div class="col-md-6 form-group">
                        <label for="nombre"><i class="bi bi-person"></i> Nombre completo</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" maxlength="60" required value="${formData.nombre||''}">
                        <div class="form-text"><span id="nombre-count">0</span>/60</div>
                        <div class="invalid-feedback">Ingresa tu nombre completo.</div>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="email"><i class="bi bi-envelope"></i> Email</label>
                        <input type="email" class="form-control" id="email" name="email" required value="${formData.email||''}">
                        <div class="invalid-feedback">Ingresa un email válido.</div>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="telefono"><i class="bi bi-telephone"></i> Teléfono</label>
                        <input type="tel" class="form-control" id="telefono" name="telefono" required pattern="^[0-9\-\+\s]{8,15}$" value="${formData.telefono||''}">
                        <div class="invalid-feedback">Ingresa un teléfono válido.</div>
                    </div>
                    <div class="col-md-3 form-group">
                        <label for="edad"><i class="bi bi-cake"></i> Edad</label>
                        <input type="number" class="form-control" id="edad" name="edad" min="8" max="99" required value="${formData.edad||''}">
                        <div class="invalid-feedback">Edad mínima: 8 años.</div>
                    </div>
                    <div class="col-md-3 form-group">
                        <label for="categoria"><i class="bi bi-award"></i> Categoría</label>
                        <select class="form-select" id="categoria" name="categoria" required>
                            <option value="">Selecciona</option>
                            <option value="Principiante">Principiante (${categoriaContador['Principiante']}/${categoriaLimites['Principiante']})</option>
                            <option value="Intermedio">Intermedio (${categoriaContador['Intermedio']}/${categoriaLimites['Intermedio']})</option>
                            <option value="Avanzado">Avanzado (${categoriaContador['Avanzado']}/${categoriaLimites['Avanzado']})</option>
                        </select>
                        <div class="invalid-feedback">Selecciona una categoría válida.</div>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-header bg-danger text-white"><i class="bi bi-gear"></i> Información del Beyblade</div>
                <div class="card-body row g-3">
                    <div class="col-md-6 form-group">
                        <label for="beyblade-nombre"><i class="bi bi-cpu"></i> Nombre del Beyblade</label>
                        <input type="text" class="form-control" id="beyblade-nombre" name="beyblade-nombre" maxlength="40" required value="${formData['beyblade-nombre']||''}">
                        <div class="form-text"><span id="beyblade-nombre-count">0</span>/40</div>
                        <div class="invalid-feedback">Ingresa el nombre de tu Beyblade.</div>
                    </div>
                    <div class="col-md-3 form-group">
                        <label for="beyblade-tipo"><i class="bi bi-lightning"></i> Tipo</label>
                        <select class="form-select" id="beyblade-tipo" name="beyblade-tipo" required>
                            <option value="">Selecciona</option>
                            <option value="Ataque">Ataque</option>
                            <option value="Defensa">Defensa</option>
                            <option value="Equilibrio">Equilibrio</option>
                        </select>
                        <div class="invalid-feedback">Selecciona el tipo.</div>
                    </div>
                    <div class="col-md-3 form-group">
                        <label for="beyblade-elemento"><i class="bi bi-droplet"></i> Elemento</label>
                        <input type="text" class="form-control" id="beyblade-elemento" name="beyblade-elemento" maxlength="20" value="${formData['beyblade-elemento']||''}">
                        <div class="form-text"><span id="beyblade-elemento-count">0</span>/20</div>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="beyblade-img"><i class="bi bi-image"></i> Imagen del Beyblade (opcional)</label>
                        <input type="file" class="form-control" id="beyblade-img" name="beyblade-img" accept="image/*">
                        <img id="beyblade-img-preview" class="img-fluid mt-2 d-none" style="max-height:100px;" alt="Preview">
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-header bg-warning text-dark"><i class="bi bi-graph-up"></i> Experiencia previa</div>
                <div class="card-body row g-3">
                    <div class="col-md-6 form-group">
                        <label for="torneos-previos"><i class="bi bi-list-ol"></i> Número de torneos anteriores</label>
                        <input type="number" class="form-control" id="torneos-previos" name="torneos-previos" min="0" max="99" value="${formData['torneos-previos']||''}">
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="mejor-resultado"><i class="bi bi-trophy"></i> Mejor resultado</label>
                        <input type="text" class="form-control" id="mejor-resultado" name="mejor-resultado" maxlength="30" value="${formData['mejor-resultado']||''}">
                        <div class="form-text"><span id="mejor-resultado-count">0</span>/30</div>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body">
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox" id="acuerdo" name="acuerdo" required>
                        <label class="form-check-label" for="acuerdo">He leído y acepto el <span class="reglamento-link" data-bs-toggle="modal" data-bs-target="#reglamentoModal">reglamento oficial</span></label>
                        <div class="invalid-feedback">Debes aceptar el reglamento.</div>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="newsletter" name="newsletter">
                        <label class="form-check-label" for="newsletter">Deseo recibir información de futuros torneos</label>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-danger btn-lg" id="submit-btn">
                    <span id="submit-text">Confirmar inscripción</span>
                    <span id="submit-loading" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                </button>
            </div>
        </form>`;
    }
    renderForm();
    // ...lógica de validación, UX, localStorage, stepper, confirmación, QR, PDF, etc. irá aquí...
});
