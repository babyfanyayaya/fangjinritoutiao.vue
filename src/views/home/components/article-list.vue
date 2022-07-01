<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="isLoadingFreashloading"
      @refresh="onRefresh"
      :success-text='refreshSuccessTxt'
    >

      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
/* eslint-disable */
import { getArticleList } from "@/api/article";
import articleItem from "@/components/article-item";
export default {
  name: "Article-list-Index",
  components: {
    articleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], //列表数据
      loading: false, //控制每次刷新
      finished: false, //控制最后关闭
      timestamp: 1556789000001, //时间戳拿到数据
      error: false, //控制错误提示
      isLoadingFreashloading: false, //控制下来刷新
      refreshSuccessTxt: "", //下拉刷新提示文本
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // console.log("分割线");
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        // 获取数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 0, //置顶数据
        });

        console.log(data);
        //解构数据
        const { results } = data.data;
        //添加到列表当中
        this.list.push(...results);
        //将本次加载的loading设置为falsa
        this.loading = false;
        // 判断是否还有数据
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        // this.$toast("文章列表数据获取失败");
        this.error = true; //出现失败文本
        this.loading = false; //将loading关闭，准备下一次的刷新
      }
    },
    async onRefresh() {
      try {
        // 获取数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 0, //置顶数据
        });
        //解构数据
        const { results } = data.data;
        // 刷新的数据添加到数组中
        this.list.unshift(...results);
        // 将本次拉刷新结束
        this.isLoadingFreashloading = false;
        this.refreshSuccessTxt = `本次刷新了${results.length}条数据`;
      } catch (err) {
        // 将本次拉刷新结束
        this.isLoadingFreashloading = false;
        this.refreshSuccessTxt = "本次刷新失败";
      }
    },
  },
};
</script>
<style scoped lang="less">
.article-list-container {
  height: 79vh;
  overflow-y: auto;
}
</style>
