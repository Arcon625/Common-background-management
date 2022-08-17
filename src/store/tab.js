export default {
  state:{
    isCollapse: false,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home',
      }
    ],
    currentMenu: null
  },
  mutations: {
    changeIsCollapse(state){
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state,value){
      if (value.name !== 'home'){
        state.currentMenu = value
        // 判断tabList中是否已存在该tab
        const result = state.tabList.findIndex(item => item.name === value.name)
        if (result === -1){
          state.tabList.push(value)
        }
      }else {
        state.currentMenu = null
      }
    },
    deleteTab(state,value){
      const result = state.tabList.findIndex(item => item.name === value.name)
      // 使用数组的splice()方法从指定位置删除一个元素
      state.tabList.splice(result,1)
      console.log(state.tabList)
    }
  }
}
