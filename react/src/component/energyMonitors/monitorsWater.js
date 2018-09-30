import React,{Component} from "react";
import{Router,Route,hashHistory} from "react-router";
import axios from "axios";
import echarts from "echarts";
import {Layout,Menu} from "antd";
import "./energyMonitors.css";
import "../../style/echarts.css";
import Head from "../../public/header.js";
import Side from "../../public/side.js";
const {Content} = Layout;

export default class MonitorsWater extends Component{
	constructor(props){
		super(props);
		this.state = {
			openKeys:["sub1"],
			defaultSelectedKeys:['1'],
			current: 'water',//默认的打开水的能源实时监控
			title:"设备电能优化",
			yAxisFormat:'{value} °',
			legend:["2017年","2018年"],
			seriesDataSeconedThird:[],
		    plainOptionLs:[],//所有的选项
		    td:0,//有几条数据
		    xAxisData:[],//echarts中x轴的数据
		}
		this.handleClick = this.handleClick.bind(this);
		this.resizeWorldMapContainer = this.resizeWorldMapContainer.bind(this);
        this.handleresize = this.handleresize.bind(this);
	}
	handleClick=(e)=>{
		console.log('click ', e);
		if(e.key == "water"){
			hashHistory.push({
				pathname: '/energyMonitors/water'//返回当前页面
			})
		}else if(e.key=="steam"){
			hashHistory.push({
				pathname: '/energyMonitors/steam'//返回当前页面
			})
		}else if(e.key=="electricity"){
			hashHistory.push({
				pathname: '/energyMonitors/electricity'//返回当前页面
			})
		}
		this.setState({
	      current: e.key,
	    });
	}
	resizeWorldMapContainer() {
        var barChart= document.getElementById('barChart2');
        var barChartWrapper = document.getElementsByClassName('barChartWrapper')[0];
        var widthWrapper = window.getComputedStyle(barChartWrapper);
        // barChart.css("width", width+"px");
        barChart.style.width = widthWrapper +"px";
    }
    handleresize() {
        this.resizeWorldMapContainer();
        this.myCharts.resize();
    }
	componentDidMount(){
		this.getDatas();
		window.addEventListener('resize', this.handleresize);
	}
	componentWillUnmount(){
		var self = this;
		window.clearInterval(self.timer);
        window.removeEventListener('resize', this.handleresize);
        // self.myCharts.dispose();
        self.myCharts.clear();
	}
	//获取后台数据 
	getDatas(){
		var self = this;
		function getHistoryData(){
			return axios.get("./mockData/oneHoursData.json");
		}
		function getMonitorData(){
			return axios.get("./mockData/monitor.json");
		}
		axios.all([getMonitorData(),getHistoryData()]).then(
			axios.spread(function(monitors,histories){
				// console.log(monitors,histories,)
				self.handleMonitorData(monitors.data,histories.data);
			})
		)
	}
	//处理和合并数组
	handleMonitorData(monitorsData,historiesData){
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
			this.handleEcharts(seriesDataSeconedThird,plainOptionLs,requestTimeArrs);
		      this.setState({
		      	plainOptionLs,
		      	seriesDataSeconedThird,
		      	td,
		      	xAxisData:requestTimeArrs,
		      })
	}
	//echarts
	handleEcharts(seriesDataSeconedThird,plainOptionLs,xAxisData){
		// var {seriesDataSeconedThird,plainOptionLs,xAxisData,td} = this.state;
		var self = this;
		var monitors = this.refs.monitors;
		this.myCharts = echarts.init(monitors);
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
		this.timer = setInterval(function (){
			now = new Date();
			nowTimeout = now.getTime();
			// axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
			axisData = now.toLocaleString().replace(/^\D*/,'');
			// console.log(new Date());
			axios.get("./mockData/monitor.json").then((res)=>{
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
		    	self.myCharts.setOption(option);
		    }).catch((err)=>{
		      console.log(err);
		    })
		}, 15000);
		self.myCharts.setOption(option);
	}
	render(){
		return (
			<div className="monitorsWater">
			<Head />
			<Side defaultSelectedKeys={this.state.defaultSelectedKeys} openKeys={this.state.openKeys} />
			<Content>
				<Menu
			        onClick={this.handleClick}
			        selectedKeys={[this.state.current]}
			        mode="horizontal"
			        className="monitorsNav"
			      >
					<Menu.Item key="water">水量监控</Menu.Item>
			        <Menu.Item key="steam">水蒸气监控与预警</Menu.Item>
			        <Menu.Item key="electricity">电量监控</Menu.Item>
		        </Menu>
		        <div className="barChartWrapper">
					<div ref="monitors" className="monitors" id="barChart2" style={{width:"100%"}}></div>
				</div>
			</Content>
			</div>
		)
	}
}
