import React,{Component} from "react";
import "../style/echarts.css";
import $ from 'jquery';
import echarts from "echarts";
export default class Lines extends Component{
	constructor(props){
		super(props);
		this.state ={

		};
		this.lines = this.lines.bind(this);

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

	lines(){
		const {title,legend,xAxisData,yAxisFormat,seriesDataSeconed,markLine,markPoint} = this.props;
		// console.log(seriesDataSeconed)
		var lines = this.refs.lines;
        this.myCharts = echarts.init(lines);
		var option = {
			color:["#5793f3",'#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			title:{
				text:title,
			},
			legend:{
				data:legend,
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
		    series : seriesDataSeconed
		};
	  this.myCharts.setOption(option);
	}
	componentDidMount(){
		this.lines();
        window.addEventListener('resize', this.handleresize);
	}
	render(){
		return(
			<div className="barChartWrapper">
				<div ref="lines" className="lines"  id="barChart2"></div>
			</div>
		)
	}
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleresize);
    }
}