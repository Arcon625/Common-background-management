<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
    <h3 >{{ isCollapse ? '后台':'通用后台管理系统' }}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="(item,index) in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="(item,index) in hasChildren" index="4" :key="index">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item  @click="clickMenu(subItem)" v-for="(subItem,subIndex) in item.children" :index="subItem.path" :key="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'CommonAside',

  data() {
    return {
      menu: []
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    clickMenu(item){
      this.$router.push({
        name: item.name
      })
      this.$store.commit('selectMenu',item)
    }
  },
  computed: {
    asyncMenu(){
      return this.$store.state.menu.asyncMenu
    },
    noChildren() {
      return this.asyncMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },

  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
    h3{
      color: #ffffff;
      line-height: 48px;
      text-align: center;
    }
  }
</style>
