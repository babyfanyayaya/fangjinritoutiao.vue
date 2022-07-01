<template>
    <div class="search-result-container">
        <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished"
            finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
        </van-list>
    </div>
</template>

<script>
/* eslint-disable */
import { getSuggestReasult  } from '@/api/search'
export default {
    name: 'search-result-Index',
    components: {},
    props: {
        searchValue: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1, // 控制页码
            perPage: 20 ,//控制请求的搜索结果数量
            error: false, // 控制错误弹出
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
      async  onLoad() {
        try {
            //  1,获取请求数据
            const { data } = await getSuggestReasult({
                page: this.page,
                perPage: this.perPage,
                q: this.searchValue
            })
            console.log(data);
            // 2,铺设到list中
            const { results } = data.data
            this.list.push(...results)
            // 3关闭loading
            this.loading = false
            // 4判断还有没有数据
            if (results.length) {
                this.page ++
            }else {
                this.finished = true
            }
        }catch (err) {
            this.error = true
            this.loading = false
          this.$toast('获取搜索结果失败')
        }         
        },
    }
}
</script>
<style scoped lang="less">
</style>
