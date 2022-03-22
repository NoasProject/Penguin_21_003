<template>
  <div>
    <div class="container-fluid">
      <b-col cols="3">
        <p>
          <!-- <div class="form-login-id"> -->
            <label for="id">名前</label>
            <input type="text" v-model="register.name"/>
          <!-- </div> -->
        <br>
          <label for="password">説明文</label>
          <input type="text" v-model="register.description" />
        <br>
        <!-- タイトルだけは必須入力 -->
        <b-button :disabled="register.name == ''" variant="success" style="width:100%;" v-on:click="onAccountRegister()">
          登録する
        </b-button>
        </p>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      register: {
        id: "",
        name: "NoName",
        description: "",
        token: undefined,
      },
    };
  },
  props: {},
  methods: {
    // アカウントの登録処理
    onAccountRegister: async function () {
      // アカウントの作成処理を行う
      var isSuccess = await this.$account
        .Register(this.register.name, this.register.description)
        .catch((e) => {
          alert(e);
          return;
        });

      if (isSuccess) {
        this.transitionTopPage();
      }
    },

    transitionTopPage() {
      this.$router.push("/top");
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
