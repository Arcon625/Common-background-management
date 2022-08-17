<template>
  <div class="manage">
    <el-dialog
      :title="dialogType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
      width="50%"
    >
      <CommonForm
          :formLabel="formLabel"
          :formData.sync="formData"
          :isInline="true"
          ref="form"
      >
        <div class="dialog-footer" slot="footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </CommonForm>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <CommonForm
          :formLabel="[{type:'input',label:'',model:'keyword'}]"
          :formData.sync="searchForm"
          :isInline="true"
          ref="form"
      >
        <el-button slot="footer" type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </CommonForm>
    </div>

    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="tableConfig"
      @edit="editUser"
      @del="delUser"
      @changePage="getList"
    ></CommonTable>
  </div>
</template>

<script>
import { getUser } from '@/api'
import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable'
export default {
  name: "index",
  components: {
    CommonForm,
    CommonTable
  },
  created() {
    this.getList()
  },
  data(){
    return {
      dialogType: 'add',
      isShow: false,
      formLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      formData:{
        name:'',
        addr:'',
        sex:'',
        age:'',
        birth:'',
      },
      searchForm:{
        keyword:''
      },
      tableData:[],
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        },
        {
          prop:'age',
          label:'年龄'
        },
        {
          prop:'sexLabel',
          label:'性别'
        },
        {
          prop:'birth',
          label:'出生日期',
          width: 200,
        },
        {
          prop:'addr',
          label:'地址',
          width:320,
        },
      ],
      tableConfig:{
        page: 1,
        total: 30,
      }
    }
  },
  methods:{
    cancel(){
      this.isShow = false
      this.formData = {
        name:'',
        addr:'',
        sex:'',
        age:'',
        birth:'',
      }
    },
    confirm(){
      console.log(this.formData)
      if (this.dialogType === 'edit'){
        this.$axios.post('/user/edit',this.formData).then(res => {
          this.isShow = false
          console.log(res)
          this.getList()
        })
      }else {
        this.$axios.post('/user/add',this.formData).then(res => {
          this.isShow = false
          console.log(res)
          this.getList()
        })
      }
    },
    getList(name=''){
      this.tableConfig.loading = true

      name ? (this.tableConfig.page = 1) : ''

      getUser({
        page:this.tableConfig.page,
        name,
      }).then(value => {
        console.log(value)
        const {count,list} = value
        this.tableData = list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })

        this.tableConfig.total = count
        this.tableConfig.loading = false
      },reason => {
        console.log(reason)
      })
    },
    addUser(){
      this.isShow = true
      this.dialogType = 'add'
      // 重新初始化，避免使用上次增加的信息
      this.formData = {
        name:'',
        addr:'',
        sex:'',
        age:'',
        birth:'',
      }
    },
    editUser(row){
      this.dialogType = 'edit'
      this.isShow = true
      this.formData = row
    },
    delUser(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        const id = row.id
        this.$axios.post('/user/del',{
          params:{id}
        }).then((res) => {
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
