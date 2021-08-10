import { createStore } from "vuex";

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
    },
    "modules": {
    }
});

