### axios二次封装
    1、npm i axios -S 下载axios模块
    2、创建api目录，在目录中创建axios.js文件，文件中引入 axios模块，并使用 axios.create()方法创建实例对象，
        配置baseURL、timeout等，并设置请求拦截器和响应拦截器，然后向外暴露
    3、在api目录下创建用于发送请求获取数据的index.js文件，文件中引入二次封装后的axios.js文件，创建不同的函数模块
        模块中返回axios.js文件暴露的axios实例对象（常命名为 axios），配置url、method、data、params等，然后分别暴露，
            如：export const getHomeData = () => axios({url:'/home/data',methods:'get'})
    4、其他组件中或vuex中可以引入index.js文件中暴露出来的这些函数模块，然后调用，由于返回的是axios实例对象，
        所以需要调用then()方法才能够获取到响应回来的数据或请求失败的错误对象

### mock数据
    1、npm imockjs -S 下载mockjs模块
    2、创建mock目录，目录中创建用于创建模拟数据的js文件，可以一个组件对应一个js文件，这些js文件中引入mockjs模块，
        然后使用mockjs模块创建模拟数据，并默认暴露
    3、再创建一个index.js文件，在index.js文件中引入mockjs模块，以及各个暴露模拟数据的js文件，然后使用mockjs模块的mock方法
        拦截指定请求，并返回指定的模拟数据
            如：Mock.mock('/api/home/getData',homeMock.getStatisticalData)    或使用正则
                Mock.mock(/api\/home\/getData/,homeMock.getStatisticalData)

### echarts的使用
    1、npm i echarts -S 下载组件库
    2、在相应的组件中引入核心模块
        import * as echarts from 'echarts'
    3、编写绘图的配置对象，配置对象中有 xAxis、yAxis、legend、series、color、grid等属性
        ①xAxis、yAxis：分别为横坐标和纵坐标样式，属性值为对象，对象中的不同属性代表不同功能：
            data：属性值为数组，数组中每个元素代表不同的图例名称
            axisLine：用于设置坐标轴线的样式
            axisLabel：用于设置坐标label的样式
        ②legend：图例，即标识图表中哪个折线/柱子/饼状，对应哪个数据，属性值为数组，数组中每个元素对应图例的名称，不同的图例默认有不同的样式
        ③series：绘图数据，属性值为数组，数组中的每个元素是一个对象，一个对象对应一个图例的数据，对象中有 name、data、type属性（饼图的series也为数组，但数组中每个对象中是 name和value属性）
            name：对应的图例名称
            data：属性值为数组，数组中每个元素值为数字，代表不同坐标下该图例的值的大小
            type：属性值为 'line'、'bar' 等字符串，代表不同坐标下该图例的图形类型
        ④color：每个图例所填充的颜色，属性值为数组，数组中每个元素为rgb字符串，每个实例默认也会拥有不同的颜色
        ⑤grid：属性值为一个对象，对象中的不同属性拥有不同的功能，常用于规定图标距离父元素边框的距离
            如：left: '20%'，则表示图标距离父元素左边 20% 的距离
        注意点：
            ①xAxis数组的元素个数与series数组中每个对象的data数组属性的元素个数相同，保证一一对应
            ②legend数组的元素分别对应eries数组中不同对象的name属性值
    4、定位哪个元素需要绘制图表：
        ①先要为元素添加ref属性，方便找到该元素
        ②接着使用echarts.init()方法，定位到指定元素如：const E =  echart.init(this.$ref.xxx)
    5、开始绘图，使用setOption()方法为该图表添加配置对象：
        如，E.setOption(option)
    
### 将echarts图表封装成通用组件
    1、引入echarts组件库：import * as echarts from 'echarts'
    2、创建Echarts组件，组件中创建一个div，并添加ref属性值为echarts
    3、组件中创建 AxisChartOption、normalChartOption变量分别表示有坐标轴的图表（如折线图、条形图）和无坐标轴的图表（如饼图）的配置对象
    4、AxisChartOption配置对象中有 xAxis、yAxis、grid、tooltip、color、legend、series等属性
        xAxis.data属性值为空对象
        color属性值为空对象
        legend.data属性值为空对象
        series属性值为空对象
        其他属性可以直接编写或使用默认
    5、normalChartOption配置对象中有 tooltip、color、series等属性
        color属性值为空对象
        series属性值为空对象
    6、props配置项中接收 xAxisData、colorArr、legendDa ta、chartSeries等属性，用于获取创建该组件对象时所传入的数据
    7、组件中创建drawChart()方法，方法中：
        ①定位图表绘制的位置 const E = echarts.init(this.$refs.echarts)
        ②判断是否传入了 xAxisData，
            如果有则为有坐标轴图表，则将传入的所有prop赋值给 AxisChartOption配置对象中的相应属性，
                然后 E.setOption(this.AxisChartOption)
            如果无则为无坐标轴图表，则将传入的部分prop赋值给 normalChartOption配置对象中的相应属性
                然后 E.setOption(this.normalChartOption)
    8、在watch配置项中监视 chartSeries这个prop，捕获器中执行 this.drawChart()方法，
        可以看作一开始chartSeries为undefined，当使用组件传入数据时，chartSeries接收到数据，发生了改变，就触发了捕获器
            


