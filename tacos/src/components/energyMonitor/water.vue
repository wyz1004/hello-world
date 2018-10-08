<template>
	<div id="water">
		<div class="monitors" id="barChart2"></div>
	</div>
</template>

<script>
	import axios from "axios";
	import echarts from "echarts";
	export default({
		name:"Water",
		data:function(){
			return {
				seriesDataSeconedThird:[],
		    	plainOptionLs:[],//所有的选项
		    	td:null,
			}
		},
		mounted(){
			//console.log(this);//VueComponent {_uid: 35, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
			this.getDatas();
			window.addEventListener('resize', this.handleresize);
		},
		computed:{
			/*handleclick(){
				console.log("handleclick",this);//VueComponent {_uid: 35, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
			},*/
			//处理和合并数组
			handleMonitorData:(monitorsData,historiesData)=>{
				var self = this;//{a: {…}, myChart: ECharts, timer: 3}
				console.log(monitorsData,historiesData);
				var requestDatas,plainOptionLs=[],checkedList=[],seriesDataSeconedThird=[],td=0;
				var lastObject = [];
				var now = new Date().toLocaleString().replace(/^\D*/,'');
				//x轴转换成由时间戳（秒）转换成本地字符串的形式  2018/6/9 下午9:00:00
				var requestTimeArrs = [];
				for(var i = 0,l=historiesData[0].length;i<l;i++){
					requestTimeArrs[i] = new Date(historiesData[0][i]*1000).toLocaleString().replace(/^\D*/,'');
				}
				requestTimeArrs.push(now);
		
				// console.log(historiesData,now);
				monitorsData.forEach((requestData,index,monitorsData)=>{
						plainOptionLs.push({
							name:requestData.metric,
							icon:"rect",
						});
						checkedList.push(requestData.metric)
						if(requestData.value){
							td ++;
						}
						// console.log(td);
						seriesDataSeconedThird.push({
							name:requestData.metric,
				            type:'line',
				            smooth: true,
				            symbol: 'circle',
				            symbolSize: 5,
				            showSymbol: true,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        textStyle: {
		                            color: '#000',
		                            fontSize: 12
		                        }
		                    },
				            data:(function (){
				            	var resData = historiesData[index+1];
				            	resData.push(requestData.value);
				            	return resData;
				            })()
						})
					})
//					console.log(this);
					this.a.computed.handleEcharts(seriesDataSeconedThird,plainOptionLs,requestTimeArrs);
				      /*this.setState({
				      	plainOptionLs,
				      	seriesDataSeconedThird,
				      	td,
				      	xAxisData:requestTimeArrs,
				      })*/
			},
			//echarts
			handleEcharts:(seriesDataSeconedThird,plainOptionLs,xAxisData)=>{
				var self = this;//{a: {…}, myChart: ECharts, timer: 3}
				var barChart2 = document.getElementById("barChart2");
				this.myChart = echarts.init(barChart2);
				var option = {
					 title: {
				        text: "耗水量监控",
				        left:"center",
				        show:false,
				    },
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#283b56'
				            }
				        }
				    },
				    legend: {
				        data:plainOptionLs,
				        formatter:"{name}",
				    },
				    dataZoom: [{
				          show: true,
				          realtime: true,
				          start: 96,
				          end: 100,
				      }, {
				          type: 'inside',
				          realtime: true,
				          start: 96,
				          end: 100,
				      }],
				    xAxis: [
				        {
				            type: 'category',
				            boundaryGap: true,
				            axisTick: {
				                alignWithLabel: true
				            },
				            axisLine:{//x轴的颜色
		                        lineStyle:{
		                            color:'#2a2f43',
		                        }
		                    },
				            data: xAxisData,
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            scale: true,
				            name: "耗水量",
				            axisLabel: {
				                formatter: "{value} m³"
				            },
				            axisLine:{//y轴的颜色
		                        lineStyle:{
		                            color:'#2a2f43',
		                        }
		                    },
		                    splitArea : {show : true},//y轴区域分割
				        }
				    ],
				    series:seriesDataSeconedThird,
				}
				var axisData,requestDatas,self =this,key,now,nowTimeout;
				self.timer = setInterval(function (){
					now = new Date();
					nowTimeout = now.getTime();
					// axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
					axisData = now.toLocaleString().replace(/^\D*/,'');
					// console.log(new Date());
					axios.get("/static/mockData/monitor.json").then((res)=>{
						requestDatas = res.data;
						// console.log(new Date());
						requestDatas.forEach((requestData,index,requestDatas)=>{
						if(option.series){
							 var len = option.series[index].data.length;
							 var last = option.series[index].data[len-1]
								option.series[index].data.shift();
								// option.series[index].data.push(requestData.value+1);//真数据
								option.series[index].data.push(last *1 + 1*1)
								option.series[index].showSymbol=true;
		                    option.series[index].symbolSize=5;
							}
					});
						if(option.series){
							 option.xAxis[0].data.shift();
				    		option.xAxis[0].data.push(axisData);
						}
				    	self.myChart.setOption(option);
				    }).catch((err)=>{
				      console.log(err);
				    })
				}, 15000);
//				console.log(self);//{a: {…}, myChart: ECharts, timer: 3}
				self.myChart.setOption(option);
				
			}
		},
		methods:{
			/*handleclick(){
				console.log("handleclick",this);//没有箭头函数时，this是指：VueComponent {_uid: 35, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
			},*/
			//获取后台数据 
			getDatas:()=>{
				var self = this;
				function getHistoryData(){
					return axios.get("/static/mockData/oneHoursData.json");
				}
				function getMonitorData(){
					return axios.get("/static/mockData/monitor.json");
				}
				axios.all([getMonitorData(),getHistoryData()]).then(
					axios.spread(function(monitors,histories){
//						console.log(self);
						self.a.computed.handleMonitorData(monitors.data,histories.data);
					})
				)
			},
			resizeWorldMapContainer:()=>{
		        var barChart= document.getElementById('barChart2');
		        var barChartWrapper = document.getElementsByClassName('monitor_content')[0];
		        var widthWrapper = window.getComputedStyle(barChartWrapper);
		        // barChart.css("width", width+"px");
		        barChart.style.width = widthWrapper +"px";
		   },
		    handleresize:()=>{
//		    	console.log(this);//{a: {…}, myChart: ECharts, timer: 3}
		        this.a.methods.resizeWorldMapContainer();
		        this.myChart.resize();
		    }
			
		},
		beforeDestroy:()=>{
//			console.log(this);
			//该声明周期不用箭头函数，this是指VueComponent {_uid: 36, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
			//该生命周期函数，用箭头函数时，this是指{a: {…}, myChart: ECharts, timer: 7}
			var self = this;
			window.clearInterval(self.timer);
	        window.removeEventListener('resize', this.handleresize);
	        // self.myChart.dispose();
	        self.myChart.clear();
		}
	})
</script>

<style lang="scss" scoped>
	div#water{
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