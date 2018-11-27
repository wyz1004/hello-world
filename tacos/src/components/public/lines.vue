<template>
	<div class="lines">
		<div id="line"></div>
	</div>
</template>

<script>
import echarts from "echarts";
export default ({
	name:"lines",
	//props:["title","legend","xAxisData","yAxisFormat","seriesDataSeconed","markLine","markPoint"],
	props:["optionsUse"],
	data(){
		return {}
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
				color:["#84a4ee","#5793f3",'#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
				title:self.optionsUse.title,
				legend:{
					data:self.optionsUse.legend,
				},
				toolbox: {
			        show : true,
			        feature : {
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    tooltip:{
			    	trigger: 'axis',
			        axisPointer: {
			            type: 'cross'
			        },	
			        formatter: self.optionsUse.tooltipFormatter?self.optionsUse.tooltipFormatter:null
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
			            data : self.optionsUse.xAxisData,
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
			                formatter: self.optionsUse.yAxisFormat
			            }
			        }
			    ],
			    series : self.optionsUse.seriesDataSeconed
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
	watch:{
		optionsUse:{
			handler(newVal,oldVal){
				var self =this;
				if(newVal){
					self.myChartLines.dispose();//释放上一个实例
					self.drawLines();//重新初始化一个实例
				}else{
					self.myChartLines.dispose();
					self.drawLines(oldVal);
				}
			},
			deep:true
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