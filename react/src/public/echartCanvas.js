import React,{Component} from "react";
import echarts from "echarts";
import "../style/component.css";
export default class EchartCanvas extends Component{
	constructor(props){
		super(props);
		this.total = this.total.bind(this);
		this.one = this.one.bind(this);
		this.two = this.two.bind(this);
	}
	total(){
		// console.log(this.props.seriesTotalData)
		const seriesTotalData = this.props.seriesTotalData;
		var chartTotal = echarts.init(this.refs.total);
		var option = {
			color:"#5793f3",
			title:{
				text:'总对比'
			},
			legend:{
				data:['总对比']
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
		            data : ['设备一','设备二','设备三'],
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
		                formatter: '{value} m³'
		            }
		        }
		    ],
		    series : [
		        {
		        	name:'总对比',
		            type:'bar',
		            barWidth : 30,//柱图宽度
		            data:seriesTotalData
		        }
		       
		    ]
		};
	  chartTotal.setOption(option);
	}
	one(){
		const xAxisDeviceData = this.props.xAxisDeviceData;
		const seriesOneData = this.props.seriesOneData;
		var chartOne = echarts.init(this.refs.one);
		var option = {
			color:"#5793f3",
			title:{
				text:'设备一'
			},
			tooltip:{
		    	trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        },   	
		    },
		    legend: {
		        data:['设备一']
		    },
		    dataZoom:{
		    	type:'inside',
		    	show:'true',
		    	xAxisIndex:0,
		    	start:0,
		    	end:100,
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : xAxisDeviceData,
		            axisTick: {
		                alignWithLabel: true,
		                interval:0,
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            min:0,
		            axisLabel: {
		                formatter: '{value} m³'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'设备一',
		            type:'bar',
		            barWidth : 20,//柱图宽度
		            data:seriesOneData
		        }
		    ]
		};
		chartOne.setOption(option);
	}
	two(){
		const xAxisDeviceData = this.props.xAxisDeviceData;
		const seriesTwoData = this.props.seriesTwoData;
		var chartTwo = echarts.init(this.refs.two);
		var option = {
			title:{
				text:'设备二'
			},
		    legend: {
		        data:['设备二']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    color:"#5793f3",
		    tooltip:{
		    	trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        },    	
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
		            data : xAxisDeviceData,
		            axisTick: {
		                alignWithLabel: true,
		                interval:0,
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            min:0,
		            axisLabel: {
		                formatter: '{value} m³'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'设备二',
		            type:'bar',
		            barWidth : 20,//柱图宽度
		            data:seriesTwoData
		        }
		    ]
		};
		chartTwo.setOption(option);
	}
	three(){
		const xAxisDeviceData = this.props.xAxisDeviceData;
		const seriesThreeData = this.props.seriesThreeData;
		var chartThree = echarts.init(this.refs.three);
		var option = {
			title:{
				text:'设备三'
			},
		    legend: {
		        data:['设备三']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    color:"#5793f3",
		    tooltip:{
		    	trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        }	    	
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
		            data :xAxisDeviceData,
		            axisTick: {
		                alignWithLabel: true,
		                interval:0,
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            min:0,
		            axisLabel: {
		                formatter: '{value} m³'
		            }

		        }
		    ],
		    series : [
		        {
		            name:'设备三',
		            type:'bar',
		            barWidth : 20,//柱图宽度
		            data:seriesThreeData
		        }
		    ]
		};
		chartThree.setOption(option);
	}
	componentDidMount(){
	}
	componentDidUpdate(){
		this.total();
		this.one();
		this.two();
		this.three();
	}
	render(){
		return (
			<div className="items">
				<div className="item" ref="total"></div>
				<div className="item" ref="one"></div>
				<div className="item" ref="two"></div>
				<div className="item" ref="three"></div>
			</div>
		)
	}
}