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
            var response = await service.weatherAPI.get("weatherforecast");
            //var result = JSON.parse(response.data.result);
            console.log(response.data);
        }
    },
    "modules": {
    }
});

