<template>
  <div class="border border-primary">
    <p>{{ tweet.user ? tweet.user.name : "NoName" }}({{ tweet.user_id }})</p>
    <label>{{ tweet.content }}</label>
    <br>
    <label>{{ tweet.created_at }}</label>
    <b-row>
        <div class="d-inline p-2 bg-primary text-white">
            <b-img :src=images.comment v-on:click="onClickShowModal()"></b-img>
            <label>{{ tweet.comments.length }}</label>
        </div>
        <div class="d-inline p-2 bg-primary text-white">
            <b-img :src=images.like v-on:click="onClickLike()"></b-img>
            <label>{{ likes.length }}</label>
        </div>
    </b-row>

    <!-- モーダル表示 -->
    <b-modal id="tweet-detail-modal" title="Noname" hide-footer>
      <Modal ref="Modal" :tweet="tweet"> </Modal>
      <b-button class="mt-3" block @click="$bvModal.hide('tweet-detail-modal')">Close Me</b-button>
    </b-modal>
  </div>
</template>

<script>
import Modal from "./TweetDetailModal.vue";
export default {
  components: {
    Modal,
  },
  created() {
    console.log(this.tweet);
  },
  props: {
    loginToken: String,
    tweet: Object,
  },
  mounted() {},
  data() {
    return {
      likes: this.tweet.likes,
      user_id: this.$cookies.get("user_id"),
      images: {
        like: require("@/assets/like_32.png"),
        // どっちかはbootstrapのアイコンを使う
        comment: require("@/assets/comment_32.png"),
      },
    };
  },
  methods: {
    onClickShowModal: function () {
      console.log(`onClickShowModal: ${this.tweet.id}`);
      this.$bvModal.show("tweet-detail-modal");
    },

    // お気に入り登録
    onClickLike: async function () {
      this.likes.forEach((element) => {
        console.log(`element: ${element.user_id}, ${element}`);
      });
      var myLike = this.likes.find((f) => f.user_id == this.user_id);
      var isLike = myLike !== undefined;
      console.log(
        `onClickLike: ${isLike ? "登録 --> 解除" : "解除 --> 登録"}, userId:${
          this.user_id
        }`
      );
      // いいね済みの場合
      if (isLike) {
        // 解除する
        await this.axios
          .delete("http://localhost:3002/likes/" + myLike.id, {
            like: {
              tweet_id: this.tweet.id,
            },
            headers: {
              uid: this.$cookies.get("uid"),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
            },
          })
          .then(() => {
            // var payload = response.data;

            // 一覧から削除する
            this.likes = this.likes.filter((r) => r.id != myLike.id);
          })
          .catch((e) => {
            alert(e);
          });
      } else {
        // 登録する
        await this.axios
          .post("http://localhost:3002/likes", {
            tweet_id: this.tweet.id,
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
            // 一覧に追加する
            this.likes.push(response.data);
          })
          .catch((e) => {
            alert(e);
          });
      }

      console.log(`Fav Request : ${this.tweet.id}`);
    },

    // 詳細画面
    onClickDescription: function () {
      console.log(`Description Request : ${this.tweet.id}`);
    },

    // いいねの詳細情報
    onClickFavDescription: function () {
      console.log(`onClickFavDescription Request : ${this.tweet.id}`);
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
