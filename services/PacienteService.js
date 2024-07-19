import axios from "axios";
import TokenAux from "./TokenAux";

const API_URL_PACIENTE = 'http://localhost:8090/api/v1/paciente';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}

class PacienteService {

    getPacientes () {
        return axios.get(`${API_URL_PACIENTE}/obtainAll`, configuration);
    }
    
    getPaciente(id) {
        return axios.get(`${API_URL_PACIENTE}/obtain/${id}`, configuration);
    }

    savePaciente(paciente) {
        return axios.post(`${API_URL_PACIENTE}/create`, paciente, configuration);
    }

    updatePaciente(id, paciente) {
        return axios.put(`${API_URL_PACIENTE}/update/${id}`, paciente, configuration);
    }

    deletePaciente(id) {
        return axios.delete(`${API_URL_PACIENTE}/delete/${id}`, configuration);
    }

    recoverPaciente(id) {
        return axios.put(`${API_URL_PACIENTE}/recover/${id}`, configuration);
    }

}

export default new PacienteService();