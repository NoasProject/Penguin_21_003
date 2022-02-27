<template>
    <div>
        <UserHeader >
        </UserHeader>

        <div class="container-fluid">
          <b-form  @submit.stop.prevent>
              <label for="feedback-user">ツイート内容</label>
              <b-form-input v-model="input.content" style="width:100%;height:60px;">
                ツイート内容を入力する
              </b-form-input>
              <!-- 
              <b-form-invalid-feedback :state="validation">
              ユーザー名....
              </b-form-invalid-feedback> 
              -->

              <!--
              <b-form-valid-feedback :state="validation">
              Looks Good.
              </b-form-valid-feedback>
              -->
            <b-button 
              :disabled="input.content == ''" variant="success" style="width:100%;" v-on:click="onPostTweet()">
              ツイート
            </b-button>
          </b-form>

          <TweetTree 
            ref="Tree"
            style="width:100%;"
            :tweets="tweets"
          >
          </TweetTree>
      </div>
    </div>
</template>

<script>
import UserHeader from "../components/Common/UserHeader.vue";
import TweetTree from "../components/Tweet/TweetTree.vue";

export default {
  components: {
    UserHeader,
    TweetTree,
  },
  created() {
    var token = this.$cookies.get("access-token");
    if (this.$cookies.isKey("access-token") === false || token == "undefined") {
      console.log("tokenが存在しません");
      this.transitionRoot();
    }

    this.onGetTweets();
  },
  data() {
    return {
      input: {
        content: "",
      },
      user: {
        id: 1,
        name: "ユーザー名",
        description: "プロフィールです",
      },
      tweets: [
        {
          id: 1,
          user_id: 1,
          content: "message",
          profile: {
            id: 100,
            name: "テスト1",
            description: "テスト1のプロフィールです",
          },
          comments: [],
          likes: [],
        },
      ],
    };
  },
  props: {},
  methods: {
    // ツイートを行う処理
    onPostTweet: function () {
      this.axios
        .post("http://localhost:3002/tweets", {
          content: this.input.content,

          uid: this.$cookies.get("uid"),
          "access-token": this.$cookies.get("access-token"),
          client: this.$cookies.get("client"),
          "token-type": this.$cookies.get("token-type"),

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
          // console.log(response.data);
          var tweet = response.data;
          {
            tweet.likes = [];
            tweet.comments = [];
          }
          this.tweets.push(tweet);
          this.input.content = "";

          this.cacheResponseHeader(response);
        })
        .catch((e) => {
          alert(e);
        });
    },

    // ツイートの取得を行う
    onGetTweets: async function () {
      var tweets = [];

      await this.axios
        .get("http://localhost:3002/tweets", {
          headers: {
            uid: this.$cookies.get("uid"),
            "access-token": this.$cookies.get("access-token"),
            client: this.$cookies.get("client"),
            expiry: this.$cookies.get("expiry"),
            "token-type": this.$cookies.get("token-type"),
          },
        })
        .then((response) => {
          tweets = response.data;
          console.log(response.data);
          this.cacheResponseHeader(response);
        })
        .catch((e) => {
          alert(e);
        });

      var tweetUseIds = tweets.map((tweet) => tweet.user_id);
      var tweetIds = tweets.map((tweet) => tweet.id);
      // User一覧
      await this.axios
        .get("http://localhost:3002/users", {
          params: {
            user_ids: tweetUseIds,
          },
          headers: {
            uid: this.$cookies.get("uid"),
            "access-token": this.$cookies.get("access-token"),
            client: this.$cookies.get("client"),
            expiry: this.$cookies.get("expiry"),
            "token-type": this.$cookies.get("token-type"),
          },
        })
        .then((response) => {
          var users = response.data;

          this.cacheResponseHeader(response);
          tweets.map((tweet) => {
            tweet.user = users.find((f) => f.id == tweet.user_id);
          });
        })
        .catch((e) => {
          alert(e);
        });

      if (tweetIds.length !== 0) {
        // Tweetの情報
        await this.axios
          .get("http://localhost:3002/comments", {
            tweet_ids: tweetIds,
            headers: {
              uid: this.$cookies.get("uid"),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
              expiry: this.$cookies.get("expiry"),
              "token-type": this.$cookies.get("token-type"),
            },
          })
          .then((response) => {
            var comments = response.data;

            this.cacheResponseHeader(response);

            tweets.map((tweet) => {
              tweet.comments = comments.filter((f) => f.tweet_id == tweet.id);
            });
          })
          .catch((e) => {
            alert(e);
          });

        // likes
        await this.axios
          .get("http://localhost:3002/likes", {
            tweet_ids: tweetIds,
            headers: {
              uid: this.$cookies.get("uid"),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
              expiry: this.$cookies.get("expiry"),
              "token-type": this.$cookies.get("token-type"),
            },
          })
          .then((response) => {
            var likes = response.data;

            console.log("Likes Get.");
            console.log(likes);
            this.cacheResponseHeader(response);

            tweets.map((tweet) => {
              tweet.likes = likes.filter((f) => f.tweet_id == tweet.id);
            });
          })
          .catch((e) => {
            alert(e);
          });
      }

      this.tweets = tweets;
    },

    cacheResponseHeader: function (response) {
      var accessToken = response.headers["access-token"];
      var uid = response.headers["uid"];
      var client = response.headers["client"];
      var expiry = response.headers["expiry"];
      var tokenType = response.headers["token-type"];

      this.$cookies.set("access-token", accessToken, { expires: 5 });
      this.$cookies.set("uid", uid, { expires: 5 });
      this.$cookies.set("client", client, { expires: 5 });
      this.$cookies.set("expiry", expiry, { expires: 5 });
      this.$cookies.set("token-type", tokenType, { expires: 5 });

      this.axios.defaults.headers.common["X-CSRF-Token"] =
        response.headers["x-csrf-token"];
    },

    transitionRoot: function () {
      this.$router.push("/");
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
