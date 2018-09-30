import React,{Component} from "react";
import "../style/echarts.css";
import $ from 'jquery';
import echarts from "echarts";

export default class Bars extends Component{
	constructor(props){
		super(props);
		this.state = {

		};
		this.bars = this.bars.bind(this);

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

	bars(){
		// var len = this.props.legend?this.props.legend[0]:null;
		const {title,legend,xAxisData,yAxisFormat,seriesDataSeconed,tooltipFormatter} = this.props;
		
		// console.log(title,legend,xAxisData,yAxisFormat,seriesData);
		var bars = this.refs.bars;
		this.myCharts = echarts.init(bars);
		var option = {
			color:["#5793f3",'#c23531','#2f4554'],
			title:{
				text:title,
			},
			legend:{
				data:legend,
                top: '0',
			},
		    tooltip:{
		    	trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        },
                formatter: tooltipFormatter?tooltipFormatter:null
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
		            data : xAxisData,
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
		                formatter: yAxisFormat
		            }
		        }
		    ],
		    series : seriesDataSeconed,
		};
		this.myCharts.setOption(option);
	}
	componentDidMount(){
		this.bars();
		window.addEventListener('resize', this.handleresize);
	}
	render(){
		return (
		<div className="barChartWrapper">
			<div ref="bars" className="bars" id="barChart2"></div>
		</div>

		)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleresize);
	}
}