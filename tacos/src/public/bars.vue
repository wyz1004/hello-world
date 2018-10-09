<template>
	<div class="bars" >
		<div id="bar"></div>
	</div>
</template>

<script>
	import echarts from "echarts";
export default ({
	name:"bars",
	props:["title","legend","tooltipFormatter","xAxisData","yAxisFormat","seriesDataSeconed"],
	data(){
		return {
		}
	},
	mounted(){
		this.drawEcahrts();
		window.addEventListener('resize', this.handleresize);
	},
	methods:{
		drawEcahrts(){
			var self = this;
			this.echartBars = echarts.init(document.getElementById("bar"));
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
			this.echartBars.setOption(option);
		},
		resizeWorldMapContainer() {
			var barChart= document.getElementById('bar');
	        var barChartWrapper = document.getElementsByClassName('bars')[0];
	        var widthWrapper = window.getComputedStyle(barChartWrapper);
	        // barChart.css("width", width+"px");
	        barChart.style.width = widthWrapper +"px";
		},
		handleresize(){
	        this.resizeWorldMapContainer();
	        this.echartBars.resize();
	    }
	},
	beforeDestroy(){
		var self = this;
		window.removeEventListener("resize",self.handleresize);
	}
	
})
</script>

<style lang="scss" scoped>
div.bars{
		width: 100%;
		height: 100%;
		div#bar{
			width: 100%;
			min-height: 80%;
			height: 100%;
		}
	}
</style>