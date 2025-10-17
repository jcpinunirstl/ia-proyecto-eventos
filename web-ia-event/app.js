import EventoAPI from './api.js';

class EventoUI {
    constructor() {
        this.eventos = [];
        this.tipoEventos = [];
        this.modal = document.getElementById('formModal');
        this.form = document.getElementById('eventForm');
        this.formTitle = document.getElementById('formTitle');
        this.eventsBody = document.getElementById('eventsBody');
        this.tipoEventoSelect = document.getElementById('tipoEventoId');

        this.init();
    }

    async init() {
        await this.loadTipoEventos();
        await this.loadEventos();

        document.getElementById('createBtn').addEventListener('click', () => this.showCreateForm());
        document.querySelector('.close').addEventListener('click', () => this.hideModal());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
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

    hideModal() {
        this.modal.style.display = 'none';
    }
}

const ui = new EventoUI();