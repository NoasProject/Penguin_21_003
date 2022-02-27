<template>
  <b-row>
    <b-col cols="12" v-for="tweet in tweets" v-bind:key="tweet.id">
        <Node 
          ref="Node"
          :tweet="tweet"
        >
        </Node>
    </b-col>
  </b-row>
</template>

<script>
import Node from "./TweetTreeNode.vue";
export default {
  components: {
    Node,
  },
  created() {},
  props: {
    loginToken: String,
    state: Object,
    tweets: Array,
  },
  mounted() {},
  data() {
    return {
      //   fields: [
      //     "id",
      //     "title",
      //     "description",
      //     { key: "state", label: "ステータス" },
      //     { key: "operation", label: "操作" },
      //     { key: "destroy", label: "削除" },
      //     "created_at",
      //   ],
    };
  },
  methods: {},
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
