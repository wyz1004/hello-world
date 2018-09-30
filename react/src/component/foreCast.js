import React,{Component} from "react";
import Head from "../public/header.js";
import Side from "../public/side.js";
import echarts from "echarts";
import { Tabs } from 'antd';
import Lines from "../echarts/lines.js";
import "../style/component.css";
import "../style/foreCast.css"

import { Layout} from "antd";

const {Content} = Layout;
const TabPane = Tabs.TabPane;

export default class ForeCast extends Component{
	constructor(props){
		super(props);
    this.state = {
			defaultSelectedKeys:['3'],  
      openKeys:null,//侧边默认打开第二个二级菜单
			title:"水蒸气用量预测",
			yAxisFormat:'{value} °',
			legend:["2017年用水蒸气量","2018年用水蒸气量"],
			xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
			seriesDataSeconed:[{
				name:"2017年用水蒸气量",
	            type:'line',
              // barWidth : 30,//柱图宽度
	            data:[134,125,167,145,139,150,119,168,169,194,154,176],
			},{
				name:"2018年用水蒸气量",
	            type:'line',
              // barWidth : 30,//柱图宽度
              color:'#FA8072',
	            data:[34,25,67,45,39,50,19,68,69,94,54,76],
			}]
		}
		this.callback = this.callback.bind(this)
	}
	callback(key){
		// console.log("ding ==",key)
		if(key=="2"){
			this.setState ({
				title:"电量预测",
				yAxisFormat:'{value} °',
				legend:["2017年用电量","2018年用电量"],
				xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				seriesDataSeconed:[{
					name:"2017年用电量",
					type:'line',
					// barWidth : 30,//柱图宽度
					data:[78,75,125,105,99,59,39,120,124,134,100,100],
				},{
					name:"2018年用电量",
					type:'line',
					// barWidth : 30,//柱图宽度
					color:'#FA8072',
					data:[34,25,67,45,39,50,19,68,69,94,54,76],
				}]
			})
		}else if(key == "3"){
			this.setState ({
				title:"燃气量预测",
				yAxisFormat:'{value} °',
				legend:["2017年燃气量","2018年燃气量"],
				xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				seriesDataSeconed:[{
					name:"2017年燃气量",
					type:'line',
					// barWidth : 30,//柱图宽度
					data:[78,75,125,105,99,59,39,120,124,134,100,100],
				},{
					name:"2018年燃气量",
					type:'line',
					// barWidth : 30,//柱图宽度
					color:'#FA8072',
					data:[34,25,67,45,39,50,19,68,69,94,54,76],
				}]
			})
		}
	}
	/*componentWillMount(){
		var pathname = this.props.location.pathname;
		if(pathname == "/optimization"){
			this.setState({
				openKeys:['sub2']
			})
		}else if(pathname == "/warn"){
			this.setState({
				openKeys:['sub4']
			})
		}else if(pathname == "/forecast"){
			this.setState({
				openKeys:['sub3']
			})
		}
	}*/
	render(){
		return (
		  <div>
			<Head />
			<Side openKeys={this.state.openKeys} defaultSelectedKeys={this.state.defaultSelectedKeys} />
			<Content>
      <Tabs defaultActiveKey="1" onChange={this.callback} style={{fontWeight:"700"}}>
        <TabPane tab="水蒸汽预测" key="1">
            <Lines 
					     title = {this.state.title}
               legend = {this.state.legend}
               xAxisData = {this.state.xAxisData}
               yAxisFormat = {this.state.yAxisFormat}
               seriesData = {this.state.seriesData}
               seriesDataSeconed = {this.state.seriesDataSeconed}
					  />
        </TabPane>
        <TabPane tab="电量预测" key="2" onClick>
            <Lines 
					     title = {this.state.title}
               legend = {this.state.legend}
               xAxisData = {this.state.xAxisData}
               yAxisFormat = {this.state.yAxisFormat}
               seriesData = {this.state.seriesData}
               seriesDataSeconed = {this.state.seriesDataSeconed}
					  />
        </TabPane>
        <TabPane tab="燃气量预测" key="3">
            <Lines 
					     title = {this.state.title}
               legend = {this.state.legend}
               xAxisData = {this.state.xAxisData}
               yAxisFormat = {this.state.yAxisFormat}
               seriesData = {this.state.seriesData}
               seriesDataSeconed = {this.state.seriesDataSeconed}
					  />
        </TabPane>
      </Tabs>
			</Content>
		  </div>
		)
	}
}