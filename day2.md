### 封装通用的table组件
    1、使用到element-UI中的 el-table、al-table-column 组件，
        el-table组件：
            data属性：属性值为数组，数组中每个元素是一个对象，一个对象代表表格中一行中不同列的数据
            height属性：百分数、px值
            stripe属性：设置是否为条纹table
        el-table-column组件：
            label属性：字符串，设置表格该列的标题
            prop属性：字符串，将data数组中每个对象中属性key为该prop的属性值作为这一列的数据
            width属性：百分数、px值
            show-overflow-tooltip属性：可实现列内容过长被隐藏时显示tooltip的功能
    2、创建通用table组件：
        ①使用el-table标签，接收prop:{tableData:Array}，赋值给data属性，手动设置height、stripe等属性
            tableData数组中每个元素为对象，一个对象代表表格中一行中不同列的数据
        ②el-table标签中使用el-table-column标签，接收prop:{tableLabel:Array}，标签中循环遍历tableLabel，创建表格的每一列
            tableLabe数组中每个元素为对象，对象中有prop属性、label属性，
            将其中的label属性赋值给 el-table-column标签 的label属性，指定该列的标题
            将其中的prop属性赋值给 el-table-column标签 的prop属性，指定该列的数据
            在这些el-table-column标签内部创建 template标签，并为其设置属性 v-slot="scope"，这样’scope‘变量就指向一个对象，
                scope.row 属性就表示表格当前行的所有数据，这样就能使用 scope.row[item.prop] 获取到当前行该列的数据（item为遍历tableLabel数组产生的）
                然后可以在template标签中创建span标签展示数据，如 <span>{{scope.row[item.prop]}}</span>
        ③如果需要手动创建其他列，如用于编辑或删除的列，可以直接使用 el-table-column标签，并手动设置标签的label（如 ‘操作’），
            然后在标签中创建 el-button按钮等
            如果el-table-column标签内的（如el-button）标签的点击事件需要获取当前行的数据，可以在 el-button标签外部包裹一个 template标签，
            然后为template标签设置 v-slot="scope" 属性，使用scope.row属性获取当前行的数据，同上

### 封装通用的form组件
    1、使用element-UI组件中的 el-form、el-form-item组件
        el-form组件：
            label-width属性：px值，用于设置el-form标签内部的el-form-item标签的标题的宽度
            model属性：属性值为对象，该对象是整个表单的数据对象
            inline属性：布尔值，设置内部的el-form-item标签是行内排布，还是块级排布
            label-position属性：字符串（right/left/top)，用于设置内部el-form-item标签的标题的对其方式
            @submit.native.prevent事件：取消默认在输入框中按下回车提交表单数据的这个默认行为
        el-form-item组件：
            label属性：字符串，用于设置当前el-form-item组件的标签
    2、创建通用form组件:
        ①使用el-form标签，标签接收prop:{formData:Object,isInline:Boolean}，
            然后 :model="formData"，动态绑定表单的数据对象，:inline="isInline"动态设置表单排布方式
            formData对象中的每个属性值都对应一个el-form-item组件的数据，如name、age、sex、addr、birth等
        ②使用el-form-item标签，接收props:{formLabel:Array}，然后循环遍历formLabel来创建多个el-form-item标签，
            formLabel数组中每个对象都有 label、model、type等属性
            将其中的label属性赋值给el-form-item标签的label属性，指定标题
            model属性则用于指定需要动态绑定formData对象中的哪个属性
            type属性用于判断在该el-form-item标签内部创建哪一种表单标签
        ③在遍历出来的el-form-item标签中可以利用传入的formLabel创建不同的表单标签，如input、switch、date-picker、select等标签
            使用v-if="item.type === 'input'" 或 v-if="item.type === 'switch'" 等，判断当前el-form-item标签中需要哪种表单标签
            并为表单标签设置 v-model="formData[item.model]" ，双向绑定，即当修改了该表单标签的value值，formData中的对应属性也会动态改变
            （这里的item是遍历formLabel数组产生的）

### el-pagination组件的使用（常）
    1、layout属性：字符串，用于设置分页器的按钮布局，prev（向前）、pager（页数）、next（向后），可以同时使用，如 layout="prev,pager,next"
    2、total属性：整数，用于指定总条目数
    3、page-size属性：整数，用于指定每一页的条目数，支持 .sync修饰符
    4、current-page属性：数字，表示当前页码，通常使用 .sync 修饰符，动态绑定一个用于存储当前页码的变量，如 :current-page.sync="page"
    5、current-chang事件：切换页码时触发的事件回调，如 @current-change="changeHandler"
