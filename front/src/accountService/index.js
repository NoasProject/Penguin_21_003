import Vue from "vue";

let instance;

export const useAccountService = (options) => {
    if (instance) return instance;

    instance = new Vue({
        data() {
            return {
                token: null,
                user: {
                    id: 0,
                    name: "",
                    description: "",
                    access_token: null,
                }
            };
        },
        created() {
            // Request前に設定する
            /*
            this.axios.interceptors.request.use(function (request) {
                return request;
            });
            */

            this.axios.interceptors.response.use(function (response) {
                console.log("URL:" + response.request?.responseURL);
                console.log(response);
                return response;
            }, function (error) {
                return error;
            });
        },
        methods: {
            // トークンを保持しているか
            hasToken() {
                return (this.user.access_token !== null);
            },

            // Tokenを更新する
            updateToken() {
                this.token = this.$auth.user.sub;

                // ログイントークン
                this.axios.defaults.headers.common["Token"] = this.token;
                // アクセストークン
                this.axios.defaults.headers.common["AccessToken"] = this.user.access_token;
            },

            // アカウント登録を行なっているか
            async isRegister() {
                this.updateToken();

                var isRegister = false;

                console.log(this.axios.defaults.headers);
                await this.axios
                    .post(this.axios.defaults.baseUrl + "/users/exits", {})
                    .then((response) => {
                        isRegister = Boolean(response.data.is_register);
                    });

                return isRegister;
            },

            // アカウント登録の処理を行う
            async Register(name, description) {
                this.updateToken();

                var p = {
                    "name": name,
                    "description": description,
                };

                var isSuccess = false;
                await this.axios
                    .post(this.axios.defaults.baseUrl + "/users/register", { "user": p })
                    .then(() => {
                        isSuccess = true;
                    });

                return isSuccess;
            },

            // ログイン処理を行う
            async Login() {

                this.updateToken();

                var p = {};

                await this.axios
                    .post(this.axios.defaults.baseUrl + "/users/login", { "user": p })
                    .then((response) => {
                        this.user = response.data;
                    })
                    .catch((e) => {
                        alert(e);
                    });
            }
        }
    });

    return instance;
}

export const AccountService = {
    install(Vue, options) {
        Vue.prototype.$account = useAccountService(options);
    }
};