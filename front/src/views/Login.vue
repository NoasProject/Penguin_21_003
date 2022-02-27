<template>
  <div>
    <div class="container-fluid">
      <b-col cols="3">
        <p>
          <!-- <div class="form-login-id"> -->
            <label for="login_id">ログインID</label>
            <input type="text" v-model="login.email"/>
          <!-- </div> -->
        <br>
          <label for="password">ログインパスワード</label>
          <input type="text" v-model="login.password" />
        <br>
        <!-- タイトルだけは必須入力 -->
        <b-button :disabled="login.email == '' || login.password == ''" variant="success" style="width:100%;" v-on:click="onLogin()">
          ログイン
        </b-button>

        <b-button variant="danger" style="width:100%;" v-on:click="transitionAccountRegister()">
          アカウント登録を行う
        </b-button>
        </p>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$cookies.remove("access-token");
    var token = this.$cookies.get("access-token");
    if (this.$cookies.isKey("access-token") && token != "undefined") {
      console.log("Tokenが存在するため、Tokenログインを行います");
      this.transitionTopPage();
    }

    console.log("tokenが存在しません");
  },
  data() {
    return {
      login: {
        email: "sample@xxx.com",
        password: "01234567890",
        name: undefined,
        token: undefined,
      },
    };
  },
  props: {},
  methods: {
    // ログイン処理
    onLogin: function () {
      var p = {
        email: this.login.email,
        password: this.login.password,
      };

      this.axios
        .post("http://localhost:3002/v1/auth/sign_in", p)
        .then((response) => {
          var accessToken = response.headers["access-token"];
          var uid = response.headers["uid"];
          var client = response.headers["client"];
          var expiry = response.headers["expiry"];
          var tokenType = response.headers["token-type"];
          var userId = response.data.data["id"];
          console.log(userId);

          this.$cookies.set("access-token", accessToken, { expires: 5 });
          this.$cookies.set("uid", uid, { expires: 5 });
          this.$cookies.set("client", client, { expires: 5 });
          this.$cookies.set("expiry", expiry, { expires: 5 });
          this.$cookies.set("token-type", tokenType, { expires: 5 });
          this.$cookies.set("user_id", userId, { expires: 5 });

          this.axios.defaults.headers.common["X-CSRF-Token"] =
            response.headers["x-csrf-token"];
          this.transitionTopPage();
        })
        .catch((e) => {
          alert(e);
        });
    },

    transitionTopPage() {
      this.$router.push("/top");
    },

    transitionAccountRegister() {
      this.$router.push("/accountRegister");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
