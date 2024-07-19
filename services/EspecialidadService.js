import axios from "axios";
import TokenAux from "./TokenAux";

const API_URL_ESPECIALIDAD = 'http://localhost:8090/api/v1/especialidad';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}

class EspecialidadService {

    getEspecialidades () {
        return axios.get(`${API_URL_ESPECIALIDAD}/obtainAll`, configuration);
    }
    
    getEspecialidad(id) {
        return axios.get(`${API_URL_ESPECIALIDAD}/obtain/${id}`, configuration);
    }

    saveEspecialidad(especialidad) {
        return axios.post(`${API_URL_ESPECIALIDAD}/create`, especialidad, configuration);
    }

    updateEspecialidad(id, especialidad) {
        return axios.put(`${API_URL_ESPECIALIDAD}/update/${id}`, especialidad, configuration);
    }

    deleteEspecialidad(id) {
        return axios.delete(`${API_URL_ESPECIALIDAD}/delete/${id}`, configuration);
    }

    recoverEspecialidad(id) {
        return axios.put(`${API_URL_ESPECIALIDAD}/recover/${id}`, configuration);
    }

}

export default new EspecialidadService();