<template>
    <div class="search-suggest-container">
        <van-cell
         v-for="(text, index) in suggestLists"
         @click="$emit('search', text)"
          :key="index" icon="search">
          <div slot="title" v-html="hightLight(text)"></div>
          </van-cell>
    </div>
</template>

<script>
/* eslint-disable */
import { getSuggestList  } from '@/api/search'
import { debounce } from 'lodash'
export default {
    name: 'suggest-Index',
    components: {},
    props: {
        searchValue: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            suggestLists: [] //用来暂时承接搜索建议
        }
    },
    computed: {},
    watch: {
        searchValue : {
            // handler(value) {  //监听输入框内的字符串变化
            //     this.loadSuggestion(value)
            // },
            handler: debounce(function (value) {  //监听输入框内的字符串变化
                this.loadSuggestion(value)  //debounce是为了防抖处理
            }, 200),
            immediate: true // 立即调用
            
        }
    },
    created() { },
    mounted() { },
    methods: {
        async loadSuggestion (q) {
            try {
                const { data } = await getSuggestList(q)
                console.log(data);
                this.suggestLists = data.data.options
            }catch(err) {
                this.$toast('没有得到搜索建议')
            }
        },
        hightLight(text) {
            const hightStr = `<span class = "active">${this.searchValue}</span>` //被替换之后的高亮字符
            const reg = new RegExp(this.searchValue, 'gi') //第一个参数是匹配相应字符，第二个是全局和忽略大小写
            return text.replace(reg, hightStr)
        }
    }
}
</script>
<style scoped lang="less">

.search-suggest-container {
    /deep/ .active {
        color: red;
    }
}
</style>
