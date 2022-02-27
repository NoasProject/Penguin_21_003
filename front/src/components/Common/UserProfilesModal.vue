<template>
  <div class="d-block text-center">
    <label>ユーザープロフィール編集: {{ user_id }}</label>
    <!-- 入力欄 -->
    <div class="col">
      <div class="p-3 border bg-light" style="width:100%">
        <p>
          <label>名前</label>
          <b-form-input v-model="input.name">
            {{ this.user.name }}
          </b-form-input>
        </p>
        <p>
          <label>詳細</label>
          <b-form-input v-model="input.description">
            {{ this.user.description }}
          </b-form-input>
        </p>
        <b-button :disabled="input.name == ''" variant="success" style="width:100%;" v-on:click="onClickProfileSave()">
          保存して閉じる
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.user);
  },
  props: {
    user: Object,
  },
  mounted() {},
  data() {
    return {
      user_id: this.user.id,
      input: {
        name: this.user.name,
        description: this.user.description,
      },
    };
  },
  methods: {
    // お気に入り登録
    onClickFav: function () {},

    onClickProfileSave: async function () {
      // 解除する
      await this.axios
        .put("http://localhost:3002/users/" + this.user_id, {
          user: {
            name: this.input.name,
            description: this.input.description,
          },

          uid: this.$cookies.get("uid"),
          "access-token": this.$cookies.get("access-token"),
          client: this.$cookies.get("client"),

          headers: {
            uid: this.$cookies.get("uid"),
            "access-token": this.$cookies.get("access-token"),
            client: this.$cookies.get("client"),
            expiry: this.$cookies.get("expiry"),
            "token-type": this.$cookies.get("token-type"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.user.name = response.data.name;
          this.user.description = response.data.description;
        })
        .catch((e) => {
          alert(e);
        });
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
