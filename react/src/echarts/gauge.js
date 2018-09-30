// 仪表盘

import React,{Component} from "react";
import echarts from "echarts";
import axios from "axios";
import $ from 'jquery';
import "../style/echarts.css";
export default class Gauges extends Component{
	constructor(props){
		super(props);
		this.state ={
			curWarnData:undefined,
		}
		this.gauges = this.gauges.bind(this);
		this.requestData = this.requestData.bind(this);

		this.resizeWorldMapContainer = this.resizeWorldMapContainer.bind(this);
        this.handleresize = this.handleresize.bind(this);
	}
	resizeWorldMapContainer() {
        var barChart= $('#barChart2');
        var width = $('.barChartWrapper').width();
        barChart.css("width", width+"px");
    }
    handleresize() {
        this.resizeWorldMapContainer();
        this.myCharts.resize();
    }
	requestData(){
		var datas;
		// axios.get("http://10.100.121.153:9080/maven02/user/yujing").then((res)=>{
		axios.get("./mockData/gauge.json").then((res)=>{
			// console.log(res.data.sum);
			datas = res.data;
			this.setState({
				curWarnData:datas.sum
			})
			this.gauges(datas.sum);
	    }).catch((err)=>{
	      console.log(err);
	    })
	}
	gauges(num){
		const {curWarnData} = this.state;
		// console.log(this.state.curWarnData);
		// console.log(num);
		var gauges = this.refs.gauges;
		this.myCharts = echarts.init(gauges);
		var option={
			title: {
			        text: '蒸气预警',
			        left:"center",
			        top:"10%",
			    },
			// backgroundColor: "#fff",
		    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
		    series: [{
		        name: '蒸气预警',
		        type: 'gauge',
		        // radius:"65%",
		        detail: {
		            formatter: '{value}%'
		        },
		        axisLine: {
		            show: true,
		            lineStyle: {
		                width: 30,
		                shadowBlur: 0,
		                color: [
		                    [0.3, '#67e0e3'],
		                    [0.7, '#37a2da'],
		                    [1, '#fd666d']
		                ]
		            }
		        },
		        data: [{
		            value: Number((num/730000) * 100).toFixed(2),
		            name: '完成率',
		        }]

		    }]
		}
		
		var datas,self=this,i=1;
		this.timerWarn = setInterval(function() {
			// axios.get("http://10.100.121.153:9080/maven02/user/yujing").then((res)=>{
			axios.get("./mockData/gauge.json").then((res)=>{
				datas = (num*1)  + 1000*(i+1);
				option.series[0].data[0].value = Number((datas/730000) * 100).toFixed(2)
				//datas = res.data.sum;
				//option.series[0].data[0].value = Number((datas/730000) * 100).toFixed(2)
				//console.log(datas);
		    }).catch((err)=>{
		      console.log(err);
		    })
		    
		    self.myCharts.setOption(option,true);
		    i++
		}, 10000);

		this.myCharts.setOption(option,true);

		/*function perchange(data){
			var num = data/730000;
			return Number(num * 100).toFixed(2)
		}*/
	}
	componentDidMount(){
		this.requestData();
	}
	componentWillUnmount(){
		var self = this;
		window.clearInterval(self.timerWarn);
		window.removeEventListener('resize', this.handleresize);
	}
	render(){
		return (
		  <div className="barChartWrapper">
			<div ref="gauges" className="gauges" id="barChart2" style={{width:"100%"}}></div>
		  </div>
		)
	}
}