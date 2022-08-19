### 登录界面
    1、使用el-form、el-form-item、el-input、el-button组件
        ①el-form组件：
            model属性：属性值为一个用于接收该表单内的数据的对象，如 :model='form'
            rules属性：属性值为一个用于指定表单对象内数据的验证规则的对象，对象内的属性key与form表单数据对象内的属性key一一对应，属性value为验证规则数组
                    如：rules:{
                            username:[
                                {require: true,message: '请输入用户',trigger: 'blur'},
                                {min:3,message: '用户名不能小于3位',trigger: 'blur'}
                            ],
                            password:[
                                {require: true,message: '请输入密码',trigger: 'blur'}
                            ]
                        }
                    如上，一个数据的验证规则可以有多条
            label-width属性：指定el-form-item的标题宽度，继承给el-form-item
            status-icon属性：是否在表单域中的输入框中显示校验结果反馈图标
        ②el-form-item组件：
            label属性：字符串，设置左侧标题
            label-width属性：指定该el-form-item标题的宽度，能够覆盖从el-form继承过来的label-width
            prop属性：字符串，为el-form组件的model对象中的属性key
        ③el-input组件：
            type属性：设置输入框的类型，如‘input’、‘password’
            v-model绑定form表单数据对象中的属性，用于双向绑定输入框中的的内容
            autocomplete属性：是否开启自动补全，如‘off’为关闭
            placeholder属性，设置输入框的占位文本
        ④el-button组件：
            type属性：如‘primary’、‘danger’，用于设置按钮的样式
            绑定点击事件

### 登录按钮点击事件
    1、发送post请求，将 username、password作为data参数，获取后台的menu数据
        ①在api/index.js 中定义函数，使用二次封装后的axios向后台发送post请求
        ②在Login组件中引入该函数，在‘登录’按钮的点击事件中执行该函数，并将 form表单数据对象 作为post请求的data参数传入该函数
        ③判断请求返回的数据（这些数据可以使用Mock来模拟），如果请求失败则 this.$message.warning(data.message) 弹出请求失败的提示框
            （需要引入 element-UI的 Message 组件）
    2、根据返回的数据，展示不同的左侧菜单栏
        ①引入 Cookie-js模块，在state中声明menu属性为空数组
        ②在mutations中创建 clearMenu函数，函数中执行 Cookie.remove(cookie字段名);
            创建 setMenu函数，函数中执行 Cookie.set(cookie字段名,cookie字段值)
        ③如果判断请求成功，
            调用mutations中的clearMenu函数，清除指定的Cookie：this.$store.commit('clearMenu') 
            调用mutations中的setMenu函数，将请求放回的菜单栏数据传入，生成指定的Cookie：this.$store.commit('setMenu') （需要JSON.stringify转换）
            以相同的方式创建Cookie的token字段，用于判断是否有权限进入首页
            调用this.$router.push()方法跳转到首页
        ④获取生成的menu字段，赋值给state中的 menu空数组（需要JSON.parse还原）
        ⑤在菜单栏组件中，声明计算属性，放回 state中的 menu属性，用于遍历生成 el-menu-item
    3、设置全局路由守卫，根据Cookie中的token字段，判断是否有权限进入首页，以及是否进入登录界面
        如：
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

    4、点击退出账号的按钮，点击事件中执行相应的mutations中的函数，清除Cookie的menu、token字段，接着跳转到登录组件
