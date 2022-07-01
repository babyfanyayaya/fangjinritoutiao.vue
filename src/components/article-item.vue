<template>

  <van-cell class="article-item-container" :to="{
  name: 'article',
  params: {
    articleId: article.art_id //params和name连用
  }
  }">
    <div slot="label" class="label-bottom">
      <!-- 如果有三个图片的话 -->
      <div class="cover-warp" v-if="article.cover.type === 3">
        <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
          <van-image :src="img" fit="cover" class="cover-item-img" />

        </div>
      </div>
      <!-- 如果有三个图片的话 -->
      <!-- 下面三个 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
        <!-- 下面三个 -->
      </div>
    </div>
    <!-- 标题 -->
    <div class="title-text" slot="title"> {{ article.title}}</div>
    <!-- 标题 -->
    <!-- 右边图片 -->
    <van-image v-if="article.cover.type === 1" slot="default" class="right-cover-img" fit="cover"
      :src="article.cover.images[0]" />
    <!-- 右边图片 -->
  </van-cell>

</template>

<script>
/* eslint-disable */
export default {
  name: "article-item-Index",
  components: {},
  props: {
    article: {
      type: [Object, Number],
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
.article-item-container {
  //标题文字
  .title-text {
    font-size: 32px;
    color: #3a3a3a;
  }
  //右边的图片
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
    .right-cover-img {
      width: 232px;
      height: 146px;
    }
  }
  //   label插槽
  .label-bottom {
    .label-info-wrap span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
    //三张图片
    .cover-warp {
      display: flex;
      padding: 30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
