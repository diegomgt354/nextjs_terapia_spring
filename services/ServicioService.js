import axios from "axios";
import TokenAux from "./TokenAux";

const API_URL_SERVICIO = 'http://localhost:8090/api/v1/servicio';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}


class ServicioService {

    getServicios () {
        return axios.get(`${API_URL_SERVICIO}/obtainAll`);
    }
    
    getServicio(id) {
        return axios.get(`${API_URL_SERVICIO}/obtain/${id}`, configuration);
    }

    saveServicio(servicio) {
        return axios.post(`${API_URL_SERVICIO}/create`, servicio, configuration);
    }

    updateServicio(id, servicio) {
        return axios.put(`${API_URL_SERVICIO}/update/${id}`, servicio, configuration);
    }

    deleteServicio(id) {
        return axios.delete(`${API_URL_SERVICIO}/delete/${id}`, configuration);
    }

    recoverServicio(id) {
        return axios.put(`${API_URL_SERVICIO}/recover/${id}`, configuration);
    }

}

export default new ServicioService();