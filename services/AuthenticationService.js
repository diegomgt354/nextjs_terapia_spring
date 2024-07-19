import axios from "axios";

const API_URL_CONSULTA = 'http://localhost:8090/api/v1/authentication';

class ConsultaService {

    async signIn(authentication) {
        const configuration = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return axios.post(`${API_URL_CONSULTA}/signin`, authentication, configuration);
    }


}

export default new ConsultaService();