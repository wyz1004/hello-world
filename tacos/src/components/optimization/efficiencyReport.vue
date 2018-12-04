<template>
<div id="efficiencyReport">
	<div class="efficiencyReportTitle">
		<h3 style="font-size:16px">批次能效报表</h3>
		<div class="editeExportBtn">
			<el-button type="primary" style="margin-right:16px" size="small" @click="handleEditeButton">编辑</el-button>
            <el-button type="primary" style="margin-right:16px" size="small" @click="handleSaveButton">保存</el-button>
            <el-button type="primary" style="margin-right:0px" size="small" @click="handleEditeButton">导出</el-button>
        </div>
	</div>
	
	<table class="wrapperTable">
		<thead>
			<tr style="background:gray">
				<th colSpan="6" style="text-align:center,font-size:16px">批次能效报表</th>
			</tr>
			<tr style="background:gray">
				<td colSpan="6" style="text-align:left">中药制药能效管理系统</td>
			</tr>
			<tr style="padding-right:20px">
				<td colSpan="6" style="text-align:right,padding-right:20px">
					<span>批次号：</span>
					<span>CDBC</span>
				</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td colSpan="6" style="padding:20px">
					<table border="true" class="outerTable" width="100%">
						<tbody>
							<tr>
								<td width="16%">产品名称</td>
								<td width="16%"><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
								<td width="9%">生产批号</td>
								<td width="8%"><input ref="fname" class="fname" type="text" name="fname" /><span class="defaultName">中央空调</span></td>
								<td width="8%">规格</td>
								<td width="8%"><input ref="fname" class="fname" type="text" name="fname" /><span class="defaultName">中央空调</span></td>
							</tr>
							<tr>
								<td>生产前检查</td>
								<td><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
								<td colSpan="2">下达生产指令文号</td>
								<td colSpan="2"><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
							</tr>
							<tr>
								<td>执行文件标准号</td>
								<td><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
								<td colSpan="2">物料</td>
								<td colSpan="2"><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
							</tr>
							<tr>
								<td>设备、岗位SOP号</td>
								<td><input type="text" name="fname" /></td>
								<td colSpan="2">品种</td>
								<td colSpan="2"><input type="text" name="fname" /></td>
							</tr>
							<tr>
								<td>清洗、清场SOP号</td>
								<td><input type="text" name="fname" /></td>
								<td colSpan="2">数量</td>
								<td colSpan="2"><input type="text" name="fname" /></td>
							</tr>
							<tr>
								<td>各种记录表格</td>
								<td><input type="text" name="fname" /></td>
								<td colSpan="2">合格证</td>
								<td colSpan="2"><input type="text" name="fname" /></td>
							</tr>
							<tr>
								<td>其他有关文件号</td>
								<td><input type="text" name="fname" /></td>
								<td colSpan="2"></td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td colSpan="6">
									<table class="innerTable" width="100%" border="true" frame="void">
										<thead>
											<tr>
												<td colSpan="6" style="text-align:center">成本计算</td>
											</tr>
											<tr>
												<td width="16%">开始时间：</td>
												<td colSpan="2"><input class="fname" type="date" name="fname" placeholder="请输入开始时间" /><span class="defaultName">{{defaultTime}}</span></td>
												<td width="16%">结束时间：</td>
												<td colSpan="2"><input class="fname" type="date" name="fname" placeholder="请输入开始时间"/><span class="defaultName">{{defaultTime}}</span></td>
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
												<td><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
												<td><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
												<td><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
												<td><input class="fname" type="text" name="fname" placeholder="中央空调"/><span class="defaultName">中央空调</span></td>
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
				<td><input class="fname" type="text" name="fname" placeholder="User"/><span class="defaultName">中央空调</span></td>
				<td width="16%">生产主管：</td>
				<td><input class="fname" type="text" name="fname" placeholder="Admin"/><span class="defaultName">中央空调</span></td>
				<td width="12%">日期：</td>
				<td width="20%"><input class="fname" type="date" name="fname" placeholder="请输入日期"/><span class="defaultName">{{defaultTime}}</span></td>
			</tr>
		</tfoot>
	</table>
</div>
</template>

<script>
const inputFname = document.getElementsByClassName("fname");
const defaultName = document.getElementsByClassName("defaultName");
export default ({
	name:"efficiencyReport",
	data(){
		return {
			defaultTime:"",
		}
	},
	mounted(){
		this.handleDefaultTime();
	},
	methods:{
		handleDefaultTime(){
			var d = new Date(),y,m,d;
			y = d.getFullYear();
			m = d.getMonth() +1;
			d = d.getDay();
			this.defaultTime=y+"-"+m+"-"+d;
		},
	
		handleSaveButton(){
			console.log("save");
			// console.log(inputFname,defaultName);
			for(var i = 0;i<inputFname.length;i++){
				inputFname[i].style.display = "none";
				defaultName[i].style.display = "block";
				defaultName[i].innerHTML = inputFname[i].value;
			}
		},
		handleEditeButton(){
			console.log("edit");
			// console.log(inputFname,defaultName);
			for(var i = 0;i<inputFname.length;i++){
				defaultName[i].style.display = "none";
				inputFname[i].style.display = "block";
			}
		},
	},
	
})
</script>

<style lang="scss" scoped>
div#efficiencyReport{
	width: 100%;
	height: auto;
	background: white;
}
.efficiencyReportTitle{
	height: 60px;
	padding: 0 15px;
	overflow: hidden;
	border-bottom: 1px solid #e8e8e8;
}
.efficiencyReportTitle h3{
	float: left;
	line-height: 60px;
	font-weight: 500;
	margin-bottom: 0;
}
.efficiencyReportTitle div.editeExportBtn{
	float: right;
	padding:15px 0px;
}
table{
	border-collapse:collapse;
}
table.wrapperTable{
	width: 540px;
	min-height: 300px;
	margin:20px auto;
	border:1px solid gray;
}
table.wrapperTable td{
	font-size: 14px;
}
table.wrapperTable th{
	font-size: 14px;
	font-weight: 500;
}
table.wrapperTable>tfoot>tr>td:nth-child(2n-1){
	width: 16%;
	text-align: right;
}
input[name="fname"]{
	display: none;
	width: 100%;
}
input[name="fname"]+span{
	display: block;
	width: 100%;
}
</style>