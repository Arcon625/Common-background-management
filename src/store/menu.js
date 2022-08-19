import Cookie from 'js-cookie'
export default {
  state:{
    asyncMenu:[]
  },
  mutations:{
    setMenu(state,value){
      state.asyncMenu = value
      Cookie.set('menu',JSON.stringify(value))
    },
    clearMenu(state){
      state.asyncMenu = []
      Cookie.remove('menu')
    },
    setMenuRoute(state,router){
      if (!Cookie.get('menu')){
        return
      }

      const routeArr = []
      const menu = JSON.parse(Cookie.get('menu'))
      state.asyncMenu = menu
      menu.forEach(item => {
        if (item.children) {
          item.children  = item.children.map(item => {
            item.component = () => import(`@/pages/${item.url}`)
            return item
          })
          routeArr.push(...item.children)
        }else {
          item.component = () => import(`@/pages/${item.url}`)
          routeArr.push(item)
        }
      })

      routeArr.forEach(item => {
        router.addRoute('main',item)
      })
    }
  }
}
