import React,{Component} from "react";
import echarts from "echarts";
import '../style/echarts.css';

export default class Pies extends Component{
	constructor(props){
		super(props);
		this.state= {

		}
		this.pies = this.pies.bind(this);
	}
	pies(){
		const {title,xAxisData,seriesData} = this.props;
		var pies = this.refs.pies;
		var myCharts = echarts.init(pies);
		var option = {
			    title : {
			        text: title,
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'left',
			        data: xAxisData,
			    },
			    series : [
			        {
			            name: title,
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:seriesData,
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};
			myCharts.setOption(option);
	}
	componentDidMount(){
		this.pies();
	}
	render(){
		return (
          <div ref="pies" className="pies" ></div>
		)
	}
}