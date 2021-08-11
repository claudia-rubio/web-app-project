import axios from "axios";

const weatherAPI = axios.create({
    "baseURL": "https://localhost:44301/coinGecko",
    "headers": {
        "Content-Type": "application/json"
    }
});

export default {
    weatherAPI
};