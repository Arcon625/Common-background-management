<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="(item,index) in tableLabel"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 这里的scope为一个自定义的对象名，其里面的row属性指向一个当前行的数据对象，数据来源于tableData，scope.row[item.prop]则取到相应的属性值-->
        <template v-slot="scope">
          <span style="margin-left: 10px;">{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="editHandler(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteHandler(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        class="pager"
        layout="prev,pager,next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changeHandler"
        :page-size="20"
    >
    </el-pagination>
  </div>

</template>

<script>
export default {
  name: "CommonTable",
  props:{
    tableData:Array,
    tableLabel:Array,
    config:Object
  },
  data(){
    return {

    }
  },
  methods:{
    editHandler(row){
      console.log(row)
      this.$emit('edit',row)
    },
    deleteHandler(row){
      this.$emit('del',row)
    },
    changeHandler(){
      this.$emit('changePage')
    }
  }
}
</script>

<style lang="less" scoped>
  .common-table{
    position: relative;
    height: calc(100% - 62px);
    background-color: #fff;
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
</style>
