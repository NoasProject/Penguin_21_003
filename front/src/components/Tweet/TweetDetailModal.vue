<template>
  <div class="d-block text-center">
    <label>{{ tweet.user.name }}({{tweet.user_id}})</label>
    <div class="col">
     <div class="p-3 border bg-light">{{tweet.content}}</div>
    </div>

    <div class="overflow-auto p-3 bg-light" style="max-height:200px;">
      <b-col v-for="comment in comments" v-bind:key="comment.id">
        <div class="col">
          <b-row>
          <p>
            {{ comment.comment }}
          </p>
          </b-row>
        </div>
      </b-col>
    </div>

    <!-- 入力欄 -->
    <div class="col">
      <div class="p-3 border bg-light" style="width:100%">
        <b-form-input v-model="input.comment">
          ツイートへの返信のコメントを入力する
        </b-form-input>
        <b-button :disabled="input.comment == ''" variant="success" style="width:100%;" v-on:click="onClickComment()">
          返信
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(`Comments: ${this.comments}`);
  },
  props: {
    tweet: Object,
  },
  mounted() {},
  data() {
    return {
      comments: this.tweet.comments,
      input: {
        comment: "",
      },
    };
  },
  methods: {
    // お気に入り登録
    onClickFav: function () {},
    // 返信
    onClickComment: async function () {
      // 解除する
      await this.axios
        .post("http://localhost:3002/comments/", {
          comment: {
            tweet_id: this.tweet.id,
            comment: this.input.comment,
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
          // var payload = response.data;
          this.input.comment = "";
          this.comments.push(response.data);
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
