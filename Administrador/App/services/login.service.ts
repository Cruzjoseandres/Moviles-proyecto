import axios from "axios";

const API_URL = "https://airbnbmob2.site/api";

const login = (loginData: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/arrendatario/login`, loginData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const register = (registerData: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/arrendatario/registro`, registerData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

export { login, register };