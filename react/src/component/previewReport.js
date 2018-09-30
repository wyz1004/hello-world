import React,{Component} from "react";
import axios from "axios";
import moment from "moment";
import{Router,Route,hashHistory} from "react-router";

import {Layout, Table, Affix,Spin, Modal } from "antd";
import Head from "../public/header.js";
import Side from "../public/side.js";
import Lines from "../echarts/lines.js";
import Pies from "../echarts/pies.js";
import Bars from "../echarts/bars.js";
import previewReport from "../style/previewReport.css"
// import "../style/previewReport.css"
import "../style/public.css";
const {Content}  = Layout;
const dateFormat = 'YYYY-MM-DD h:mm:ss';
export default class PreviewReport extends Component{
	constructor(props){
		super(props);
		this.state = {
			openKeys: ['sub5'],//侧边默认打开第二个二级菜单
			reportData:[],
			loading: true,//是否正在加载中   默认显示正在加载中的图标
			visible: false,//是否显示modal  默认不显示modal
		}
		this.requestData = this.requestData.bind(this);
		this.submt = this.submt.bind(this);
		this.tableToExcel = this.tableToExcel.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleContent = this.handleContent.bind(this);
		this.handleContentTable = this.handleContentTable.bind(this);
		this.handleContentLine = this.handleContentLine.bind(this);
		this.handleContentPie = this.handleContentPie.bind(this);
		this.handleContentBar = this.handleContentBar.bind(this);
		this.handlePeriodData = this.handlePeriodData.bind(this);
		this.noOthersData = this.noOthersData.bind(this);
		this.handleBackClick = this.handleBackClick.bind(this);
		this.timestampToTime = this.timestampToTime.bind(this);
	}
	requestData(){
		/*var objEcharts = {//图表类型
			"1":"饼状图",
			"0":"柱状图",
			"2":"报表数据",
			"3":"折线图",
		}*/
		var self =this;
		
		var idValue = this.props.params.id;
		var urlQuery = this.props.location.query;
		var objPeriodTimes={
		  		"年":"0",
				"季度":"1",
				"月":"2",
				"日":"3",
				"天":"3",
		  	};
		for(var i in objPeriodTimes){
			if(urlQuery.period === i){
				urlQuery.period = objPeriodTimes[i];
			}
		}
		// var timer = setInterval(function(){
			// window.location.reload()
		//报表的数据接口
		  if(urlQuery.picType === "2"){
		  	//console.log(urlQuery.startTime,urlQuery.endTime);
		  	//console.log(urlQuery.deviceId,urlQuery.deviceName,urlQuery.startTime,urlQuery.endTime)
		  	var str="?utilitiesId="+urlQuery.deviceId+"&utilitiesMetris="+urlQuery.deviceName+"&utilitiesStarttime="+urlQuery.startTime+"&utilitiesEndtime="+urlQuery.endTime;
			axios.get("http://10.100.121.153:8010/ssm/tsdb/saveUrlOrToList.do"+str).then((res)=>{
				// console.log("wang")
				console.log(res.data);
				if(res.data.length!==0){
					self.setState({
						reportData:res.data,
						loading:false,
					})
					// clearInterval(timer);
				}else{
					//当初次加载表格，res.data为空（代表有数据，但是从后端获取过来有个过程，这过程中为空）时，再重新调用一次接口，做到局部刷新。
					console.log("[]");
					axios.get("http://10.100.121.153:8010/ssm/tsdb/saveUrlOrToList.do"+str).then((res)=>{
						self.setState({
							reportData:res.data,
							loading:false,
						})
						console.log("successSecond")
					}).catch((err)=>{
						console.log(err);
					})
					

				}
			}).catch((err)=>{
				console.log(err);
				self.setState({
					loading:false,
				})
			})
		  }else{
		  	//柱状图、折线图、饼状图的数据接口
		  	var strStr = "?utilitiesMetris="+urlQuery.deviceName+"&utilitiesStarttime="+urlQuery.startTime/1000+"&utilitiesEndtime="+urlQuery.endTime/1000+"&utilitiesZyn="+urlQuery.period;
		  	axios.get("http://10.100.121.153:8010/ssm/tsdb/getNyrToList.do"+strStr).then((res)=>{
				if(res.data.length!==0){
					self.setState({
						reportData:res.data,
						loading:false,
					})
					// clearInterval(timer);
				}else{
					self.setState({
						loading:false,
					})
				}
			}).catch((err)=>{
				console.log(err);
				self.setState({
					loading:false,
				})
			})
		  }
		// },2000)
	}
	componentDidMount(){
		this.requestData();//获取数据
	}
	showModal(){
	    this.setState({
	      visible: true,
	    });
	}
	handleOk(e){
	    this.setState({
	      visible: false,
	    });
	    this.tableToExcel();
	}
	handleCancel(e){
	    this.setState({
	      visible: false,
	    });
	}
	//导出部分代码
	submt(){
		document.getElementById('submit').value="";
	}
	tableToExcel(){//http://www.w3.org/TR/REC-html40
		var tableToExcel = (function () {//https://www.w3.org/TR/html401/
	        var uri = 'data:application/vnd.ms-excel;base64,'
	        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/html401"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
	        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
	        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
	        return function (table, name) {
	            // if (!table.nodeType) table = document.getElementsByClassName("tables tableExcel")[0];
	            if (!table.nodeType) table = document.getElementById("tableExcel");
	            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
	 
	            document.getElementById("dlink").href = uri + base64(format(template, ctx));
	            document.getElementById("dlink").download = document.getElementById('submit').value+'.xls';
	            document.getElementById("dlink").click();
	 
	        }
	    })()

	    return tableToExcel('tablename', 'name', 'zhangsan.xls')
    }
    handleContent(){
    	var query = this.props.location.query;//{picType: "1", type: "1"}
    	var objTable = {//报表类型
			"1":"水电气表",
			"0":"蒸汽表",
		}
		for(var i in objTable){
			if(query.type === i){
				query.type = objTable[i]
			}
		}
		/*var objEcharts = {//图表类型
			"1":"饼状图",
			"0":"柱状图",
			"2":"报表数据",
			"3":"折线图"
		}*/
    	if(query.picType==="1"){
    		return this.handleContentPie(query.type,query.period);
    	}else if(query.picType==="0"){
    		return this.handleContentBar(query.type,query.period);
    	}else if(query.picType==="2"){
    		return this.handleContentTable(query.type);
    	}else if(query.picType==="3"){
    		return this.handleContentLine(query.type,query.period);
    	}
    }
    noOthersData(){
    	return (
	    		<Content>
					<div className="tabxls"  style={{fontSize:"20px",textAlign:"center",marginTop:"50px"}}>
					  没有多余的数据
					</div>
				</Content>
	    	) 
    }
    //柱状图
    handleContentBar(name,period){
    	var reportsData = this.state.reportData;
    	var xAxisData =[];
    	var seriesData = [];
    	var datas=null;
    	var seriesDataSeconed=[];
    	if(reportsData.length!== 0){
    		datas=this.handlePeriodData(period,reportsData);
    		/*{
    			"datatimes":reportsDataTimes,
    			"datanums":reportsDataNums
    		}*/
	    	xAxisData = datas.datatimes;
	    	seriesData=datas.datanums;

	    	seriesDataSeconed={
	    		name:name,
		        type:'bar',
		        barWidth :20,//柱图宽度
		        data:seriesData,
	    	}
	    	return (
	    		<div>
					<div className="tabxls">
					  <Bars 
					     title={name} 
					     legend={[name]}
					     xAxisData={xAxisData}
					     yAxisFormat='{value} m³'
					     seriesDataSeconed={seriesDataSeconed}
					  />
					</div>
				</div>
	    	)
    	}else{
    		return this.noOthersData();
    	}
    }
    //折线图
    handleContentLine(name,period){
    	var reportsData = this.state.reportData;
    	var xAxisData =[];
    	var seriesData = [];
    	var datas=null;
    	var markPoint={
            	data:[
            	  {
				     name: '最大值',
				     type: 'max'
				  },{
				     name: '最小值',
				     type: 'min'
				  }
            	]
            }
        var markLine={
            	data:[
            	  {
				     name: '平均值',
				     type: 'average'
				  }, 
            	]
            }


    	if(reportsData.length!== 0){
    		datas=this.handlePeriodData(period,reportsData);
    		/*{
    			"datatimes":reportsDataTimes,
    			"datanums":reportsDataNums
    		}*/
	    	xAxisData = datas.datatimes;
	    	seriesData = datas.datanums;
	    	var seriesDataSeconed = [{
	    		name:name,
		        type:'line',
		        barWidth :20,//柱图宽度
		        data:seriesData,
		        markPoint:markPoint,
		        markLine:markLine
	    	}]
	    	return (
	    		<div>
					<div className="tabxls">
					  <Lines 
					     title={name} 
					     legend={[name]}
					     xAxisData={xAxisData}
					     yAxisFormat='{value} m³'
					     seriesDataSeconed={seriesDataSeconed}
					  />
					</div>
				</div>
	    	)
    	}else{
    		return this.noOthersData();
    	}
    }
    //图表
    handleContentTable(){
    	var reportsData = this.state.reportData; 
    	for(var i in reportsData){
    		reportsData[i].key = i*2/2+1;
    		// reportsData[i].time = moment(reportsData[i].time).format(dateFormat)
    		reportsData[i].time = this.timestampToTime(reportsData[i].time);
    	}
    	var columns= [
    	    {
    	      title: '',
			  dataIndex: 'key',
			  key: 'key',
			  width:50,
			},
			{
    	      title: '设备名称',
			  dataIndex: 'metric',
			  key: 'metric',
			  width:100,
			},
			{
    	      title: '属性名称',
			  dataIndex: 'host',
			  key: 'host',
			  width:100,
			},
			{
    	      title: '时间',
			  dataIndex: 'time',
			  key: 'time',
			  width:150,
			},
			{
    	      title: '属性值',
			  dataIndex: 'value',
			  key: 'value',
			  width:150,
			},
    	]
    	return (
    		<div>
				<table id="tableExcel" 
				           width="90%" 
				           className="tables table-hover"
				           border="1" 
				    >  
				    <thead>
				    <tr>  
				        <th width="100"></th>  
				        <th width="200">设备名称</th>  
				        <th width="200">属性名称</th>  
				        <th width="250">时间</th>
				        <th>属性值</th>
				    </tr>
				    </thead>
				    <tbody>
				    {
				    	reportsData.length!==0?reportsData.map((reportData,index,reportsData)=>{
							return (
								<tr key={index}>  
							        <td width="100">{index+1}</td>  
							        <td width="200">{reportData.metric}</td>  
							        <td width="200">{reportData.host}</td>  
							        <td width="250">{reportData.time}</td> 
							        <td>{reportData.value}</td>
							    </tr>
							)
						})
						: (<tr><td colSpan="5">没有数据</td></tr>)
				    } 
				    </tbody>
				</table>
				<Affix offsetTop={0}>
			 {
			 	reportsData.length !== 0 ? 
				  <div className="exportExcel">
				    <a id="dlink" style={{display:"none"}}></a>
					<input type="button" 
					       className="btn btn-primary center-block" 
					       onClick={this.showModal} 
					       value="导出excel" 
					/>
					<Modal
					  className="previewReportModal"
			          title="请输入名称"
			          width="300px"
			          height="100%"
			          visible={this.state.visible}
			          onOk={(e)=>this.handleOk(e)}
			          onCancel={(e)=>this.handleCancel(e)}
			          cancelText="取消"
			          okText="确认"
			        >
			          <input type="text" 
					       name="" 
					       className="named" 
					       id="submit" 
					       onClick={this.submt} 
					       autoFocus="autofocus"
					       defaultValue="请输入名字"
					  />
			        </Modal>
				  </div>
				 :
				   null
				}
				  </Affix>
			</div>
    	)
    }
    //饼状图
    handleContentPie(name,period){
    	var reportsData = this.state.reportData;
    	var xAxisData =[];
    	var seriesData = [];
    	var objectDataNums = [];
    	var datas=null;
    	if(reportsData.length !==0){
    		datas=this.handlePeriodData(period,reportsData);
    		/*{
    			"datatimes":reportsDataTimes,
    			"datanums":reportsDataNums
    		}*/
	    	xAxisData = datas.datatimes;
	    	objectDataNums = datas.datanums;
	    	objectDataNums.map((objectDataNum,index,objectDataNums)=>{
	    		seriesData.push({
	    			"value":objectDataNum,
	    			"name":xAxisData[index]
		    	});
	    	})
	    	
	    	return (
	    		<div>
					<div className="tabxls">
					  <Pies 
					     title={name} 
					     legend={xAxisData}
					     xAxisData={xAxisData}
					     yAxisFormat='{value} m³'
					     seriesData={seriesData}
					  />
					</div>
				</div>
	    	)
    	}else{
    		return this.noOthersData();
    	}
    }

    //柱状图、折线图、饼状图的显示-------横轴时间的转换
    handlePeriodData(period,reportsData){
    	var l = reportsData.length;
    	var reportsDataTimes=reportsData.slice(0,l/2);
    	var reportsDataNums=reportsData.slice(l/2);
    	if(period === "年"|| period === "0"){
    		//年
    		reportsDataTimes.map((reportsDataTime,index,reportsDataTimes)=>{
    			reportsDataTimes[index]=reportsDataTime.slice(0,4);
    		})
    		return {
    			"datatimes":reportsDataTimes,
    			"datanums":reportsDataNums
    		}
    	}else if(period === "季度"|| period === "1"){
    		//季度
    		reportsDataTimes.map((reportsDataTime,index,reportsDataTimes)=>{
    			var y = reportsDataTime.slice(0,4);
    			var m = reportsDataTime.slice(5,7);
    			if(m.indexOf("1")||m.indexOf("2")||m.indexOf("3")){
    				m = "第一季度"
    			}else if(m.indexOf("4")||m.indexOf("5")||m.indexOf("6")){
    				m = "第二季度"
    			}else if(m.indexOf("7")||m.indexOf("8")||m.indexOf("9")){
    				m = "第三季度"
    			}else if(m==="10"||m==="11"||m==="12"){
    				m = "第四季度"
    			}
    			reportsDataTimes[index] = m;
    		})
    		return {
    			"datatimes":reportsDataTimes,
    			"datanums":reportsDataNums
    		}
    	}else if(period === "月"|| period === "2"){
    		//月
    		reportsDataTimes.map((reportsDataTime,index,reportsDataTimes)=>{
    			var y = reportsDataTime.slice(0,4);
    			var m = reportsDataTime.slice(5,7);
    			reportsDataTimes[index]= y+"年"+m+"月";
    		})
    		return {
    			"datatimes":reportsDataTimes,
    			"datanums":reportsDataNums
    		}
    	}else if(period === "日"||period === "天"|| period === "3"){
    		//日
    		reportsDataTimes.map((reportsDataTime,index,reportsDataTimes)=>{
    			var s = reportsDataTime.slice(8);
    		})
    		return {
    			"datatimes":reportsDataTimes,
    			"datanums":reportsDataNums
    		}
    	}
    }

    //将时间戳转换为日期时间格式--------表格中
    timestampToTime(timestamp) {
        // var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        if(h>=0 && h<10){
        	h = "0"+date.getHours() + ':';
        }
        if(m>=0 && m<10){
        	m = "0"+date.getMinutes() + ':';
        }
        if(s>=0 && s<10){
        	s = "0"+date.getSeconds();
        }
        return Y+M+D+h+m+s;
    }
    //返回到列表管理页面---点击返回按钮
    handleBackClick(){
    	hashHistory.push({
            pathname: '/reportManagement',//返回当前页面
         })
    }
	render(){
		return (
			<div className="previewReport.previewReport" id="previewReport">
			  <Head />
			  <Side openKeys={this.state.openKeys} />
			  <Content className="content">
				  	<div className="title">
					  <h2>预览报表</h2>
			          <div className="back" onClick={this.handleBackClick}>返回</div>
					</div>
				  <Spin spinning={this.state.loading}>
				 	 {this.handleContent()}
				  </Spin>
			  </Content>
			  
			</div>
		)
	}
}


/*<table id="tableExcel" 
			           width="90%" 
			           className="tables table-hover"
			           border="1" 
			    >  
				    <tbody>
				    <tr>  
				        <td width="50"></td>  
				        <td width="100">设备名称</td>  
				        <td width="100">属性名称</td>  
				        <td width="150">时间</td>
				        <td width="100">属性值</td>
				    </tr>
				    {
				    	reportsData.length!==0?reportsData.map((reportData,index,reportsData)=>{
							return (
								<tr key={index}>  
							        <td>{index+1}</td>  
							        <td>{reportData.metric}</td>  
							        <td>{reportData.host}</td>  
							        <td>{moment(reportData.time).format(dateFormat)}</td> 
							        <td>{reportData.value}</td>
							    </tr>
							)
						})
						: (<tr><td colSpan="5">没有数据</td></tr>)
				    } 
				    </tbody>
				</table>*/
/*
<Table 
				  dataSource={reportsData} 
				  columns={columns} 
				  bordered
				  pagination={false}
				  scroll={{ y: 450 }}
				  className="tables tableExcel"
				 />

			 <Affix offsetTop={0}>
			 {
			 	reportsData.length !== 0 ? 
				  <div className="exportExcel">
				    <a id="dlink" style={{display:"none"}}></a>
					<input type="button" 
					       className="btn btn-primary center-block" 
					       onClick={this.showModal} 
					       value="导出excel" 
					/>
					<Modal
					  className="previewReportModal"
			          title="请输入名称"
			          width="300px"
			          height="100%"
			          visible={this.state.visible}
			          onOk={(e)=>this.handleOk(e)}
			          onCancel={(e)=>this.handleCancel(e)}
			          cancelText="取消"
			          okText="确认"
			        >
			          <input type="text" 
					       name="" 
					       className="named" 
					       id="submit" 
					       onClick={this.submt} 
					       autoFocus="autofocus"
					       defaultValue="请输入名字"
					  />
			        </Modal>
				  </div>
				 :
				   null
				}
				  </Affix>
*/