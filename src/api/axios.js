import axios from "axios";

const instance = axios.create({
    baseURL: 'https://adsiduos.vercel.app/api/v1'
});

export default instance;