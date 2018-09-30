import React, { Component } from 'react';
import axios from 'axios';
import moment from "moment";
import { Layout, DatePicker, Affix } from 'antd';
import { Link } from 'react-router';

import Head from "../public/header.js";
import Side from '../public/side.js';
import EchartCanvas from '../public/echartCanvas.js';
import "../style/component.css"
const { Content } = Layout;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
export default class GasData extends Component{
	constructor(props){
		super(props);
		this.state = {
    		defaultTime:null,
    		changeTime:null,//时间差
    		xAxisDeviceData:[],//时间轴上的data
    		xAxisDeviceTimeStringData:[],//时间轴上数据，组成的字符串
    		seriesTotalData:null,//总对比的柱状图的数据
    		seriesOneData:null,//设备一的数据
    		seriesTwoData:null,//设备二的数据
    		seriesThreeData:null,//设备三的数据
    		openKeys: ['sub6'],//侧边默认打开第二个二级菜单
    		defaultSelectedKeys:['7'],
    	}
    	this.defaultTime = this.defaultTime.bind(this);
    	this.getRequestData = this.getRequestData.bind(this);
	}
	defaultTime=()=>{
    	var d = new Date();
	    var newTime =d.getFullYear() + "-" +(d.getMonth())+ "-30";
	    var oldTime = d.getFullYear() + "-" +(d.getMonth() + 1-3)+ "-01";
	    this.setState({
    		defaultTime:[moment(oldTime, dateFormat),moment(newTime, dateFormat)],
    	})
    	this.xAxisData([moment(oldTime, dateFormat),moment(newTime, dateFormat)]);
    	this.getRequestData(oldTime,newTime)
    }
    onChange=(value, dateString)=>{
    	this.setState({
			defaultTime:[moment(dateString[0],dateFormat),moment(dateString[1],dateFormat)],
		})
		var oldDate = moment(dateString[0],dateFormat);
		var newDate = moment(dateString[1],dateFormat)
		this.xAxisData([oldDate,newDate]);
		this.getRequestData(dateString[0],dateString[1]);
		
	}
    //设备一、设备二、设备三图表中，x轴上的数据。
	xAxisData(value){//value 是个数组
		var xAxisDeviceData;
		var xAxisDeviceDataDay = [];
		var xAxisDeviceDataMonth = [];
		var xAxisDeviceDataYear = [];
		// console.log(value);
		var oldTimeYear = value[0]._d.getTime();
		var newTimeYear = value[1]._d.getTime();
		var changeTime = (newTimeYear-oldTimeYear)/1000/60/60/24;
		// console.log(changeTime);
		var xAxisDeviceTimeStringData = [];
		if(changeTime>=32 && changeTime <366){
			// console.log("大于等于32");
			var mM = value[0]._d.getMonth()+1;//实际月数-1
			var nM = value[0]._d.getFullYear();
			var dM = value[0]._d.getDate();//2
			var lM = value[1]._d.getMonth()-value[0]._d.getMonth()+1;
			for(var iM = 0;iM<lM;iM++){
				if(mM>12){
					mM = 1;
					nM++;
				}
				xAxisDeviceDataMonth[iM] = nM+"年"+mM +"月";
				if(iM===0){
					xAxisDeviceTimeStringData[0] = nM+"-"+mM+"-"+dM;
				}else{
					xAxisDeviceTimeStringData[iM] = nM+"-"+mM+"-01";
				}
				
				mM++;
			}
			if(value[1]._d.getDate()!=="01"||value[1]._d.getDate()!=="1"){
				xAxisDeviceTimeStringData.push(value[1]._d.getFullYear()+"-"+(value[1]._d.getMonth()+1)+"-"+value[1]._d.getDate())
			}
			xAxisDeviceData = xAxisDeviceDataMonth;
		}else if(changeTime >=366){
			// console.log("大于等于366")
			var mY = value[0]._d.getFullYear();//实际月数-1
			var lY = value[1]._d.getFullYear()-value[0]._d.getFullYear()+1;
			for(var iY = 0;iY<lY;iY++){
				mY++;
				xAxisDeviceDataYear[iY] = mY +"年";
			}
			xAxisDeviceData = xAxisDeviceDataYear
		}else if(changeTime < 32 ){
			var mD =value[0]._d.getDate();
			var nD = value[0]._d.getMonth() + 1;
			var yD = value[0]._d.getFullYear();
			var max;
			if(nD === 1|3|5|7|8|10|12){
				max = 31;
			}else if(nD === 4|6|9|11){
				max = 30;
			}else{
				max = 29
			}
			for(var iD = 0;iD<changeTime + 1;iD++){
				if(mD>=max){
					mD = 1;
					nD++;
				}
				xAxisDeviceDataDay[iD] = nD+"月"+mD+"日";
				xAxisDeviceTimeStringData[iD] = yD+"-"+nD+"-"+mD;
				mD++;
			}
			xAxisDeviceData = xAxisDeviceDataDay;
		}
		this.setState({
			xAxisDeviceData:xAxisDeviceData,
			xAxisDeviceTimeStringData,
		})
	}
     //从后端通过接口获取数据
	getRequestData(start,end){
		var self = this;
		//确定newTimeSeconds的值是所选择的日期的00:00:00
		var newTimeSeconds = new Date(moment(end, dateFormat)._d).getTime()/1000;
	    var oldTimeSeconds = new Date(moment(start, dateFormat)._d).getTime()/1000;

		var device1,device2,device3;//三个接口请求的数据
	    var promise1 = new Promise(function(resolve,reject){
	    	axios.get("/api/query?start="+oldTimeSeconds+"&end="+newTimeSeconds+"&m=none:GS1-AC-Drive01{host=Electricity}").then((res)=>{
		      device1 = res.data[0].dps
		      resolve(device1)
		    }).catch((err)=>{
		      console.log(err);
		    })
		})
		var promise2 = new Promise(function(resolve,reject){
		 axios.get("/api/query?start="+oldTimeSeconds+"&end="+newTimeSeconds+"&m=none:JC.RR5.NAE9.ConfRoom.Padre.Island01{host=Electricity}").then((res)=>{
		      device2=res.data[0].dps
		      resolve(device2)
		    }).catch((err)=>{
		      console.log(err);
		    })
		})
		var promise3 = new Promise(function(resolve,reject){
		    axios.get("/api/query?start="+oldTimeSeconds+"&end="+newTimeSeconds+"&m=none:KMC.BAC-121036CE01{host=Electricity}").then((res)=>{
		     device3 = res.data[0].dps
		     resolve(device3)
		    }).catch((err)=>{
		      console.log(err);
		    })
		})
		//三个promise都运行完之后，执行；而且values则是三个promise中resolve()中的值。   
		Promise.all([promise1,promise2,promise3]).then(function(values){
			/*console.log(values);
			console.log(oldTimeSeconds,newTimeSeconds)*/
			self.getSeriesData(values);
		})  
	}
	//获取三个设备的数据
	getSeriesData(values){
		var self = this;
		var total=[],one=[],two=[],three=[];//四个图表的数据

		var objKeysArray0 = Object.keys(values[0]);
		var l0 = objKeysArray0.length;
		var objKeysArray1 = Object.keys(values[1]);
		var l1 = objKeysArray1.length;
		var objKeysArray2 = Object.keys(values[2]);
		var l2 = objKeysArray2.length;
		// console.log(l1,Object.keys(values[1]).length,Object.keys(values[2]).length)
		//柱状图1总对比的y轴数据
		total.push(values[0][objKeysArray0[l0-1]]-values[0][objKeysArray0[0]])
		total.push(values[1][objKeysArray1[l1-1]]-values[1][objKeysArray1[0]])
		total.push(values[2][objKeysArray2[l2-1]]-values[2][objKeysArray2[0]])
		for(var ti in total){
			if(total[ti]>100) total[ti]=100;//if大于series中的max则，该项等于max
			if(total[ti]<0) total[ti] = 0;//if小于series中的min则，该项等于min
		}
		//其他三个设备的数据--根据横轴上时间获取时间段的数据
		var xAxisDeviceTimeStringData = self.state.xAxisDeviceTimeStringData;//横轴上的时间 日期
		var xAxisDevice1TimeStringData = [];//设备1横轴上的时间戳
		var xAxisDevice2TimeStringData = [];//设备2横轴上的时间戳
		var xAxisDevice3TimeStringData = [];//设备3横轴上的时间戳

		var timeStringLength = xAxisDeviceTimeStringData.length
		for(var i = 0;i<timeStringLength;i++){
			var ruleData = (new Date(xAxisDeviceTimeStringData[i])).getTime()/1000 //每月的1日 00:00:00
			xAxisDevice1TimeStringData[i] = self.changeRuleData(values[0],ruleData);
			xAxisDevice2TimeStringData[i] = self.changeRuleData(values[1],ruleData);
			xAxisDevice3TimeStringData[i] = self.changeRuleData(values[2],ruleData);
		}
		for(var d1 = timeStringLength-1;d1>=1;d1--){
			one.push(values[0][xAxisDevice1TimeStringData[d1]]-values[0][xAxisDevice1TimeStringData[d1-1]]);
			two.push(values[1][xAxisDevice2TimeStringData[d1]]-values[1][xAxisDevice2TimeStringData[d1-1]]);
			three.push(values[2][xAxisDevice3TimeStringData[d1]]-values[2][xAxisDevice3TimeStringData[d1-1]])
		}
		//如果三个设备中某个月数值大于max则等于max，如果小于min则等于min
		var iL = one.length;
		for(var iM=0;iM<iL;iM++){
			if(one[iM]>50)	one[iM]=50;
			if(one[iM]<0)	one[iM] = 0;
			if(two[iM]>50)	two[iM]=50;
			if(two[iM]<0)	two[iM] = 0;
			if(three[iM]>50) three[iM]=50;
			if(three[iM]<0)	three[iM] = 0;
		}
		self.setState({
			seriesTotalData:total,
			seriesOneData:one.reverse(),//设备一的数据
    		seriesTwoData:two.reverse(),//设备二的数据
    		seriesThreeData:three.reverse(),//设备三的数据
		})
	}
	//问题：三个设备获取的时间戳，都是一样的吗？   是一样的
	changeRuleData(values,ruleData){
		var oneKeys = Object.keys(values);
		var oneLength = oneKeys.length;
		var differenceArr = [];//每个时间戳与ruleData差 组成的数组
		var minData = null;//differenceArr中的最小值
		var minDataIndex = null;//最小值在oneKeys中的下标。
		if(oneKeys.indexOf(ruleData.toString())=== -1){
			// console.log("Wang------1---------服役")
			for(var i=0;i<oneLength;i++){
				differenceArr.push(Math.abs(parseInt(ruleData)-parseInt(oneKeys[i])));
			}
			// console.log(differenceArr);
			minData = Math.min.apply( Math, differenceArr );
			minDataIndex = differenceArr.indexOf(minData);
			// console.log(minDataIndex,oneKeys[minDataIndex])
			return parseInt(oneKeys[minDataIndex]);

		}else{
			// console.log("Wang-------------10000")
			return ruleData
		}
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.defaultTime();
	}
	render(){
		return (
			<div>
			    <Head />
			    <Side openKeys={this.state.openKeys} defaultSelectedKeys={this.state.defaultSelectedKeys} />
			    <Content>
				    <div className="title"> 
				      <h2 className="titleH2">电量统计</h2>
					  <Affix offsetTop={0}>
						  <RangePicker className="date"
						      dateRender={(current) => {
						        return (
						          <div className="ant-calendar-date">
						            {current.date()}
						          </div>
						        );
						      }}
						     value={this.state.defaultTime} 
						     onChange={this.onChange}
						  />
					  </Affix>

				    </div>
				    <EchartCanvas xAxisDeviceData={this.state.xAxisDeviceData}
				        seriesTotalData={this.state.seriesTotalData} seriesOneData={this.state.seriesOneData}
				        seriesTwoData={this.state.seriesTwoData} seriesThreeData={this.state.seriesThreeData}
				    />
			    </Content>
			</div>
		)
	}
}

