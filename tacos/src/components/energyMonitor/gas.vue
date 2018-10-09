<template>
<div class="gas">
	<div id="barChart2"></div>
</div>
</template>

<script>
	import echarts from "echarts";
	export default({
		name:"Gas",
		mounted(){
			this.drawLine();
			window.addEventListener('resize', this.handleresize);
		},
		methods:{
			drawLine(){
//				console.log(this);//{a: {…}}
		        // 基于准备好的dom，初始化echarts实例
		        this.myChart = echarts.init(document.getElementById('barChart2'))
		        // 绘制图表
		        this.myChart.setOption({
		            title: { text: '在Vue中使用echarts' },
		            tooltip: {},
		            xAxis: {
		                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
		            },
		            yAxis: {},
		            series: [{
		                name: '销量',
		                type: 'bar',
		                data: [5, 20, 36, 10, 10, 20]
		            }]
		        });
		    },
		    resizeWorldMapContainer(){
		        var barChart= document.getElementById('barChart2');
		        var barChartWrapper = document.getElementsByClassName('gas')[0];
		        //在react项目中，barChartWrapper是class名为water的元素。
		        //在vue项目中，之所以改变为路口入口的父级元素monitor_content，是因为，在每次切换子路由时，window中一直存在monitor_content这个元素；
		        //相反在vue项目中，只加载当前显示的组件，而water元素只在显示water组件时，才存在，其余情况不存在，所以在window情况下，有时有，有时无，故容易报错。
		        var widthWrapper = window.getComputedStyle(barChartWrapper);
		        // barChart.css("width", width+"px");
		        barChart.style.width = widthWrapper +"px";
		    },
		    handleresize(){
		        this.resizeWorldMapContainer();
		        this.myChart.resize();
		    }
		},
		beforeDestroy(){
//			console.log(this);
			//该声明周期不用箭头函数，this是指VueComponent {_uid: 36, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
			//该生命周期函数，用箭头函数时，this是指{a: {…}, myChart: ECharts, timer: 7}
			var self = this;
	        window.removeEventListener('resize', self.handleresize);
	        self.myChart.clear();
		}
	})
</script>

<style lang="scss" scoped>
	div.gas{
		width: 100%;
		height: 100%;
		padding:20px;
		div#barChart2{
			width: 100%;
			min-height: 80%;
			height: 100%;
		}
	}
</style>