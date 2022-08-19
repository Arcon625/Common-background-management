import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from '@/api/axios'
import './mock'

import './assets/less/index.less'

import {Container,Aside,Header,Main,Menu,MenuItem,MenuItemGroup,Submenu,Button,Dropdown,DropdownMenu,DropdownItem,
Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Form,FormItem,Input,Switch,DatePicker,Select,Option,Dialog,Pagination,Message,MessageBox} from 'element-ui'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.config.productionTip = false

Vue.prototype.$axios = axios

// 定义全局前置路由守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login'){
    next({name:'login'})
  }else if (token && to.name === 'login'){
    next({name:'home'})
  }else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('setMenuRoute',router)
  },
}).$mount('#app')
