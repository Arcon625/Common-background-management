<template>
  <div class="tags">
    <el-tag
        v-for="(item,index) in tagList"
        :key="index"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="closeTag(item,index)"
    >
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
  name: "CommonTag",
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      tagList: state => state.tab.tabList
    })
  },
  methods:{
    ...mapMutations(['deleteTab']),
    changeMenu(item){
      this.$router.push({name:item.name})
    },
    closeTag(item,index){
      const maxIndex = this.tagList.length - 1

      // 删除state.tab.tabList数组中的指定的元素
      this.deleteTab(item)

      // 如果关闭的不是当前正在显示的路由，则不进行其他操作
      if (item.name !== this.$route.name){
        return
      }
      // 如果关闭的是当前正在显示的路由
        /// 如果是最后一个tag，则跳转到上一个tag
      if (index === maxIndex){
        this.$router.push({
          name: this.tagList[index-1].name
        })

      } /// 如果不是，则跳转到下一个tag
      else {
        this.$router.push({
          name: this.tagList[index].name
        })

      }

    }
  }
}
</script>

<style lang="less" scoped>
  .tags{
    padding: 20px;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>
