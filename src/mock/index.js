import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'
import permissionApi from './permission'

// 调用Mock的mock()方法，拦截请求
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)

Mock.mock(/api\/user\/add/,'post',userApi.createUser)
Mock.mock(/api\/user\/edit/,'post',userApi.updateUser)
Mock.mock(/api\/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/api\/user\/del/,'get',userApi.deleteUser)

Mock.mock(/api\/permission\/getMenu/,"post",permissionApi.getMenu)

