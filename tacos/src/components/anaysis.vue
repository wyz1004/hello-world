<template>
	<div class="anaysis">
		<!--{{msg}}-->
		<Bars 
			v-bind:todo="msg"
			v-bind:title="title"
			v-bind:legend="legend"
			v-bind:tooltipFormatter="tooltipFormatter"
			v-bind:xAxisData="xAxisData"
			v-bind:yAxisFormat="yAxisFormat"
			v-bind:seriesDataSeconed="seriesDataSeconed"
		></Bars>
		<div id="barChart2"></div>
	</div>
</template>

<script>
	import axios from "axios";
	import echarts from "echarts";
	import Bars from "@/public/bars";
	
export default ({
	name:"anaysis",
	data(){
		return {
			msg:"能源分析",
			title:"能源分析",
			legend:["蒸气用量","耗电量","耗水量"],
			tooltipFormatter:'{b} 年<br />{a0} : {c0} %<br />{a1} : {c1} %<br />{a2} : {c2} %<br />',
			xAxisData:null,
			yAxisFormat:'{value} ％',
			seriesDataSeconed:null,
			requestDatas:null,
		}
	},
	created(){
		//从后台中获取数据
		var self = this;
		axios.get("/static/mockData/anaysis.json").then(res=>{
			console.log(res.data);
			self.requestDatas = res.data;
			self.xAxisData = res.data[0];
		var seriesDataSeconed = [{
		        	name:self.legend[0],
		            type:'bar',
		            data:res.data[2],
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color: 'rgba(104, 253, 255, 0.7)',
						},
					},
		        },{
		        	name:self.legend[1],
		            type:'bar',
		            data:res.data[1],
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color:'rgba(253, 200, 106, 0.7)',
						},
					},
		        },{
					name:self.legend[2],
		            type:'bar',
		            data:res.data[3],
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color:'rgba(127, 128, 225, 0.7)',
						},
					},
				}];
			self.seriesDataSeconed = seriesDataSeconed;
			
		}).catch(err=>{
			console.log(err);
		})
	},
	components:{Bars},
	mounted(){
		//this.drawBar();
	},
	updated(){
		console.log(this);
	},
	methods:{
		drawBar(){
			this.echarts = echarts.init(document.getElementById("barChart2"));
			console.log(this);
			var option = {
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            crossStyle: {
			                color: '#999'
			            }
			        }
			    },
			    toolbox: {
			        feature: {
			            dataView: {show: true, readOnly: false},
			            magicType: {show: true, type: ['line', 'bar']},
			            restore: {show: true},
			            saveAsImage: {show: true}
			        }
			    },
			    legend: {
			        data:['蒸发量','降水量','平均温度']
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
			            axisPointer: {
			                type: 'shadow'
			            }
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value',
			            name: '水量',
			            min: 0,
			            max: 250,
			            interval: 50,
			            axisLabel: {
			                formatter: '{value} ml'
			            }
			        },
			        {
			            type: 'value',
			            name: '温度',
			            min: 0,
			            max: 25,
			            interval: 5,
			            axisLabel: {
			                formatter: '{value} °C'
			            }
			        }
			    ],
			    series: [
			        {
			            name:'蒸发量',
			            type:'bar',
			            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			        },
			        {
			            name:'降水量',
			            type:'bar',
			            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			        },
			        {
			            name:'平均温度',
			            type:'bar',
			            yAxisIndex: 1,
			            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
			        }
			    ]
			};
			this.echarts.setOption(option);
		},
		
	}
})
</script>

<style lang="scss" scoped>
div.anaysis{
	width: 100%;
	height: 100%;
	padding:20px;
	background: white;
	div#barChart2{
		width: 100%;
		min-height: 80%;
		height: 100%;
	}
}
</style>