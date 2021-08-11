import axios from "axios";

const coinGeckoAPI = axios.create({
    "baseURL": "https://localhost:44301/coinGecko",
    "headers": {
        "Content-Type": "application/json"
    }
});

export default {
    coinGeckoAPI
};