<template>
	<div class="barChartWrapper bars" >
	
		<div class="bars" id="bars"></div>
	</div>
</template>

<script>
	import echarts from "echarts";
export default ({
	name:"bars",
	props:["todo","title","legend","tooltipFormatter","xAxisData","yAxisFormat","seriesDataSeconed"],
	data(){
		return {
			msg:"图标"
		}
	},
	mounted(){
		this.drawEcahrts();
	},
	updated(){
		console.log(this);
	},
	methods:{
		drawEcahrts(){
			var self = this;
			this.echartsss = echarts.init(document.getElementById("bars"));
			var option = {
			    color:["#5793f3",'#c23531','#2f4554'],
			    title:{
					text:self.title,
				},
				legend:{
					data:self.legend,
	                top: '0',
				},
			    tooltip:{
			    	trigger: 'axis',
			        axisPointer: {
			            type: 'cross'
			        },
	                formatter: self.tooltipFormatter?self.tooltipFormatter:null
			    },
	            grid: {
	                left: '5%',
	                right: '5%',
	                top: '10%',
	                bottom: '5%',
	                containLabel: true
	            },
			    dataZoom:{
			    	type:'inside',
			    	show:'true',
			    	xAxisIndex:0,
			    	start:0,
			    	end:100,
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : self.xAxisData,
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            min:0,
			            axisLabel: {
			                formatter: self.yAxisFormat
			            }
			        }
			    ],
			    series : self.seriesDataSeconed
			};
			this.echartsss.setOption(option);
 
		}
	}
	
})
</script>

<style lang="scss" scoped>
div.bars{
	width: 100%;
	height: 300px;
}
</style>