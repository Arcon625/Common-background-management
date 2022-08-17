<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px;">
      <el-card shadow="hover">
        <div class="user">
          <img :src="urlImg">
          <div class="user-info">
            <p class="name">admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-8-11</span></p>
          <p>上次登录地点：<span>广东</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" :key="key"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px;">
        <div class="num">
          <el-card v-for="(item,index) in countData" :key="index" :body-style="{display:'flex',padding:0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor:item.color}"></i>
            <div class="detail">
              <p class="num">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px;">
<!--          <div style="height: 280px;" ref="line-charts"></div>-->
          <Echarts :chart-series="lineChartObj.chartSeries"
                   :legend-data="lineChartObj.legendData"
                   :x-axis-data="lineChartObj.xAxisData"
                   :color-arr="lineChartObj.colorArr"
                   style="height: 280px;"></Echarts>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px;">
<!--            <div style="height: 240px;" ref="bar-charts"></div>-->

            <Echarts :chart-series="barChartObj.chartSeries"
                     :legend-data="barChartObj.legendData"
                     :x-axis-data="barChartObj.xAxisData"
                     :color-arr="barChartObj.colorArr"
                     style="height: 240px;"></Echarts>
          </el-card>
          <el-card style="height: 260px;">
<!--            <div style="height: 240px" ref="pie-charts"></div>-->
            <Echarts :chart-series="pieChartOgj.chartSeries"
                     :color-arr="pieChartOgj.colorArr"
                     style="height: 240px;"></Echarts>
          </el-card>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '@/api'
import Echarts from '@/components/Echarts'

export default {
  name: "index",
  components:{
    Echarts
  },
  mounted() {
    getData().then(value => {
      const {code,data} = value
      if (code === 20000){
        /*左侧表格数据*/
        this.tableData = data.tableData

        /*右侧折线图*/
        const orderData = data.orderData
        this.lineChartObj.xAxisData = orderData.date
        const lineKeyArr = Object.keys(orderData.data[0])
        this.lineChartObj.legendData = lineKeyArr
        lineKeyArr.forEach(key => {
          this.lineChartObj.chartSeries.push({
            name:key,
            data:orderData.data.map(item => item[key]),
            type:'line'
          })
        })

        /*右侧柱状图数据*/
        const userData = data.userData
        userData.forEach(item => {
          this.barChartObj.xAxisData.push(item.date)
        })
        this.barChartObj.legendData = ['新增用户','活跃用户']
        this.barChartObj.chartSeries = [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          },
        ]


        /*右侧饼图数据*/
        const videoData = data.videoData
        this.pieChartOgj.chartSeries = [
            {
              type:'pie',
              data:videoData
            }
        ]

      }
    },reason => {
      console.log(reason)
    })

  },
  data(){
    return {
      urlImg: require('../../assets/images/user.png'),
      tableData:[],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      lineChartObj: {
        chartSeries: [],
        legendData: [],
        xAxisData: [],
        colorArr: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      },
      barChartObj: {
        chartSeries: [],
        legendData: [],
        xAxisData: [],
        colorArr: ["#2ec7c9", "#b6a2de"],
      },
      pieChartOgj:{
        chartSeries: [],
        colorArr: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
