<template>
	<div class="bars" >
		<div id="bar"></div>
	</div>
</template>

<script>
	import echarts from "echarts";
export default ({
	name:"bars",
	//props:["title","legend","tooltipFormatter","xAxisData","yAxisFormat","seriesDataSeconed"],
	props:["optionBars"],
	data(){
		return {}
	},
	mounted(){
		//console.log(this.optionBars)
		this.drawEcahrts();
		window.addEventListener('resize', this.handleresize);
	},
	methods:{
		drawEcahrts(){
			var self = this;
			this.echartBars = echarts.init(document.getElementById("bar"));
			console.log(this.optionBars);
			
			var option = {
			    color:["#5793f3",'#c23531','#2f4554'],
			    title:self.optionBars.title,
				legend:{
					data:self.optionBars.legend,
	                top: '0',
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
	                formatter: self.optionBars.tooltipFormatter?self.optionBars.tooltipFormatter:null
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
			            data : self.optionBars.xAxisData,
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
			                formatter: self.optionBars.yAxisFormat
			            }
			        }
			    ],
			    series : self.optionBars.seriesDataSeconed
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
	watch:{
		optionBars:{
			handler(newVal,oldVal){
				var self =this;
				if(newVal){
					self.echartBars.dispose();//释放上一个实例
					self.drawEcahrts();//重新初始化一个实例
				}else{
					self.echartBars.dispose();
					self.drawEcahrts(oldVal);
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