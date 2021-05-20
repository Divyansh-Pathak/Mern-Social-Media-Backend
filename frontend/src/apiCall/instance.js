import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
				'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
			 },
    withCredentials: true
});

const multipartInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': "multipart/form-data"
    },
    withCredentials: true
});

export {multipartInstance};
export default instance;