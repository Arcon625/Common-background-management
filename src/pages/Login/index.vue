<template>
  <el-form
    :model="form"
    :rules="rules"
    status-icon
    label-width="80px"
    ref="form"
    class="login-contain"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item
      label="用户名"
      prop="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>

    <el-form-item
        label="密码"
        prop="password"
    >
      <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item label-width="0px">
      <el-button type="primary" @click="loginHandler" class="login-btn">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {getMenu} from '@/api'

export default {
  name: "index",
  data(){
    return {
      form: {
        username:'',
        password:'',
      },
      rules: {
        username: [
          {require: true,message: '请输入用户',trigger: 'blur'},
          {min:3,message: '用户名不能小于3位',trigger: 'blur'}
        ],
        password: [
          {require: true,message: '请输入密码',trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    loginHandler(){
      getMenu(this.form).then(res => {
        const {code,data} = res
        if (code === 20000){
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu',data.menu)
          this.$store.commit('setToken',data.token)
          this.$store.commit('setMenuRoute',this.$router)
          this.$router.push({name:'home'})

        }else {
          this.$message.warning(data.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-contain{
    width: 350px;
    border-radius: 15px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #ffffff;
    border: 2px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .login-title{
      margin: 0 auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .login-btn{
      margin-left: 100px;
    }
  }


</style>
