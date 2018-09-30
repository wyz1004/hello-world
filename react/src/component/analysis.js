import React,{Component} from "react";
import axios from "axios";

import Head from "../public/header.js";
import Side from "../public/side.js";
import Bars from "../echarts/bars.js";
import "../style/component.css";

import { Layout,Spin} from "antd";

const {Content} = Layout;
export default class Analysis extends Component{
	constructor(props){
		super(props);
		this.state={
			openKeys:["sub1"],
			defaultSelectedKeys:['4'],
			timeData:[],//时间
			waterData:[],//水
			gasData:[],//气
			elecData:[],//电
			loading: true,//是否正在加载中   默认显示正在加载中的图标
		}
		this.requestData = this.requestData.bind(this);
	}
	requestData(){// http://10.100.121.128/ssm/sqd/sqdList.do
		var datas,timeData=[],waterData=[],gasData=[],elecData=[] ;
		axios.get("http://10.100.121.153:8010/ssm/sqd/sqdList.do").then((res)=>{
			var datas = res.data;
			datas.map((data,index,datas)=>{
				timeData.push(data.time);
				waterData.push(perchange(data.shui));
				gasData.push(perchange(data.qi));
				elecData.push(perchange(data.dian));
			})
			this.setState({
				timeData,
				waterData,
				gasData,
				elecData,
				loading:false,
			})
			function perchange(data){
				return parseInt(data * 100)

			}
		}).catch((err)=>{
			console.log(err);
			this.setState({
				loading:false,
			})
		})
	}
	componentWillMount(){
		this.requestData();
		perchange("0.2222");
		function perchange(data){
			Number(data * 100).toFixed(2) + "％"
		}
	}
	render(){

		const {timeData,waterData,gasData,elecData} = this.state;
		var name = ["蒸气用量","耗电量","耗水量"];
		var seriesDataSeconed = [{
		        	name:name[0],
		            type:'bar',
		            data:gasData,
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color: 'rgba(104, 253, 255, 0.7)',
						},
					},
		        },{
		        	name:name[1],
		            type:'bar',
		            data:waterData,
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color:'rgba(253, 200, 106, 0.7)',
						},
					},
		        },{
					name:name[2],
		            type:'bar',
		            data:elecData,
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color:'rgba(127, 128, 225, 0.7)',
						},
					},
				}];
		return (
		  <div>
			<Head />
			<Side openKeys={this.state.openKeys} defaultSelectedKeys={this.state.defaultSelectedKeys} />
			<Content>
			  <Spin spinning={this.state.loading}>
			  <div style={{Height:"100%"}}>
			    	{
			    		timeData.length!==0&&elecData.length!==0&&waterData.length!==0&&gasData.length!==0 ? 
			    		<Bars 
						     title="能源分析"
						     legend={name}
						     xAxisData={timeData}
						     yAxisFormat='{value} ％'
						     seriesDataSeconed={seriesDataSeconed}
						     tooltipFormatter='{b} 年<br />{a0} : {c0} %<br />{a1} : {c1} %<br />{a2} : {c2} %<br />'
						  />
						:
						<div className="noData" style={{fontSize:"20px",textAlign:"center",marginTop:"50px"}}>No data</div>
			    	}
			  </div>
			  </Spin>
			</Content>
		  </div>
		)
	}
}