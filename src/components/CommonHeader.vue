<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="clickBtn"></el-button>
<!--      <h3 style="color: #fff;">首页</h3>-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="tab" v-for="(item,index) in tabList" :key="index" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="urlImg">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonHeader",
  data(){
    return {
      urlImg: require('../assets/images/user.png')
    }
  },
  methods:{
    clickBtn(){
      this.$store.commit('changeIsCollapse')
      console.log(this.urlImg)
    },
    logout(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      tabList: state => state.tab.tabList
    })
  }
}
</script>

<style lang="less" scoped>
  header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .l-content{
    display: flex;
    align-items: center;
    .el-button{
      margin-right: 20px;
    }
    .el-breadcrumb__item /deep/ .is-link{
      color:#606266;
      &:hover{
        color: #ffffff;
      }
    }
    .el-breadcrumb__item:last-child /deep/ .is-link{
      color:white;
      cursor: pointer;
    }


  }
  .r-content{
    .user{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
</style>
