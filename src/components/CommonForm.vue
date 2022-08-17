<template>
  <el-form ref="form" label-width="100px" :inline="isInline" :model="formData">
    <el-form-item v-for="(item,index) in formLabel" :key="index" :label="item.label">
      <el-input
          v-if="item.type==='input'"
          :placeholder="'请输入'+item.label"
          v-model="formData[item.model]"
      ></el-input>
      <el-switch
          v-if="item.type==='switch'"
          v-model="formData[item.model]"
      ></el-switch>
      <el-date-picker
          v-if="item.type==='date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="formData[item.model]"
      ></el-date-picker>
      <el-select
          v-if="item.type==='select'"
          placeholder="请选择"
          v-model="formData[item.model]"
      >
        <el-option
          v-for="(item,index) in item.opts"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <slot name="footer"></slot>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",
  props:{
    formLabel:Array,
    formData:Object,
    isInline:Boolean,
  },

}
</script>

<style lang="less" scoped>

</style>
