import axios from "axios";
import TokenAux from "./TokenAux";


const API_URL_CONSULTA = 'http://localhost:8090/api/v1/consulta';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}

class ConsultaService {


    async getConsultas () {
        return axios.get(`${API_URL_CONSULTA}/obtainAll`,configuration);
    }
    
    async getConsulta(id) {
        return axios.get(`${API_URL_CONSULTA}/obtain/${id}`, configuration);
    }

    async saveConsulta(consulta) {
        const configuration = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios.post(`${API_URL_CONSULTA}/create`, consulta, configuration);
    }

    async deleteConsulta(id) {
        return axios.delete(`${API_URL_CONSULTA}/delete/${id}`, configuration);
    }

}

export default new ConsultaService();