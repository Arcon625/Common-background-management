<template>
  <div ref="echarts" ></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "Echarts",

  props:['chartSeries','legendData','xAxisData','colorArr'],
  watch:{
    chartSeries(){
      this.drawChart()
    },
  },
  data(){
    return {
      AxisChartOption: {
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis:{
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        color: [],
        legend:{
          data: [],
        },
        series: [],
      },
      normalChartOption: {
        tooltip: {
          trigger: "axis",
        },
        color: [],
        series: [],
      },
    }
  },
  methods:{
    drawChart(){
      const E = echarts.init(this.$refs.echarts)
      if (this.xAxisData){
        this.AxisChartOption.xAxis.data = this.xAxisData
        this.AxisChartOption.legend.data = this.legendData
        this.AxisChartOption.color = this.colorArr
        this.AxisChartOption.series = this.chartSeries
        E.setOption(this.AxisChartOption)
      }else{
        this.normalChartOption.color = this.colorArr
        this.normalChartOption.series = this.chartSeries
        E.setOption(this.normalChartOption)
      }

    }
  }
}
</script>

<style lang="less" scoped>

</style>
