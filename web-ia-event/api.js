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

    static async getPersonas() {
        const response = await fetch(`${API_BASE_URL}/Personas`);
        if (!response.ok) {
            throw new Error('Error al obtener personas');
        }
        return await response.json();
    }

    static async getPersona(id) {
        const response = await fetch(`${API_BASE_URL}/Personas/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener persona');
        }
        return await response.json();
    }

    static async createPersona(persona) {
        const response = await fetch(`${API_BASE_URL}/Personas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al crear persona: ${error}`);
        }
        return await response.json();
    }

    static async updatePersona(id, persona) {
        const response = await fetch(`${API_BASE_URL}/Personas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al actualizar persona: ${error}`);
        }
    }

    static async deletePersona(id) {
        const response = await fetch(`${API_BASE_URL}/Personas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al eliminar persona: ${response.statusText}`);
        }
    }

    static async getTipoEvento(id) {
        const response = await fetch(`${API_BASE_URL}/TipoEventos/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener tipo de evento');
        }
        return await response.json();
    }

    static async createTipoEvento(tipoEvento) {
        const response = await fetch(`${API_BASE_URL}/TipoEventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tipoEvento),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al crear tipo de evento: ${error}`);
        }
        return await response.json();
    }

    static async updateTipoEvento(id, tipoEvento) {
        const response = await fetch(`${API_BASE_URL}/TipoEventos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tipoEvento),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al actualizar tipo de evento: ${error}`);
        }
    }

    static async deleteTipoEvento(id) {
        const response = await fetch(`${API_BASE_URL}/TipoEventos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al eliminar tipo de evento: ${response.statusText}`);
        }
    }
}

export default EventoAPI;