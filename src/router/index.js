import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Home')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/User')
    },
    {
      path: '/mall',
      name: 'mall',
      component: () => import('@/pages/Mall')
    },
    {
      path: '/page1',
      name: 'page1',
      component: () => import('@/pages/Other/PageOne')
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('@/pages/Other/PageTwo')
    },

  ],

})
