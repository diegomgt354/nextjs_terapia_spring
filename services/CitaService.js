import axios from "axios";
import TokenAux from "./TokenAux";

const API_URL_CITA = 'http://localhost:8090/api/v1/cita';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}

class CitaService {

    getCitas () {
        return axios.get(`${API_URL_CITA}/obtainAll`, configuration);
    }
    
    getCita(id) {
        return axios.get(`${API_URL_CITA}/obtain/${id}`, configuration);
    }

    saveCita(cita) {
        return axios.post(`${API_URL_CITA}/create`, cita, configuration);
    }

    updateCita(id, cita) {
        return axios.put(`${API_URL_CITA}/update/${id}`, cita, configuration);
    }

    deleteCita(id) {
        return axios.delete(`${API_URL_CITA}/delete/${id}`, configuration);
    }

    recoverCita(id) {
        return axios.put(`${API_URL_CITA}/recover/${id}`, configuration);
    }

    obtainByUser(idUser) {
        return axios.get(`${API_URL_CITA}/obtainByUser/${idUser}`, configuration);
    }

}

export default new CitaService();