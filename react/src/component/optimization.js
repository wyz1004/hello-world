import React,{Component} from "react";
import Head from "../public/header.js";
import Side from "../public/side.js";
import Bars from "../echarts/bars.js";
import "../style/component.css";

import {Layout, Tabs } from "antd";
const {Content} = Layout;
const TabPane = Tabs.TabPane;
export default class Optimizaiton extends Component{
	constructor(props){
		super(props);
		this.state = {
			openKeys:['sub2'],
			defaultSelectedKeys:['2'],
			title:"设备电能优化",
			yAxisFormat:'{value} °',
			legend:["2017年","2018年"],
			xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
			seriesData:[134,125,167,145,139,150,119,168,169,194,154,176],
			seriesDataSeconed:[{
				name:"2017年",
	            type:'bar',
	            barWidth : 30,//柱图宽度
	            data:[134,125,167,145,139,150,119,168,169,194,154,176],
	            itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color: '#9999FF',
						},
					},
			},{
				name:"2018年",
	            type:'bar',
	            barWidth : 30,//柱图宽度
	            data:[34,25,67,45,39,50,19,68,69,94,54,76],
	            itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color:'#CC66FF',
						},
					},
			}]
		}
		this.callback = this.callback.bind(this);
	}
	callback(key){
		// console.log(key);
		if(key == "2"){
			this.setState({
				title:"中医药电能优化",
				yAxisFormat:'{value} °',
				legend:["批次一","批次二"],
				xAxisData:["煎煮","浓缩","纯化","干燥","制剂"],
				seriesData:[134,125,167,145,139],
				seriesDataSeconed:[{
				name:"批次一",
	            type:'bar',
	            barWidth : 30,//柱图宽度
	            data:[134,125,167,145,139],
	            itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color: '#FFCC33',
						},
					},
			},{
				name:"批次二",
	            type:'bar',
	            barWidth : 30,//柱图宽度
	            data:[68,69,94,54,76],
	            itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color: '#99CCFF',
						},
					},
			}]
			})
		}

	}
	render(){
		return (
			<div>
				<Head />
				<Side openKeys={this.state.openKeys} defaultSelectedKeys={this.state.defaultSelectedKeys}/>
				<Content>
				    <div style={{minHeight:"200px"}}>
				      <Tabs onChange={this.callback}>
						<TabPane tab="公共设备" key="1">
						  <Bars 
						      title = {this.state.title}
						      legend = {this.state.legend}
						      xAxisData = {this.state.xAxisData}
						      yAxisFormat = {this.state.yAxisFormat}
						      tooltipFormatter="{b} <br />{a0} : {c0} °<br />{a1} : {c1} °"
						      seriesDataSeconed = {this.state.seriesDataSeconed}
						  />
						</TabPane>
						<TabPane tab="中医药设备" key="2">
						  <Bars 
						      title = {this.state.title}
						      legend = {this.state.legend}
						      xAxisData = {this.state.xAxisData}
						      yAxisFormat = {this.state.yAxisFormat}
						      tooltipFormatter="{b} <br />{a0} : {c0} °<br />{a1} : {c1} °"
						      seriesDataSeconed = {this.state.seriesDataSeconed}
						  />
						</TabPane>
					  </Tabs>
				    </div>
				</Content>
			</div>
		)
	}


	/*<div className="title">
				      <h2>能源优化</h2>
				    </div>*/
}