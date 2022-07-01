<template>
  <div class="channel-edit-container">
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="channel-edit-btn" type="danger" size="small" round plain @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item class="grid-edit" v-for="(obj , index) in channels" :key="index"
        @click="onMyChannelclick(obj, index)">

        <!-- 清除右上角显示 -->
        <van-icon slot="icon" v-show="isEdit && !FlexChannel.includes(obj.id)" name="clear"></van-icon>
        <!-- 清除右上角显示 -->
        <span slot="text" class="text" :class="{ redActive: index === active }"> {{ obj.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 我的频道 -->
    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title">我的频道</div>

    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item class="grid-edit" v-for="(obj, index) in getALLChannelsStorge" icon="plus" :key="index"
        :text="obj.name" @click="onAddChannel(obj)" />

    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
/* eslint-disable */
import { getAllChannels, addMyChannels } from '@/api/channels'
import { mapState  } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'QaIndex',
  components: {},
  props: {
    channels: {  //我的频道编辑中的数据
        type: Array
    },
    active: {
      type: Number
    }
  },
  data () {
    return {
        AllChannels: [], //用来暂存推荐列表数据
        isEdit: false, //控制清除是否显示 //false是编辑状态，true是非编辑状态
        FlexChannel: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    getALLChannelsStorge () {
          const b = this.AllChannels.filter(channel => {
            return !this.channels.find( channelA => {
                return channelA.id === channel.id
            })
          })
          console.log(b)
          return b
    }
  },
  watch: {},
  created () {
      this.getAllChannels()
  },
  mounted () {},
  methods: {
      async getAllChannels() {
        try{
            const { data } = await getAllChannels()
            
            this.AllChannels = data.data.channels
            console.log(this.AllChannels);
        }catch(err) {
            this.$toast('推荐列表数据获取失败')
        }
      },
  async  onAddChannel(obj) {
      this.channels.push(obj)
      // 数据持久化
      if(this.user) {
        // 线上缓存
        try {
          await addMyChannels({
            id: obj.id,
            seq: this.channels.length
          })
        }catch(err) {
          this.$toast('数据储存失败')
        }
      }else {
        // 本地储存
        setItem('TOU-TIAO-CHANNELS', this.channels)
      }
    },
    onMyChannelclick(obj, index) {
      // console.log(obj)
      // console.log(index)
      if (this.isEdit){
        // 编辑状态下
        // 如果是推荐频道则反回
        // console.log(this.active)
        if (this.FlexChannel.includes(obj.id)) {
          return 
        }
        // 如果是激活前面的频道则active - 1
        if(index < this.active) {
          
          this.$emit('activepush', this.active - 1 , true)
        }
        // 删除元素
        this.channels.splice(index, 1)
      }else{
        // 完成状态下
        this.$emit('activepush' , index, false)
      }
    }
  }
}
</script>
<style scoped lang="less">

.channel-edit-container {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
//   按钮样式
  .channel-edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border:  1px solid  #f85959;
  }
//   grid里面的文字样式
 /deep/ .grid-edit {
   width: 160px;
   height: 86px;
   .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text , .text{
        white-space: nowrap;
        font-size: 28px;
        color: #222;
      }  
      .redActive {
       color: red;
   }
   }
     .van-grid-item__icon-wrapper{
      position: unset;
     }
   
  }
   /deep/.recommend-grid {
    .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
            font-size: 28px;
            margin-right: 6px;
        }
        .van-grid-item__text {
            margin-top: 0;
        }
    }
  }
  /deep/.my-grid {
    .van-icon-clear{
     position: absolute;
    top: -5px;
    right: -5px;
    font-size: 15px;
    z-index: 2;
    /* border-block-color: #cacaca; */
    color: #cacaca;
    }
  }
}
</style>
