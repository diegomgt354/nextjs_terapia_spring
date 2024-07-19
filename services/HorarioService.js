import axios from "axios";
import TokenAux from "./TokenAux";

const API_URL_HORARIO = 'http://localhost:8090/api/v1/horario';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}

class HorarioService {

    async getHorarios () {
        return axios.get(`${API_URL_HORARIO}/obtainAll`, configuration);
    }
    
    async getHorario(id) {
        return axios.get(`${API_URL_HORARIO}/obtain/${id}`, configuration);
    }

    async getHorarioTherapist(idTherapist) {
        return axios.get(`${API_URL_HORARIO}/obtainforByIdTherapist/${idTherapist}`, configuration);
    }

    async getHorario(id) {
        return axios.get(`${API_URL_HORARIO}/obtain/${id}`);
    }

    async saveHorario(horario) {
        const configuration = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios.post(`${API_URL_HORARIO}/create`, horario, configuration);
    }

    async updateHorario(horario) {
        const configuration = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios.post(`${API_URL_HORARIO}/create`, horario, configuration);
    }

    async deleteHorario(id) {
        return axios.delete(`${API_URL_HORARIO}/delete/${id}`, configuration);
    }

    async recoverHorario(id) {
        return axios.put(`${API_URL_HORARIO}/recover/${id}`, configuration);
    }

}

export default new HorarioService();