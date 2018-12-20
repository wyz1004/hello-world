<template>
<div id="previewReport">
	<h3>{{home}}
		<button class="back" @click="handleBack">返回</button>
	</h3>
	<div class="ResultWrapper">
		<!--<div v-if="form.reportType == 'bar'" class="echarts">
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
		</div>-->
	</div>
</div>
</template>

<script>
import Bars from "@/components/public/bars";
import Lines from "@/components/public/lines";
import Pies from "@/components/public/pies";
export default ({
	name:"previewReport",
	data(){
		return {
			home:"预览报表"
		}
	},
	mounted(){
		this.handleGetRequestDatas();
	},
	methods:{
		//返回按钮
		handleBack(){
			this.$router.push("/reportManage");
		},
		handleGetRequestDatas(){
			var self = this;
			console.log(this.$route.query);
			var urlQuery = this.$route.query;
			/*deviceId: "29ff55e3-db58-4639-86c5-ef09890eff29"
			deviceName: "steam_collector002"
			endTime: 1534521600000
			period: "天"
			picType: "折线图"
			startTime: 1534176000000
			type: "水气电表"*/
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
			if(urlQuery.picType ==="报表数据"){
				
			}else{
				
			}
		},
	},
	components:{
		Bars,Lines,Pies
	}
})
</script>

<style lang="scss" scoped>
div#previewReport{
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
</style>