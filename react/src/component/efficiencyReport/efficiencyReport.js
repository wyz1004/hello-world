import React,{Component} from "react";
//引入组件
import Head from "../../public/header.js";
import Side from "../../public/side.js";

//引入样式表
import "./efficiencyReport.css";
//引入antd的组件
import {Layout,Button} from "antd";
const {Content} = Layout;
const inputFname = document.getElementsByClassName("fname");
const defaultName = document.getElementsByClassName("defaultName");
export default class EfficiencyReport extends Component{
	constructor(props){
		super(props);
		this.state={
			openKeys:["sub2"],
			defaultSelectedKeys:['8'],
			defaultTime:"",
		}
		//绑定this
		this.handleEditeButton = this.handleEditeButton.bind(this);
		this.handleSaveButton = this.handleSaveButton.bind(this);
		this.handleDefaultTime = this.handleDefaultTime.bind(this);
	}
	componentDidMount(){
		this.handleDefaultTime();
	}
	handleDefaultTime(){
		var d = new Date(),y,m,d;
		y = d.getFullYear();
		m = d.getMonth() +1;
		d = d.getDay();
		this.setState({
			defaultTime:y+"-"+m+"-"+d,
		})

	}

	handleSaveButton(){
		console.log("save");
		// console.log(inputFname,defaultName);
		for(var i = 0;i<inputFname.length;i++){
			inputFname[i].style.display = "none";
			defaultName[i].style.display = "block";
			defaultName[i].innerHTML = inputFname[i].value;
		}
	}
	handleEditeButton(){
		console.log("edit");
		// console.log(inputFname,defaultName);
		for(var i = 0;i<inputFname.length;i++){
			defaultName[i].style.display = "none";
			inputFname[i].style.display = "block";
		}
	}
	render(){
		return (
			<div>
				<Head />
				<Side defaultSelectedKeys={this.state.defaultSelectedKeys} openKeys={this.state.openKeys} />
				<Content className="effiencyReport">
				<div className="efficiencyReportTitle">
					<h3>批次能效报表</h3>
					<div className="editeExportBtn">
						<Button type="primary" style={{marginRight:16}}
			              onClick={this.handleEditeButton}
			             >编辑</Button>
			             <Button type="primary" style={{marginRight:16}}
			              onClick={this.handleSaveButton}
			             >保存</Button>
			             <Button type="primary" style={{marginRight:0}}
			              onClick={this.handleEditeButton}
			             >导出</Button>
		            </div>
				</div>
				
					<table className="wrapperTable">
						<thead>
							<tr style={{"background":"gray"}}>
								<th colSpan={6} style={{"textAlign":'center',"fontSize":"16px"}}>批次能效报表</th>
							</tr>
							<tr style={{"background":"gray"}}>
								<td colSpan={6} style={{"textAlign":'left'}}>中药制药能效管理系统</td>
							</tr>
							<tr style={{"paddingRight":"20px"}}>
								<td colSpan={6} style={{"textAlign":'right',"paddingRight":"20px"}}>
									<span>批次号：</span>
									<span>CDBC</span>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colSpan={6} style={{"padding":"20px"}}>
									<table border="true" className="outerTable" width="100%">
										<tbody>
											<tr>
												<td width="16%">产品名称</td>
												<td width="16%"><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
												<td width="9%">生产批号</td>
												<td width="8%"><input ref="fname" className="fname" type="text" name="fname" /><span className="defaultName">中央空调</span></td>
												<td width="8%">规格</td>
												<td width="8%"><input ref="fname" className="fname" type="text" name="fname" /><span className="defaultName">中央空调</span></td>
											</tr>
											<tr>
												<td>生产前检查</td>
												<td><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
												<td colSpan={2}>下达生产指令文号</td>
												<td colSpan={2}><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
											</tr>
											<tr>
												<td>执行文件标准号</td>
												<td><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
												<td colSpan={2}>物料</td>
												<td colSpan={2}><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
											</tr>
											<tr>
												<td>设备、岗位SOP号</td>
												<td><input type="text" name="fname" /></td>
												<td colSpan={2}>品种</td>
												<td colSpan={2}><input type="text" name="fname" /></td>
											</tr>
											<tr>
												<td>清洗、清场SOP号</td>
												<td><input type="text" name="fname" /></td>
												<td colSpan={2}>数量</td>
												<td colSpan={2}><input type="text" name="fname" /></td>
											</tr>
											<tr>
												<td>各种记录表格</td>
												<td><input type="text" name="fname" /></td>
												<td colSpan={2}>合格证</td>
												<td colSpan={2}><input type="text" name="fname" /></td>
											</tr>
											<tr>
												<td>其他有关文件号</td>
												<td><input type="text" name="fname" /></td>
												<td colSpan={2}></td>
												<td colSpan={2}></td>
											</tr>
											<tr>
												<td colSpan={6}>
													<table className="innerTable" width="100%" border="true" frame="void">
														<thead>
															<tr>
																<td colSpan={6} style={{"textAlign":"center"}}>成本计算</td>
															</tr>
															<tr>
																<td width="16%">开始时间：</td>
																<td colSpan={2}><input className="fname" type="date" name="fname" placeholder="请输入开始时间" /><span className="defaultName">{this.state.defaultTime}</span></td>
																<td width="16%">结束时间：</td>
																<td colSpan={2}><input className="fname" type="date" name="fname" placeholder="请输入开始时间"/><span className="defaultName">{this.state.defaultTime}</span></td>
															</tr>
															<tr>
																<th width="16%">项目</th>
																<th width="16%">单位</th>
																<th width="16%">数量</th>
																<th width="16%">单价</th>
																<th width="16%">总价</th>
																<th width="16%">备注</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>人工工时</td>
																<td>人+时</td>
																<td><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
																<td><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
																<td><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
																<td><input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span></td>
															</tr>
															<tr>
																<td>药材总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>耗水总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>耗电总量</td>
																<td>Kvh</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>耗气总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>耗油总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>溶媒总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>回收总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>物耗总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>成品总量</td>
																<td>Kg</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>设备折旧</td>
																<td>元</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>管理费用</td>
																<td>元</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>合计</td>
																<td>元</td>
																<td colSpan={4}><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>开票税金</td>
																<td>元</td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" placeholder="17%" /></td>
																<td><input type="text" name="fname" /></td>
																<td><input type="text" name="fname" /></td>
															</tr>
															<tr>
																<td>生产能效比</td>
																<td>%</td>
																<td colSpan={3}><input type="text" name="fname" /></td>
																<td><span>(产出/能耗)%</span></td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
						<tfoot>
						<tr>
							<td width="16%">生产人员：</td>
							<td><input className="fname" type="text" name="fname" placeholder="User"/><span className="defaultName">中央空调</span></td>
							<td width="16%">生产主管：</td><
							td><input className="fname" type="text" name="fname" placeholder="Admin"/><span className="defaultName">中央空调</span></td>
							<td width="12%">日期：</td>
							<td width="20%"><input className="fname" type="date" name="fname" placeholder="请输入日期"/><span className="defaultName">{this.state.defaultTime}</span></td>
						</tr>
						</tfoot>
					</table>

				</Content>

			</div>

		)
	}
}

// <input className="fname" type="text" name="fname" placeholder="中央空调"/><span className="defaultName">中央空调</span>
