import Vue from "vue";

let instance;

const kStorageAcessTokenKey = "kAuth0AccessToken";

export const getInstance = () => instance;

export const useAccountService = (options) => {

    if (instance) return instance;

    instance = new Vue({
        data() {
            return {
                token: null,
                options: options,
                domain: options.domain,
                client_id: options.client,
                audience: options.audience,
                user: {
                    id: 0,
                    name: "",
                    description: "",
                    access_token: null
                }
            };
        },
        created() {
            // Request前に設定する
            this.axios.interceptors.request.use(function (request) {
                console.log(request);
                return request;
            });

            this.axios.interceptors.response.use(async function (response) {
                console.log("URL:" + response.request?.responseURL);
                console.log(response);
                return response;
            }, function (error) {
                return error;
            });
        },
        methods: {
            // cookieを削除する
            deleteCookie() {
                let keys = this.$cookies.keys;
                for (let key in keys) {
                    this.$cookies.remove(key);
                }
            },

            // 保存されているアクセストークンを取得する
            getAccessToken() {
                if (this.$cookies.isKey(kStorageAcessTokenKey) === false) {
                    return undefined;
                }
                return this.$cookies.get(kStorageAcessTokenKey);
            },

            // トークンを保持しているか
            hasToken() {
                return (this.getAccessToken() !== undefined);
            },

            // Tokenを更新する
            async setAccessTokenAsync() {
                var token = await this.$auth.getTokenSilently();
                this.$cookies.set(kStorageAcessTokenKey, token);
                console.log("token: " + this.getAccessToken());
            },

            // Api通信のHeaderにユーザー情報を載せる
            setAxiosAccessHeader() {
                // アクセストークン
                this.axios.defaults.headers.common["Authorization"] = 'Bearer ' + this.getAccessToken();
            },

            // アカウント登録の処理を行う
            async UpdateUser(name, description) {

                this.setAxiosAccessHeader();

                var p = {
                    "name": name,
                    "description": description,
                };

                var isSuccess = false;
                await this.axios
                    .put(this.axios.defaults.baseUrl + "/user/update", { "user": p })
                    .then(() => {
                        isSuccess = true;
                    });

                return isSuccess;
            },

            // ログイン処理を行う
            async Login() {
                this.setAxiosAccessHeader();

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