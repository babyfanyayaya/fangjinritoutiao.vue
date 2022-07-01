<template>
    <div class="search-hisrory-container">
        <van-cell title="搜索历史">
            <div v-if="isDeleteShow">
                <span @click="$emit('serachHistoryNo', [])">全部删除</span>
                <span @click="isDeleteShow = false">完成</span>
            </div>

            <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
        </van-cell>
        <van-cell :title="item" :key="index" v-for="(item, index) in searchHostoryStr">
            <van-icon name="close" v-if="isDeleteShow" @click="searchDelte(item, index)" />
        </van-cell>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'search-history-Index',
    components: {},
    props: {
        searchHostoryStr: {
            type: Array,
            required: true

        }
    },
    data() {
        return {
            isDeleteShow: false //控制删除是否显示状态
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        searchDelte(item, index) {
            console.log(456)
            //如果是删除状态
            if (this.isDeleteShow) {
               this.searchHostoryStr.splice(index, 1)
            }else {
             //不是删除状态，则跳到搜索建议页面
             console.log(789);
                this.$emit('searchText', item)
            }
           
        } 
    }
}
</script>
<style scoped lang="less">
</style>
