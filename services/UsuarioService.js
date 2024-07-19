import axios from "axios";
import TokenAux from "./TokenAux";

const API_URL_USUARIO = 'http://localhost:8090/api/v1/usuario';

const tokenAux = TokenAux();

const configuration = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenAux.getToken()
    }
}

class UsuarioService {

    getUsuarios () {
        return axios.get(`${API_URL_USUARIO}/obtainAll`, configuration);
    }
    
    getUsuario(id) {
        return axios.get(`${API_URL_USUARIO}/obtain/${id}`, configuration);
    }

    saveUsuario(usuario) {
        return axios.post(`${API_URL_USUARIO}/create`, usuario, configuration);
    }

    updateUsuario(id, usuario) {
        return axios.put(`${API_URL_USUARIO}/update/${id}`, usuario, configuration);
    }

    deleteUsuario(id) {
        return axios.delete(`${API_URL_USUARIO}/delete/${id}`, configuration);
    }

    recoverUsuario(id) {
        return axios.put(`${API_URL_USUARIO}/recover/${id}`, configuration);
    }

    deleteUsuarioPhysical(id) {
        return axios.delete(`${API_URL_USUARIO}/deletePhysical/${id}`, configuration);
    }

}

export default new UsuarioService();