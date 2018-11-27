<template>
<div class="pies">
	<div id="pie"></div>
</div>
</template>

<script>
import echarts from "echarts";
export default ({
	name:"pies",
	//props:["title","xAxisData","seriesData","tooltipFormatter"],
	props:["optionsPie"],
	data(){
		return {
			msg:"这是饼状图的公共组件",
		}
	},
	mounted(){
		this.drawEcahrts();
		window.addEventListener('resize', this.handleresize);
	},
	methods:{
		drawEcahrts(){
			var self  = this;
			this.pieCharts = echarts.init(document.getElementById("pie"));
			var option =  {
			    title:self.optionsPie.title,
			    tooltip : {
			        trigger: 'item',
			        formatter: self.optionsPie.tooltipFormatter
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    legend: {
			        // orient: 'vertical',
			        // top: 'middle',
			        top:"40px",
			        left: 'center',
			        data: self.optionsPie.xAxisData
			    },
			    series : self.optionsPie.seriesData
			};
			this.pieCharts.setOption(option);
		},
		resizeWorldMapContainer() {
			var barChart= document.getElementById('pie');
	        var barChartWrapper = document.getElementsByClassName('pies')[0];
	        var widthWrapper = window.getComputedStyle(barChartWrapper);
	        // barChart.css("width", width+"px");
	        barChart.style.width = widthWrapper +"px";
		},
		handleresize(){
	        this.resizeWorldMapContainer();
	        this.pieCharts.resize();
	    }
	},
	watch:{
		optionsPie:{
			handler(newVal,oldVal){
				var self =this;
				if(newVal){
					self.pieCharts.dispose();//释放上一个实例
					self.drawEcahrts();//重新初始化一个实例
				}else{
					self.pieCharts.dispose();
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
div.pies{
	width:100%;
	height: 100%;
	div#pie{
		width: 100%;
		min-height: 80%;
		height: 100%;
	}
}
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