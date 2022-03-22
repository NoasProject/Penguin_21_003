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
<!-- 
        <b-button variant="danger" style="width:100%;" v-on:click="onLogout()">
          ログアウト
        </b-button> -->
        </p>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log("hasToken: " + this.$account.hasToken());

    if (this.$account.hasToken()) {
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
    // ログアウト処理
    onLogout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },

    // ログイン処理
    onLogin: async function () {
      var isRegister = await this.$account.isRegister();

      console.log("isRegister: " + isRegister);

      // 登録済みの場合はログイン処理をする
      if (isRegister) {
        // ログイン処理をする
        await this.$account.Login();

        // Topへ移動する
        this.transitionTopPage();
      }
      // アカウント登録処理をする
      else {
      }
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
