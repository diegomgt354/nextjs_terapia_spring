import axios from "axios";
import TokenAux from "./TokenAux";

const API_URL_TERAPEUTA = 'http://localhost:8090/api/v1/terapeuta';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}

class TerapeutaService {

    getTerapeutas () {
        return axios.get(`${API_URL_TERAPEUTA}/obtainAll`, configuration);
    }
    
    getTerapeuta(id) {
        return axios.get(`${API_URL_TERAPEUTA}/obtain/${id}`, configuration);
    }

    saveTerapeuta(terapeuta) {
        return axios.post(`${API_URL_TERAPEUTA}/create`, terapeuta, configuration);
    }

    updateTerapeuta(id, terapeuta) {
        return axios.put(`${API_URL_TERAPEUTA}/update/${id}`, terapeuta, configuration);
    }

    deleteTerapeuta(id) {
        return axios.delete(`${API_URL_TERAPEUTA}/delete/${id}`, configuration);
    }

    recoverTerapeuta(id) {
        return axios.put(`${API_URL_TERAPEUTA}/recover/${id}`);
    }

}

export default new TerapeutaService();