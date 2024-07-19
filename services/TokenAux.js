const TokenAux = () => {

    const existToken = () => {
        return localStorage.getItem('tokenCita') ? true : false;
    }

    const getToken = () => {
        return existToken() ? localStorage.getItem('tokenCita') : null;
    }

    const setToken = (token) => {
        localStorage.setItem('tokenCita', token);
    }

    const removeToken = () => {
        localStorage.removeItem('tokenCita');
    }

    const getInformation = () => {
        if(!existToken()) return;
        const token = getToken().split('.')[1];
        const tokenString = window.atob(token);
        return JSON.parse(tokenString);
    }

    return {
        existToken,
        getToken,
        setToken,
        removeToken,
        getInformation
    }

}

export default TokenAux