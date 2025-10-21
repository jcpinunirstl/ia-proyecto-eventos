import EventoAPI from './api.js';

class EventoUI {
    constructor() {
        this.eventos = [];
        this.tipoEventos = [];
        this.personas = [];
        this.tipoEventosList = [];
        this.asistencias = [];
        this.modal = document.getElementById('formModal');
        this.form = document.getElementById('eventForm');
        this.formTitle = document.getElementById('formTitle');
        this.eventsBody = document.getElementById('eventsBody');
        this.tipoEventoSelect = document.getElementById('tipoEventoId');

        this.personaModal = document.getElementById('personaModal');
        this.personaForm = document.getElementById('personaForm');
        this.personaFormTitle = document.getElementById('personaFormTitle');
        this.personasBody = document.getElementById('personasBody');

        this.tipoEventoModal = document.getElementById('tipoEventoModal');
        this.tipoEventoForm = document.getElementById('tipoEventoForm');
        this.tipoEventoFormTitle = document.getElementById('tipoEventoFormTitle');
        this.tipoEventosBody = document.getElementById('tipoEventosBody');

        this.asistenciaModal = document.getElementById('asistenciaModal');
        this.asistenciaForm = document.getElementById('asistenciaForm');
        this.asistenciaFormTitle = document.getElementById('asistenciaFormTitle');
        this.asistenciasBody = document.getElementById('asistenciasBody');
        this.asistenciaEventoSelect = document.getElementById('asistenciaEventoId');
        this.asistenciaPersonaSelect = document.getElementById('asistenciaPersonaId');

        this.init();
    }

    async init() {
        await this.loadTipoEventos();
        await this.loadEventos();
        await this.loadPersonas();
        await this.loadTipoEventosList();
        await this.loadAsistencias();

        document.getElementById('createBtn').addEventListener('click', () => this.showCreateForm());
        document.querySelector('.close').addEventListener('click', () => this.hideModal());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });

        document.getElementById('createPersonaBtn').addEventListener('click', () => this.showCreatePersonaForm());
        document.querySelector('.close-persona').addEventListener('click', () => this.hidePersonaModal());
        this.personaForm.addEventListener('submit', (e) => this.handlePersonaSubmit(e));
        window.addEventListener('click', (e) => {
            if (e.target === this.personaModal) {
                this.hidePersonaModal();
            }
        });

        document.getElementById('createTipoEventoBtn').addEventListener('click', () => this.showCreateTipoEventoForm());
        document.querySelector('.close-tipo-evento').addEventListener('click', () => this.hideTipoEventoModal());
        this.tipoEventoForm.addEventListener('submit', (e) => this.handleTipoEventoSubmit(e));
        window.addEventListener('click', (e) => {
            if (e.target === this.tipoEventoModal) {
                this.hideTipoEventoModal();
            }
        });

        document.getElementById('createAsistenciaBtn').addEventListener('click', () => this.showCreateAsistenciaForm());
        document.querySelector('.close-asistencia').addEventListener('click', () => this.hideAsistenciaModal());
        this.asistenciaForm.addEventListener('submit', (e) => this.handleAsistenciaSubmit(e));
        window.addEventListener('click', (e) => {
            if (e.target === this.asistenciaModal) {
                this.hideAsistenciaModal();
            }
        });
    }

    async loadTipoEventos() {
        try {
            this.tipoEventos = await EventoAPI.getTipoEventos();
            this.populateTipoEventoSelect();
        } catch (error) {
            console.error('Error cargando tipos de evento:', error);
            alert('Error al cargar tipos de evento');
        }
    }

    populateTipoEventoSelect() {
        this.tipoEventoSelect.innerHTML = '';
        this.tipoEventos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.nombre;
            this.tipoEventoSelect.appendChild(option);
        });
    }

    async loadEventos() {
        try {
            this.eventos = await EventoAPI.getEventos();
            this.renderEventos();
        } catch (error) {
            console.error('Error cargando eventos:', error);
            alert('Error al cargar eventos');
        }
    }

    renderEventos() {
        this.eventsBody.innerHTML = '';
        this.eventos.forEach(evento => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${evento.id}</td>
                <td>${evento.nombre}</td>
                <td>${evento.descripcion}</td>
                <td>${evento.direccion}</td>
                <td>${evento.costo}</td>
                <td>${evento.fechaInicio}</td>
                <td>${evento.fechaFin}</td>
                <td>${evento.horaInicio}</td>
                <td>${evento.horaFin}</td>
                <td>${evento.tipoEvento ? evento.tipoEvento.nombre : ''}</td>
                <td>${evento.estado ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <button class="btn btn-edit">Editar</button>
                    <button class="btn btn-delete">Eliminar</button>
                </td>
            `;
            const editBtn = row.querySelector('.btn-edit');
            const deleteBtn = row.querySelector('.btn-delete');
            editBtn.addEventListener('click', () => this.editEvento(evento.id));
            deleteBtn.addEventListener('click', () => this.deleteEvento(evento.id));
            this.eventsBody.appendChild(row);
        });
    }

    showCreateForm() {
        this.formTitle.textContent = 'Crear Evento';
        this.form.reset();
        document.getElementById('eventId').value = '';
        this.modal.style.display = 'block';
    }

    async editEvento(id) {
        try {
            const evento = await EventoAPI.getEvento(id);
            this.formTitle.textContent = 'Editar Evento';
            document.getElementById('eventId').value = evento.id;
            document.getElementById('nombre').value = evento.nombre;
            document.getElementById('descripcion').value = evento.descripcion;
            document.getElementById('direccion').value = evento.direccion;
            document.getElementById('costo').value = evento.costo;
            document.getElementById('fechaInicio').value = evento.fechaInicio;
            document.getElementById('fechaFin').value = evento.fechaFin;
            document.getElementById('horaInicio').value = evento.horaInicio;
            document.getElementById('horaFin').value = evento.horaFin;
            document.getElementById('tipoEventoId').value = evento.tipoEventoId;
            document.getElementById('estado').checked = evento.estado;
            this.modal.style.display = 'block';
        } catch (error) {
            console.error('Error cargando evento para editar:', error);
            alert('Error al cargar evento');
        }
    }

    async deleteEvento(id) {
        if (confirm('¿Está seguro de que desea eliminar este evento?')) {
            try {
                await EventoAPI.deleteEvento(id);
                await this.loadEventos();
                alert('Evento eliminado exitosamente');
            } catch (error) {
                console.error('Error eliminando evento:', error);
                alert('Error al eliminar evento');
            }
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const evento = {
            id: parseInt(formData.get('id')) || 0,
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            direccion: formData.get('direccion'),
            costo: parseFloat(formData.get('costo')),
            fechaInicio: formData.get('fechaInicio'),
            fechaFin: formData.get('fechaFin'),
            horaInicio: formData.get('horaInicio'),
            horaFin: formData.get('horaFin'),
            tipoEventoId: parseInt(formData.get('tipoEventoId')),
            estado: formData.has('estado'),
        };

        try {
            if (evento.id) {
                await EventoAPI.updateEvento(evento.id, evento);
                alert('Evento actualizado exitosamente');
            } else {
                await EventoAPI.createEvento(evento);
                alert('Evento creado exitosamente');
            }
            this.hideModal();
            await this.loadEventos();
        } catch (error) {
            console.error('Error guardando evento:', error);
            alert(error.message);
        }
    }

    async loadPersonas() {
        try {
            this.personas = await EventoAPI.getPersonas();
            this.renderPersonas();
        } catch (error) {
            console.error('Error cargando personas:', error);
            alert('Error al cargar personas');
        }
    }

    renderPersonas() {
        this.personasBody.innerHTML = '';
        this.personas.forEach(persona => {
            const row = document.createElement('tr');
            const generoTexto = persona.genero === 0 ? 'Masculino' : persona.genero === 1 ? 'Femenino' : 'Otro';
            row.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.telefono}</td>
                <td>${persona.fechaNacimiento}</td>
                <td>${generoTexto}</td>
                <td>${persona.estado ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <button class="btn btn-edit">Editar</button>
                    <button class="btn btn-delete">Eliminar</button>
                </td>
            `;
            const editBtn = row.querySelector('.btn-edit');
            const deleteBtn = row.querySelector('.btn-delete');
            editBtn.addEventListener('click', () => this.editPersona(persona.id));
            deleteBtn.addEventListener('click', () => this.deletePersona(persona.id));
            this.personasBody.appendChild(row);
        });
    }

    showCreatePersonaForm() {
        this.personaFormTitle.textContent = 'Crear Persona';
        this.personaForm.reset();
        document.getElementById('personaId').value = '';
        this.personaModal.style.display = 'block';
    }

    async editPersona(id) {
        try {
            const persona = await EventoAPI.getPersona(id);
            this.personaFormTitle.textContent = 'Editar Persona';
            document.getElementById('personaId').value = persona.id;
            document.getElementById('personaNombre').value = persona.nombre;
            document.getElementById('personaTelefono').value = persona.telefono;
            document.getElementById('personaFechaNacimiento').value = persona.fechaNacimiento;
            document.getElementById('personaGenero').value = persona.genero;
            document.getElementById('personaEstado').checked = persona.estado;
            this.personaModal.style.display = 'block';
        } catch (error) {
            console.error('Error cargando persona para editar:', error);
            alert('Error al cargar persona');
        }
    }

    async deletePersona(id) {
        if (confirm('¿Está seguro de que desea eliminar esta persona?')) {
            try {
                await EventoAPI.deletePersona(id);
                await this.loadPersonas();
                alert('Persona eliminada exitosamente');
            } catch (error) {
                console.error('Error eliminando persona:', error);
                alert('Error al eliminar persona');
            }
        }
    }

    async handlePersonaSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.personaForm);
        const persona = {
            id: parseInt(formData.get('id')) || 0,
            nombre: formData.get('nombre'),
            telefono: formData.get('telefono'),
            fechaNacimiento: formData.get('fechaNacimiento'),
            genero: parseInt(formData.get('genero')),
            estado: formData.has('estado'),
        };

        try {
            if (persona.id) {
                await EventoAPI.updatePersona(persona.id, persona);
                alert('Persona actualizada exitosamente');
            } else {
                await EventoAPI.createPersona(persona);
                alert('Persona creada exitosamente');
            }
            this.hidePersonaModal();
            await this.loadPersonas();
        } catch (error) {
            console.error('Error guardando persona:', error);
            alert(error.message);
        }
    }

    hidePersonaModal() {
        this.personaModal.style.display = 'none';
    }

    async loadTipoEventosList() {
        try {
            this.tipoEventosList = await EventoAPI.getTipoEventos();
            this.renderTipoEventos();
        } catch (error) {
            console.error('Error cargando tipos de evento:', error);
            alert('Error al cargar tipos de evento');
        }
    }

    renderTipoEventos() {
        this.tipoEventosBody.innerHTML = '';
        this.tipoEventosList.forEach(tipoEvento => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tipoEvento.id}</td>
                <td>${tipoEvento.nombre}</td>
                <td>${tipoEvento.estado ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <button class="btn btn-edit">Editar</button>
                    <button class="btn btn-delete">Eliminar</button>
                </td>
            `;
            const editBtn = row.querySelector('.btn-edit');
            const deleteBtn = row.querySelector('.btn-delete');
            editBtn.addEventListener('click', () => this.editTipoEvento(tipoEvento.id));
            deleteBtn.addEventListener('click', () => this.deleteTipoEvento(tipoEvento.id));
            this.tipoEventosBody.appendChild(row);
        });
    }

    showCreateTipoEventoForm() {
        this.tipoEventoFormTitle.textContent = 'Crear Tipo de Evento';
        this.tipoEventoForm.reset();
        document.getElementById('tipoEventoId').value = '';
        this.tipoEventoModal.style.display = 'block';
    }

    async editTipoEvento(id) {
        try {
            const tipoEvento = await EventoAPI.getTipoEvento(id);
            this.tipoEventoFormTitle.textContent = 'Editar Tipo de Evento';
            document.getElementById('tipoEventoId').value = tipoEvento.id;
            document.getElementById('tipoEventoNombre').value = tipoEvento.nombre;
            document.getElementById('tipoEventoEstado').checked = tipoEvento.estado;
            this.tipoEventoModal.style.display = 'block';
        } catch (error) {
            console.error('Error cargando tipo de evento para editar:', error);
            alert('Error al cargar tipo de evento');
        }
    }

    async deleteTipoEvento(id) {
        if (confirm('¿Está seguro de que desea eliminar este tipo de evento?')) {
            try {
                await EventoAPI.deleteTipoEvento(id);
                await this.loadTipoEventosList();
                alert('Tipo de evento eliminado exitosamente');
            } catch (error) {
                console.error('Error eliminando tipo de evento:', error);
                alert('Error al eliminar tipo de evento');
            }
        }
    }

    async handleTipoEventoSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.tipoEventoForm);
        const idValue = formData.get('id') || document.getElementById('tipoEventoId').value;
        const tipoEvento = {
            id: parseInt(idValue) || 0,
            nombre: formData.get('nombre'),
            estado: formData.has('estado'),
        };

        try {
            if (tipoEvento.id) {
                await EventoAPI.updateTipoEvento(tipoEvento.id, tipoEvento);
                alert('Tipo de evento actualizado exitosamente');
            } else {
                await EventoAPI.createTipoEvento(tipoEvento);
                alert('Tipo de evento creado exitosamente');
            }
            this.hideTipoEventoModal();
            await this.loadTipoEventosList();
            await this.loadTipoEventos(); // reload the select options
        } catch (error) {
            console.error('Error guardando tipo de evento:', error);
            alert(error.message);
        }
    }

    hideTipoEventoModal() {
        this.tipoEventoModal.style.display = 'none';
    }

    async loadAsistencias() {
        try {
            this.asistencias = await EventoAPI.getRegistroAsistencias();
            this.renderAsistencias();
            this.populateAsistenciaSelects();
        } catch (error) {
            console.error('Error cargando asistencias:', error);
            alert('Error al cargar asistencias');
        }
    }

    populateAsistenciaSelects() {
        // Populate evento select
        this.asistenciaEventoSelect.innerHTML = '';
        this.eventos.forEach(evento => {
            const option = document.createElement('option');
            option.value = evento.id;
            option.textContent = evento.nombre;
            this.asistenciaEventoSelect.appendChild(option);
        });

        // Populate persona select
        this.asistenciaPersonaSelect.innerHTML = '';
        this.personas.forEach(persona => {
            const option = document.createElement('option');
            option.value = persona.id;
            option.textContent = persona.nombre;
            this.asistenciaPersonaSelect.appendChild(option);
        });
    }

    renderAsistencias() {
        this.asistenciasBody.innerHTML = '';
        this.asistencias.forEach(asistencia => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asistencia.id}</td>
                <td>${new Date(asistencia.fechaEntrada).toLocaleString()}</td>
                <td>${asistencia.observacion}</td>
                <td>${asistencia.evento ? asistencia.evento.nombre : ''}</td>
                <td>${asistencia.persona ? asistencia.persona.nombre : ''}</td>
                <td>
                    <button class="btn btn-edit">Editar</button>
                    <button class="btn btn-delete">Eliminar</button>
                </td>
            `;
            const editBtn = row.querySelector('.btn-edit');
            const deleteBtn = row.querySelector('.btn-delete');
            editBtn.addEventListener('click', () => this.editAsistencia(asistencia.id));
            deleteBtn.addEventListener('click', () => this.deleteAsistencia(asistencia.id));
            this.asistenciasBody.appendChild(row);
        });
    }

    showCreateAsistenciaForm() {
        this.asistenciaFormTitle.textContent = 'Crear Asistencia';
        this.asistenciaForm.reset();
        document.getElementById('asistenciaId').value = '';
        this.asistenciaModal.style.display = 'block';
    }

    async editAsistencia(id) {
        try {
            const asistencia = await EventoAPI.getRegistroAsistencia(id);
            this.asistenciaFormTitle.textContent = 'Editar Asistencia';
            document.getElementById('asistenciaId').value = asistencia.id;
            document.getElementById('asistenciaFechaEntrada').value = new Date(asistencia.fechaEntrada).toISOString().slice(0, 16);
            document.getElementById('asistenciaObservacion').value = asistencia.observacion;
            document.getElementById('asistenciaEventoId').value = asistencia.eventoId;
            document.getElementById('asistenciaPersonaId').value = asistencia.personaId;
            this.asistenciaModal.style.display = 'block';
        } catch (error) {
            console.error('Error cargando asistencia para editar:', error);
            alert('Error al cargar asistencia');
        }
    }

    async deleteAsistencia(id) {
        if (confirm('¿Está seguro de que desea eliminar esta asistencia?')) {
            try {
                await EventoAPI.deleteRegistroAsistencia(id);
                await this.loadAsistencias();
                alert('Asistencia eliminada exitosamente');
            } catch (error) {
                console.error('Error eliminando asistencia:', error);
                alert('Error al eliminar asistencia');
            }
        }
    }

    async handleAsistenciaSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.asistenciaForm);
        const asistencia = {
            id: parseInt(formData.get('id')) || 0,
            fechaEntrada: new Date(formData.get('fechaEntrada')).toISOString(),
            observacion: formData.get('observacion'),
            eventoId: parseInt(formData.get('eventoId')),
            personaId: parseInt(formData.get('personaId')),
        };

        try {
            if (asistencia.id) {
                await EventoAPI.updateRegistroAsistencia(asistencia.id, asistencia);
                alert('Asistencia actualizada exitosamente');
            } else {
                await EventoAPI.createRegistroAsistencia(asistencia);
                alert('Asistencia creada exitosamente');
            }
            this.hideAsistenciaModal();
            await this.loadAsistencias();
        } catch (error) {
            console.error('Error guardando asistencia:', error);
            alert(error.message);
        }
    }

    hideAsistenciaModal() {
        this.asistenciaModal.style.display = 'none';
    }

    hideModal() {
        this.modal.style.display = 'none';
    }
}

const ui = new EventoUI();