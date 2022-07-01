<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form
      ref="loginForm"
      @submit="onSubmit"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFromRules.mobile"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-shouji"
        ></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-yanzhengma"
        ></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="10 * 1000"
            format="ss 秒"
            @finish="isCountDownShow = false"
          />
          <!-- 倒计时 -->
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block
          type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
/* eslint-disable */
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "", //验证码a
      },
      userFromRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false,
      
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSendSms() {
      try {
        // 验证手机号
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        this.$toast.fail("验证失败");
        return console.log("验证失败了");
      }
      this.isCountDownShow = true; //倒计时开始
      // 发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast("登入成功");
       
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast("验证太频繁，稍后再试");
        } else {
          this.$toast("请重新发送");
        }
      }
    },
    async onSubmit() {
      const user = this.user; //获取表单数据

      // 验证完之后
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true, //禁止背景点击
        duration: 0, // 持续展示 toast
      });
      // 提供表单请求登入
      try {
        const res = await login(this.user);
        this.$store.commit("setUser", res.data);
        this.$toast.success("登入成功");
         this.$router.back() //跳转回原来的页面
        console.log(res);
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
        } else {
          this.$toast.fail("登入失败，请重试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    // width: 72px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    .van-button__text {
      font-size: 11px;
      color: #666;
      white-space: nowrap;
    }
  }
  .login-btn-wrap {
    padding: 53px, 33px !important;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
