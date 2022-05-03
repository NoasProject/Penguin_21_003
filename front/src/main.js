import Vue from "vue";
import vueCookie from "vue-cookies";
import App from './App.vue'
import router from "./router";
import axios from "axios";
import vueAxios from "vue-axios";
import bootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Import the Auth0 configuration
import { domain, clientId, audience } from "../config/auth_config.json";
// Import the plugin here
import { Auth0Plugin } from "./auth";
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});

Vue.config.productionTip = false;


axios.defaults.baseUrl = "http://localhost:3003";

Vue.use(vueCookie);
Vue.use(vueAxios, axios);
Vue.use(bootstrapVue);

// this.$accountでアクセス可能
import { AccountService } from "./accountService";
Vue.use(AccountService, {
    "auth": Auth0Plugin
});


const vue = new Vue({
    router: router,
    render: (h) => h(App),
}).$mount("#app");

export default {
    vue,
    created() {

    },
    methods: {
    }
};
