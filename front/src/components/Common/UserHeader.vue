<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white" v-on:click="onClickProfile()">詳細</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div class="text-end">
          <!-- <button type="button" class="btn btn-outline-light me-2" v-on:click="onClickLogout()">Login</button> -->
          <button type="button" class="btn btn-outline-light me-2" v-on:click="onClickLogout()">Logout</button>
          <!-- <button type="button" class="btn btn-warning">Sign-up</button> -->
        </div>
      </div>

      <!-- モーダル表示 -->
      <b-modal id="user-detail-modal" title="Noname" hide-footer>
        <Modal ref="Modal" :user="user"> </Modal>
        <b-button class="mt-3" block @click="$bvModal.hide('user-detail-modal')">Close Me</b-button>
      </b-modal>

    </div>
  </header>
</template>

<script>
import Modal from "./UserProfilesModal.vue";
export default {
  components: {
    Modal,
  },
  created() {
    this.user = this.$account.user;
    console.log(this.user);
  },
  props: {
    loginToken: String,
  },
  mounted() {},
  data() {
    return {
      user: null,
      images: {
        like: require("@/assets/like_32.png"),
        comment: require("@/assets/comment_32.png"),
      },
    };
  },
  methods: {
    /*
    // ユーザーデータの取得を行う
    onGetUserAsync: async function () {
      // User一覧
      await this.axios
        .get(this.axios.defaults.baseUrl + "/users/" + this.user_id, {})
        .then((response) => {
          this.user = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    */

    // プロフィール
    onClickProfile: function () {
      this.$bvModal.show("user-detail-modal");
    },

    // ログアウト処理
    onClickLogout: function () {
      this.$account.deleteCookie();

      this.transitionRoot();
    },

    // ルートページに移動する
    transitionRoot() {
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
