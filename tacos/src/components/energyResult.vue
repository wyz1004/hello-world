<template>
<div class="energyResult">
	<h3>{{home}}
	<button class="back" @click="handleBack">返回</button>
	</h3>
	<div class="ResultWrapper">
		<div v-if="form.reportType == 'bar'" class="echarts">
			<Bars v-if="energyReaultsBars.xAxisData && energyReaultsBars.xAxisData.length" :optionBars="energyReaultsBars"></Bars>
		</div>
		<div v-if="form.reportType === 'line'" class="echarts">
			<Lines v-if="energyReaultsBars.xAxisData && energyReaultsBars.xAxisData.length" :optionsUse="energyReaultsBars"></Lines>
		</div>
		<div v-if="form.reportType === 'pie'" class="echarts">
			<Pies v-if="energyReaultsPies.xAxisData && energyReaultsPies.xAxisData.length" :optionsPie="energyReaultsPies"></Pies>
		</div>
		<div v-if="form.reportType === 'table'" class="table">
			<el-table
			    :data="energyResultsArray"
			    border
			    style="width: 100%">
			    <el-table-column v-for="(value,key) in tableHead"
			    	:key="key"
			      :prop="key"
			      :label="value">
			    </el-table-column>
		    </el-table>
		 
			<div class="btnWrapper">
				 <el-pagination v-if="true" class="fenye"
			  background
			  layout="prev, pager, next"
			  @current-change="handleCurrentChange"
			  :total="totalLenght"
			  :page-size="8">
			</el-pagination>
				<a @click="downloadTable" class="downa">导出表格</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Lines from "./public/lines";
import Bars from "./public/bars";
import Pies from "./public/pies";
export default ({
	name:"EnergyResult",
	data(){
		return {
			home:"查询结果",
			form:JSON.parse(localStorage.getItem("form")),
			legend:[], 
			tableHead:{},//表格的表头
			echartsTitle:"",//给echarts设置的标题
		}
	},
	mounted(){
			//console.log(this.form);
			this.handleRender();
	},
	
	methods:{
		handleRender(){
			var self = this;
			var dataType = this.form.dataType;
			if(dataType ==="factorySearch"){
				//渲染车间查询的结果
				var time = this.form.time;
				var energyType = this.form.energyType;
				var search = this.form.search;
				var enterpriseName = localStorage.getItem("enterpriseName");
				this.echartsTitle=time+"  "+energyType+"的消耗量";
				if((search.length===1 && search[0].indexOf("车间")!==-1) || (search.length===2 &&  search[1].indexOf("车间")!==-1)){
					this.home="车间查询结果："+enterpriseName+" > "+search[0]
					this.legend=[search[0]+"的工艺"]
				}else if(search.length===2 &&  search[1].indexOf("车间")==-1){
					this.home="车间查询结果："+enterpriseName+" > "+search[0]+" > "+search[1]
					this.legend=[search[1]+"的设备"]
				}else{
					this.home="车间查询结果："+enterpriseName;
					this.legend=[enterpriseName+"的车间"]
				}
				this.tableHead={
					row:"序号",
					name:"层面",
					energy:"能源",
					time:"时间",
					value:"耗用量",
					unitValue:"单位",
					price:"价格",
					unitPrice:"单位",
					percentage:"耗用量占总量的百分比"
				}
				this.$store.dispatch("deviceManageEnergySearch/factoryResultsArrays");
			}else if(dataType==="batchSearch"){
				//渲染批次查询的结果
				var batchNum = this.form.search[1];
				var drugName = this.form.search[0];
				var energyType = this.form.energyType;
				var layer = this.form.layer;
				//console.log(batchNum);
				if(energyType === "总量"){
					energyType="水气电量"
				}
				this.echartsTitle = "药品名称:"+drugName+"；批次号:"+batchNum+"；层面:"+layer+"；能源:"+energyType;
				this.home="批次查询结果";
				this.tableHead={
					row:"序号",
					drugName:"药品名称",
					batchNum:"批次号",
					name:"层面",
					energy:"能源",
					value:"耗用量",
					unitValue:"单位"
				}
				this.$store.dispatch("deviceManageEnergySearch/batchResultsArrays");
			}
		},
		//返回按钮
		handleBack(){
			this.$router.push("/energySearch");
		},
		//分页的点击
		handleCurrentChange(val){
	  	  var indexNext = (val-1)*8;
	  	  this.conData = this.energyResultsArray.slice(indexNext,indexNext+8);
	    },
	    //导出表格
	    downloadTable(){
	      	//console.log(this.$store.state.deviceManageEnergySearch.energyResultsArray);
	      	var dataType = this.form.dataType;
	      	var datas = this.$store.state.deviceManageEnergySearch.energyResultsArray//从后端获取的原数据；
	      	var tableDown = document.createElement("table");
	      	tableDown.setAttribute("class", "tableDown")
	      	document.body.appendChild(tableDown);//把元素放进body标签里面
	      	var strTbody,downName='';
	      	//字符串拼接：
	      	var strThead
	      	if(dataType=="factorySearch"){
	      		strTbody="";
	      		strThead=`
		      		<thead width="100%">
		      			<tr width="100%">
		      				<th>序号</th>
		      				<th width="20%">层面</th>
		      				<th>能源</th>
		      				<th width="20%">时间</th>
		      				<th>耗用量</th>
		      				<th>单位</th>
		      				<th>价格</th>
		      				<th>单位</th>
		      				<th width="20%">耗用量占总量的百分比</th>
		      			</tr>
		      		</thead>
		      		<tbody class="tableTBody" width="100%"></tbody>
		      	`
		      	datas.forEach(function(data,index,datas){
		      		strTbody += "<tr><td>"+data.id+"</td><td>"+data.layer+"</td><td>"+data.energy+"</td><td>"+data.time+"</td><td>"+data.value+"</td><td>"+data.unitValue+"</td><td>"+data.price+"</td><td>"+data.unitPrice+"</td><td>"+data.percentage+"</td></tr>"
		      	})
		      	downName="车间查询结果列表.xls";
	      	}else if(dataType=="batchSearch"){
	      		strTbody="";
	      		strThead=`
		      		<thead width="100%">
		      			<tr width="100%">
		      				<th>序号</th>
		      				<th width="20%">药品名称</th>
		      				<th width="20%">批次号</th>
		      				<th>层面</th>
		      				<th>能源</th>
		      				<th>耗用量</th>
		      				<th>单位</th>
		      			</tr>
		      		</thead>
		      		<tbody class="tableTBody" width="100%"></tbody>
		      	`
		      	datas.forEach(function(data,index,datas){
		      		strTbody += "<tr><td>"+data.id+"</td><td>"+data.drugName+"</td><td>"+data.batchNum+"</td><td>"+data.layer+"</td><td>"+data.energy+"</td><td>"+data.value+"</td><td>"+data.unitValue+"</td></tr>"
		      	})
		      	downName="批次查询结果列表.xls";
	      	}
	      	document.getElementsByClassName("tableDown")[0].innerHTML = strThead;
	      	var tableTBody = document.getElementsByClassName("tableTBody")[0];
	      	
	      	//console.log(datas);
	      	
	      	tableTBody.innerHTML = strTbody;
	      	var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByClassName("tableDown")[0].outerHTML + "</body></html>";
	        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
	        var blob = new Blob([html], { type: "application/vnd.ms-excel" });
	        var a = document.getElementsByClassName("downa")[0];
	        // 利用URL.createObjectURL()方法为a元素生成blob URL
	        a.href = URL.createObjectURL(blob);
	        // 设置文件名
	        a.download = downName;
	        document.body.removeChild(tableDown);//把元素从body中删除
	    },
	},
	computed:{
		energyResultsArray(){
			return this.$store.state.deviceManageEnergySearch.energyResultsArray;
		},
		energyReaultsBars(){
			if(this.form.reportType =="line"||this.form.reportType =="bar"){
				var resultsObj= this.$store.state.deviceManageEnergySearch.energyReaultsBars;
				//console.log(resultsObj,this.legend);
				var resultsUseObj={};
				resultsUseObj.title={
					text:this.echartsTitle,
					left:"center",
				};
				resultsUseObj.legend = null;//this.legend
				//resultsUseObj.tooltipFormatter = '{a0}<br />{b} : {c0}'+resultsObj.unitSymbol;
				resultsUseObj.tooltipFormatter = '{b} : {c0}'+resultsObj.unitSymbol;
				resultsUseObj.xAxisData = resultsObj.xaiso;
				resultsUseObj.yAxisFormat = "{value}"+resultsObj.unitSymbol;
				resultsUseObj.seriesDataSeconed=[{
		        	name:"",
		            type:this.form.reportType =="bar" ? 'bar' : 'line',
		            data:resultsObj.yaiso,
		            barMaxWidth:100,
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							//color: 'rgba(104, 253, 255, 0.7)',
							color:'#84a4ee',
						},
					},
		        }];
		        resultsUseObj.markLine=null;
		        resultsUseObj.markPoint=null;
				//console.log(resultsUseObj);
				return resultsUseObj;
			}
		},
		energyReaultsPies(){
			//["title","xAxisData","seriesData","tooltipFormatter"],
			var resultsObj= this.$store.state.deviceManageEnergySearch.energyReaultsPies;
			var resultsUseObj={};
			resultsUseObj.title={
					text:this.echartsTitle,
					left:"center",
				};
			resultsUseObj.xAxisData =resultsObj.xaiso;
			resultsUseObj.tooltipFormatter = '{b} : {c}'+resultsObj.unitSymbol+ ' ({d}%)';
			resultsUseObj.seriesData=[{
	        	name:"",
	            type:'pie',
	            data:resultsObj.pieDatas,
	            radius : '55%',
            	center: ['50%', '45%'],
				itemStyle: {//图形样式
					emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
				},
	        }];
	        return resultsUseObj;
		},
		totalLenght(){
			var self = this;
			self.total = self.energyResultsArray.length;
			self.conData = self.energyResultsArray.slice(0,8);
			return self.total;
		}
	},
	
	components:{Bars,Lines,Pies}
})
</script>

<style lang="scss" scoped>
div.energyResult{
	width: 100%;
	height: 100%;
	background: white;
	h3{
		background: white;
		border-bottom: 2px solid #f2f2f2;
		/*margin-bottom: 10px;*/
		font-weight: 500;
		font-size: 16px;
		padding-left:20px;
		line-height: 46px;
		height: 46px;
		overflow: hidden;
		.back{
			width: 70px;
			height: 32px;
			float: right;
			text-align: center;
			line-height: 32px;
			border:1px solid #409EFF;
			background: #409EFF;
			cursor: pointer;
			outline: 0;
			font-weight: 500;
			border-radius: 8px;
			color: white;
			margin: 7px 20px 7px 0;
		}
		.back:hover{
			background: #66b1ff;
			border-color: #66b1ff;
		}
		.back:active{
			background: #3a8ee6;
			border-color:#3a8ee6;
			color: white;
		}
	}
	div.ResultWrapper{
		width: auto;
		box-sizing: border-box;
		height: calc(100% - 60px);
		padding: 20px;
		div.table{
			width: 100%;
			height: 100%;
			/*表格样式*/
			/deep/ thead tr{ 
	    		width: 100%;
	    		th{
		    		text-align: center;
		    		background: #eef3f7;
		    	}
	    	}
	    	/deep/ tbody tr td{
	    		text-align: center;
	    		.cell{
		    		button{
		    			margin: 0 auto;
		    		}
		    		div{
		    			input{
		    				text-align: center;
		    			}
		    		}
	    		}
	    	}
	    	/deep/ tbody tr:nth-child(2n){
	    		background: #fafbfd;
	    	}
			/*/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
		    	background: #838aa8;
		    }*/
		}
		/deep/ .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
			padding-left:0px!important ;
		}
		/deep/ .el-table .cell, .el-table th div{
			padding-right:0px!important ;
		}
		div.echarts{
			width: 100%;height: 100%;
			h4{
				text-align:center;font-weight: 500;
			}
		}
	}
}
/*导出按钮*/
div.btnWrapper{
	width: 100%;
	position: relative;
	a.downa{
		position: absolute;
		right: 0;
		top: -10px;
		text-align: center;
		text-decoration: none;
		width: 100px;
	    height: 38px;
	    border-radius: 8px;
	    line-height: 40px;
	    font-size: 14px;
	    border:1px solid #409EFF;
	    color: #4d5269;
	}
	a.downa:hover{
		background: #66b1ff;
		border-color: #66b1ff;
		color: white;
	}
	a.downa:active{
		background: #3a8ee6;
		border-color:#3a8ee6;
		color: white;
	}
	/*分页样式*/
	/deep/ div.el-pagination{
		margin-top: 25px;
		text-align: center;
	}
}
</style>