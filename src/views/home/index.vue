<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" type="info" size="small" icon="search" slot="title" to="/search" round>搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" class="channels-list" animated swipeable>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <ArticleList :channel="obj" />
      </van-tab>
      <div class="placeholder" slot="nav-right"></div>
      <div class="hanbao-btn" slot="nav-right" @click="isChannelEidtShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->
    <!-- 频道弹出层 -->
    <van-popup v-model="isChannelEidtShow" closeable close-icon-position="top-left" position="bottom"
      :style="{ height: '100%' }">
      <channelEdit :channels="channels" @activepush="activepushdata" :active="active" />
    </van-popup>
    <!-- 频道弹出层 -->
  </div>
</template>

<script>
/* eslint-disable */
import { getChannelList } from "@/api/user";
import ArticleList from "./components/article-list.vue";
import channelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    channelEdit
  },
  props: {},
  data() {
    return {
      active: 2,
      channels: "", //频道列表数据
      isChannelEidtShow: false //控制弹层弹出
    };
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadChannelsList();
  },
  mounted() {},
  methods: {
    async loadChannelsList() {
      try {
        
        let channelStorge = '' //用来作为暂时数据载体
        // 判断用户是否登入
        if(this.user) {
        //  用户已经登入
          const { data } = await getChannelList();
          channelStorge = data.data.channels;
        }else {
          // 如果用户有本地储存数据
          const UserLocalStorage = getItem('TOU-TIAO-CHANNELS')
          if (UserLocalStorage) {
            channelStorge = UserLocalStorage;
          }else {
            let { data } = await getChannelList();
            channelStorge = data.data.channels;
          }
          // 没有本地储存数据，采用默认列表
        }
        // 最后还给channls
        this.channels = channelStorge 
        
      } catch (err) {
        this.$toast("列表数据获取失败");
      }
    },
    activepushdata(index, isChannelEidtShow = true ){
      // console.log(78910) //测试
      // 改变激活的频道项
      this.active = index
      // 关闭弹出层
      this.isChannelEidtShow = isChannelEidtShow
    }
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  //频道列表的样式
  .channels-list {
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 2;
      height: 82px;
      left: 0;
      right: 0;
    }
    /deep/ .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    //滚动条
    /deep/ .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    /deep/ .van-tabs__nav--line {
      padding-bottom: unset;
    }
    /deep/.van-tab--active {
      color: #333;
    }
    //列表一个空元素
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    //汉堡按钮
    .hanbao-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.92;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
        width: 1px;
        height: 100%;
        display: inline-block;
      }
    }
    /deep/.van-tabs__content {
      padding-top: 174px;
    }
  }
}
</style>
