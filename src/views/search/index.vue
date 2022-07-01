<template>
    <div class="search-container">
        <!-- 搜索栏 -->
        <form class="fix-from" action="/">
            <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" background="#3296fa" @search="onSearch"
                @cancel="onCancel" @focus="isResultShow = false" />
        </form>
        <!-- 搜索栏 -->
        <!-- 搜索结果 -->
        <searchResult v-if="isResultShow" :searchValue="searchValue" />
        <!-- 搜索结果 -->
        <!-- 搜索建议 -->
        <searchSuggest v-else-if="searchValue" @search="onSearch" :searchValue="searchValue" />
        <!-- 搜索建议 -->
        <!-- 搜索历史记录 -->
        <searchHostory v-else :searchHostoryStr="searchHostoryStr" @searchText="onSearch"
            @serachHistoryNo="searchHostoryStr = []" />
        <!-- 搜索历史记录 -->

    </div>
</template>

<script>
/* eslint-disable */
import searchHostory from './components/search-hostory.vue'
import searchSuggest from './components/search-suggest.vue'
import searchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
    name: 'searchIndex',
    components: {
        searchHostory,
        searchSuggest,
        searchResult
    },
    props: {},
    data() {
        return {
            searchValue: '', //搜索框内文本
            isResultShow: false , // 控制搜索结果是否显示
            searchHostoryStr: getItem('TOUTIAO-HIISTORY') || [] // 用来储存搜索历史数据
        }
    },
    computed: {},
    watch: {
        searchHostoryStr (value1) {
            setItem('TOUTIAO-HIISTORY', value1)
        }
    },
    created() { },
    mounted() { },
    methods: {
        onSearch(val) {
            console.log(789);
            this.searchValue = val //让搜索建议的文本显示到这里
            this.isResultShow = true 
            //判断现在进行的数据是否已经存在
            const index = this.searchHostoryStr.indexOf(val) 
            //删除已经存在的重复数据
            if ( index !== -1) {
                this.searchHostoryStr.splice(index , 1)
            }
            //添加到数组中
            this.searchHostoryStr.unshift(val)
        },
        onCancel() {
            this.$router.go(-1)
        },
    }
}
</script>
<style scoped lang="less">



.search-container {
    padding-top: 108px;
    .van-search__action{
        color: #fff;
    }
    .fix-from {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
    }
}
</style>
