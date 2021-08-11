import { createStore } from "vuex";
import service from "./../services/Service";
export default createStore({
    "state": {
        "count": 0,
    },
    "getters": {
    },
    "mutations": {
        increment(state) {
            state.count++;
            console.log(state.count);
        },
    },
    "actions": {
        async getWeather() {
            var geckoresp = await service.weatherAPI.get("market");
            var result = JSON.parse(geckoresp.data.result);
            console.log(result);
        }
    },
    "modules": {
    }
});

