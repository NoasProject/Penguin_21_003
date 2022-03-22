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
    if (this.$account.hasToken() === false) {
      console.log("tokenが存在しません");
      this.transitionRoot();
      return;
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
        .post(this.axios.defaults.baseUrl + "/tweets", {
          content: this.input.content,
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
        })
        .catch((e) => {
          alert(e);
        });
    },

    // ツイートの取得を行う
    onGetTweets: async function () {
      var tweets = [];

      await this.axios
        .get(this.axios.defaults.baseUrl + "/tweets", {})
        .then((response) => {
          console.log(response.data);
          tweets = response.data;
        })
        .catch((e) => {
          alert(e);
        });

      this.tweets = tweets;
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
