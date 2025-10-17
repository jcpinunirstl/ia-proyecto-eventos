const API_BASE_URL = 'http://localhost:5142/api';

class EventoAPI {
    static async getEventos() {
        const response = await fetch(`${API_BASE_URL}/Eventos`);
        if (!response.ok) {
            throw new Error('Error al obtener eventos');
        }
        return await response.json();
    }

    static async getEvento(id) {
        const response = await fetch(`${API_BASE_URL}/Eventos/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener evento');
        }
        return await response.json();
    }

    static async createEvento(evento) {
        const response = await fetch(`${API_BASE_URL}/Eventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evento),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al crear evento: ${error}`);
        }
        return await response.json();
    }

    static async updateEvento(id, evento) {
        const response = await fetch(`${API_BASE_URL}/Eventos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evento),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al actualizar evento: ${error}`);
        }
    }

    static async deleteEvento(id) {
        const response = await fetch(`${API_BASE_URL}/Eventos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar evento');
        }
    }

    static async getTipoEventos() {
        const response = await fetch(`${API_BASE_URL}/TipoEventos`);
        if (!response.ok) {
            throw new Error('Error al obtener tipos de evento');
        }
        return await response.json();
    }
}

export default EventoAPI;