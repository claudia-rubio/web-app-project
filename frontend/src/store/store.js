import { createStore } from "vuex";
import service from "./../services/Service";
export default createStore({
    "state": {
        "count": 0,
        "market": [],
    },
    "getters": {
    },
    "mutations": {
        increment(state) {
            state.count++;
            console.log(state.count);
        },
        setMarketData(state, response) {
            state.market = response;
        }
    },
    "actions": {
        async getMarket({commit}) {
            var result;
            if (this.state.market.length == 0) {
                var geckoresp = await service.coinGeckoAPI.get("market");
                result = JSON.parse(geckoresp.data.result);
                commit("setMarketData", result);
                console.log("request is made");
            }
            else {
                result = this.state.market;
            }
            console.log(result);
        },
        async getCoin({commit}, input) {
            console.log(input);
            
            var res = await service.coinGeckoAPI.get(`coin/${input.coin}/${input.days}`);
            var result = JSON.parse(res.data.result);
            console.log(result);
            return result;
        }
    },
    "modules": {
    }
});

