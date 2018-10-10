<template>
	<div class="lines">
		<div id="line"></div>
	</div>
</template>

<script>
import echarts from "echarts";
export default ({
	name:"lines",
	props:["msg","title","legend","xAxisData","yAxisFormat","seriesDataSeconed","markLine","markPoint"],
	data(){
		return {
			
		}
	},
	mounted(){
		this.drawLines();
		window.addEventListener('resize', this.handleresize);
	},
	methods:{
		drawLines(){
			var self = this;
	        this.myChartLines = echarts.init(document.getElementById("line"));
			var option = {
				color:["#5793f3",'#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
				title:{
					text:self.title,
				},
				legend:{
					data:self.legend,
				},
			    tooltip:{
			    	trigger: 'axis',
			        axisPointer: {
			            type: 'cross'
			        },	    	
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
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
		  this.myChartLines.setOption(option);
		},
		resizeWorldMapContainer() {
			var barChart= document.getElementById('line');
	        var barChartWrapper = document.getElementsByClassName('lines')[0];
	        var widthWrapper = window.getComputedStyle(barChartWrapper);
	        // barChart.css("width", width+"px");
	        barChart.style.width = widthWrapper +"px";
		},
		handleresize(){
	        this.resizeWorldMapContainer();
	        this.myChartLines.resize();
	    }
	},
	beforeDestroy(){
		var self = this;
		window.removeEventListener("resize",self.handleresize);
	}
})
</script>

<style lang="scss" scoped>
div.lines{
	width: 100%;
	height: 100%;
	div#line{
		width: 100%;
		min-height: 80%;
		height: 100%;
	}
}
</style>