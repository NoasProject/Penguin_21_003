import Vue from "vue";
import vueCookie from "vue-cookies";
import App from './App.vue'
import router from "./router";
import axios from "axios";
import vueAxios from "vue-axios";
import bootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(vueCookie);
Vue.use(vueAxios, axios);
Vue.use(bootstrapVue);

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
