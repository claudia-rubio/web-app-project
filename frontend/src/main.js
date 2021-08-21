import { createApp } from 'vue';
import store from './store/store';
import App from './App.vue';
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faShare
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
//import Multiselect from "@vueform/multiselect";
//import "@vueform/multiselect/themes/default.css";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
//import VueLoading from "vue-loading-overlay";
//import "vue-loading-overlay/dist/vue-loading.css";
//import router from "./router";
library.add(faShare);

createApp(App).
    component("font-awesome-icon", FontAwesomeIcon).
    //component("multiselect", Multiselect).
    //use(VueLoading).
    use(store).
    //use(router).
    mount("#app");

