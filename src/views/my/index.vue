<template>
  <div class="my-container">
     <!-- 已登入 -->
    <div class="header user-info" v-if="user">
        <div class="base-info">
           <div class="left">
            <van-image
              round
              class="logins-imgs"
              :src="userIndfo.photo"
             />
             <span class="text-name">{{ userIndfo.name}}</span>
           </div>
           <div class="right">
            <van-button size="mini" round class="message-btn">资料编辑</van-button>
           </div>
        </div>
        <div class="data-stats">
        <div class="data-item">
          <span class="text-count">{{ userIndfo.art_count}}</span>
          <span class="text-item">头条</span>
        </div>
        <div class="data-item">
          <span class="text-count">{{ userIndfo.follow_count}}</span>
          <span class="text-item">头条</span>
        </div>
        <div class="data-item">
          <span class="text-count">{{ userIndfo.fans_count}}</span>
          <span class="text-item">头条</span>
        </div>
        <div class="data-item">
          <span class="text-count">{{ userIndfo.like_count}}</span>
          <span class="text-item">头条</span>
        </div>
        </div>
    </div>
    <!-- 已登入 -->
    <!-- 未登入 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="not-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登入 / 注册</span>
      </div>
    </div>
    <!-- 未登入 -->

    <!-- 宫格导航 -->
    <van-grid :column-num="2" clickable class="grid-nav">
  <van-grid-item class="grid-item" >
    <i slot="icon" class="toutiao toutiao-shoucang"></i>
    <span slot="text" class="text">收藏</span>
  </van-grid-item>
  <van-grid-item class="grid-item" >
     <i slot="icon" class="toutiao toutiao-lishi"></i>
    <span slot="text" class="text">历史</span>
     </van-grid-item>
</van-grid>
    <!-- 宫格导航 -->
    <!-- 宫格导航 消息通知等 -->
<van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLay"
    />
  <!-- </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userIndfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.onLoadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLay() {
      this.$dialog.confirm({
  title: '确定要退出吗',
     })
  .then(() => {
    // on confirm
    console.log('清除容器中的token');
    this.$store.commit('setUser',null) //清除容器中的user
    })
  .catch(() => {
    this.$toast('退出失败')
  });

    },
    async onLoadUserInfo() {
      try{
        const { data } = await getUserInfo()
        this.userIndfo = data.data
        console.log(77)
        console.log(data)
      }catch(err) {
        this.$toast('获取数据失败')
      }
        
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .header{
    height: 361px !important;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .not-img{
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-style: 28px;
      color: #fff;
    }
    }
  }
  .user-info{
    height: 231px;
    .base-info{
       padding: 76px 32px 23px;
       display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .logins-imgs {
        width: 132px;
        height: 132px;
        border: 1px solid #fff;
        margin-right: 23px;
      }
      .text-name{
        font-size: 30px;
        color: #fff;
      }
    }
    }
    .data-stats {
      display: flex;
      height: 130px;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        // color: #fff;
        flex-direction: column;
        .text-count{
          font-size: 36px;
        }
        .text-item{
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
