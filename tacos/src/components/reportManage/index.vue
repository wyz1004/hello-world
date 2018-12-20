<template>
<div class="reportMange">
	<div class="titleSearch">
		<div class="leftSearch">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item>
			    <el-select v-model="formInline.utilitiesType" placeholder="选择表格类型">
			      <el-option label="报表数据" value="2"></el-option>
			      <el-option label="柱状图" value="0"></el-option>
			      <el-option label="折线图" value="3"></el-option>
			      <el-option label="饼状图" value="1"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="formInline.utilitiesName" placeholder="请输入查询条件"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="handleSearchInput">重置查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<div class="rightAdd">
			<el-button type="primary" @click="openAddDialog">新增</el-button>
		</div>
	</div>
	
	
	<EditForm v-if="dialogFormVisible" 
		  :dialogFormVisible="dialogFormVisible" 
		  :data="editForm"
		  v-on:handleClick="handledialogFormVisible"
	></EditForm>
	
	
	<div class="tablewrapper">
	    <el-table class="table"
		    :data="conData">
         <el-table-column v-for="(columnArr,index) in columnArrs" :key="index" 
	      :prop="columnArr.prop"
	      :label="columnArr.label"
	      :width="columnArr.width ? columnArr.width : null" :fixed="columnArr.fixed ? columnArr.fixed : null">
	     </el-table-column>   
	    <el-table-column
	      label="操作" width="180px" fixed="right">
	      <template slot-scope="scope">
	      	<el-button @click="handleClickDel(scope.$index,scope.row,scope)" type="text" size="small">删除</el-button>
	        <el-button @click="handleClickEdit(scope.$index,scope.row,scope)" type="text" size="small">修改</el-button>
	        <el-button @click="handleClickPreview(scope.$index,scope.row,scope)" type="text" size="small">预览</el-button>
	      </template>
	    </el-table-column> 
    	</el-table>
	  	<el-pagination v-if="totalLenght>9"
		 	class="pagination"
		 	background
		  layout="prev, pager, next"
		  @current-change="handleCurrentChange"
		  :total="totalLenght"
		  :page-size="10">
		</el-pagination>
	</div>
</div>
</template>

<script>
import EditForm from "./editForm";
export default({
	name:"reportMange",
	data(){
		return {
			home:"这是列表管理页面",
			columnArrs:[
				{label:"设备名称",prop:"utilitiesMetris",width:"180px",fixed:true},
				{label:"报表类型",prop:"utilitiesType"},
				{label:"报表分类",prop:"utilitiesClassify"},
				{label:"统计周期",prop:"utilitiesZyn"},
				{label:"报表名称",prop:"utilitiesName"},
				{label:"报表标题",prop:"utilitiesHeadline"},
				{label:"创建人",prop:"utilitiesCreator"},
				{label:"创建时间",prop:"utilitiesTime"},
				{label:"更新人",prop:"utilitiesUpdate"},
				{label:"更新时间",prop:"utilitiesUpdatetime"}
			],
			conData:[],
			formInline:{
				utilitiesType:null,
				utilitiesName:''
			},
			dialogFormVisible:false,//弹出对话框中的表单
			editForm:{},//弹出对话框中的数据
		}
	},
	components:{EditForm},
	mounted(){
		this.getLists();
	},
	computed:{
		lists(){
			return this.$store.state.reportManage.lists;
		},
		totalLenght(){
			//console.log(this.lists.length);
			this.conData =  this.lists.length ? this.lists.slice(0,10) : null;
			return this.lists.length;
		},
	},
	watch:{},
	methods:{
		getLists(){
			this.$store.dispatch("reportManage/lists");
		},
		handleClickPreview(index,row,all){
			console.log("预览页面");
			console.log(index,row,all);
           this.$router.push({
            	path:"/previewReport",
            	query:{
            		deviceId:row.utilitiesId,
	                type:row.utilitiesClassify,
	                picType:row.utilitiesType,
	                startTime:row.utilitiesStarttime,
	                endTime:row.utilitiesEndtime,
	                deviceName:row.utilitiesMetris, 
	                period:row.utilitiesZyn
            	}
            });
		},
		handleCurrentChange(val){
		  	var indexNext = (val-1)*10;
		  	this.conData = this.lists.slice(indexNext,indexNext+10);
		},
		//搜索查询按钮
		handleSearchInput(){
			console.log(this.formInline);
			/*utilitiesName: "fs"
			utilitiesType: "2"*/
			this.$store.dispatch("reportManage/SearchInput",this.formInline);
			
		},
		//弹出新增对话框
		openAddDialog(){
			this.dialogFormVisible = true;
			this.editForm = {
				utilitiesMetris:'',
				utilitiesType:'',
				utilitiesClassify:'',
				utilitiesZyn:'',
				utilitiesName:'',
				utilitiesHeadline:'',
				utilitiesCreator:'',
				utilitiesDuringTime:'',
				utilitiesUpdate:'',
			}
			console.log(this.eEditForm);
		},
		//接受从子组件中传过来的值；
		handledialogFormVisible(val){
			console.log(val);
			this.dialogFormVisible = val;
		},
		handleClickEdit(index,row,datas){
			this.dialogFormVisible = true;
			//console.log(row);
			/*{key: 1
			utilitiesClassify: "水气电表"
			utilitiesCreator: "111"
			utilitiesEndtime: 1534521600000
			utilitiesHeadline: "111"
			utilitiesId: "29ff55e3-db58-4639-86c5-ef09890eff29"
			utilitiesMetris: "steam_collector002"
			utilitiesName: "111"
			utilitiesStarttime: 1534176000000
			utilitiesTime: "2018-10-15"
			utilitiesTimeUse:"时间戳"
			utilitiesType: "折线图"
			utilitiesUpdate: "111"
			utilitiesUpdatetime: "2018-10-15"
			utilitiesZyn: "天"}*/
			var utilitiesDuringTime = [];
			utilitiesDuringTime[0] = new Date(row.utilitiesStarttime);
			utilitiesDuringTime[1] = new Date(row.utilitiesEndtime);
			this.editForm={
				utilitiesMetris:row.utilitiesMetris,
				utilitiesType:row.utilitiesType,
				utilitiesClassify:row.utilitiesClassify,
				utilitiesZyn:row.utilitiesZyn,
				utilitiesName:row.utilitiesName,
				utilitiesHeadline:row.utilitiesHeadline,
				utilitiesCreator:row.utilitiesCreator,
				utilitiesDuringTime:utilitiesDuringTime,
				utilitiesUpdate:row.utilitiesUpdate,
				utilitiesId:row.utilitiesId,
				utilitiesTime:row.utilitiesTimeUse
			}
		},
		handleClickDel(index,row,datas){
			var self = this;
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '删除',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	console.log(index,row);
	        	self.$store.dispatch("reportManage/listsDel",row.utilitiesId);
	        }).catch(() => {
	                   
	        });
			
		},
		handleShow(index){
			console.log("shwo",index);
		},
		handleHide(index){
			console.log("hide",index);
		}
	}
})
</script>

<style lang="scss" scoped>
div.reportMange{
	width: auto;
	height: calc(100% - 20px);
	background: white;
	padding:10px;
	overflow-y: auto;
}
div.titleSearch{
	overflow: hidden;
	/*width: 98%;*/
	margin: 0 auto 10px;
	height: 32px;
	
	div.leftSearch{
		float: left;
		/deep/ div.el-form-item{
			margin-bottom: 0px;
			margin-right: 16px;
			height: 32px;
			div.el-form-item__content{
				/*输入框和下拉框*/
				line-height: 32px;
				input{
					height: 32px;
					line-height: 32px;
				}
				span i{
					line-height: 32px;
				}
				/*重置查询按钮*/
				button{
					line-height: 30px;
					padding: 0 15px;
				}
			}
			
			
		}
	}
	div.rightAdd{
		float: right;
		/deep/ button{
			line-height: 30px;
					padding: 0 15px;
		}
	}
}

/*表格和分页*/
div.table{
	/*width: 98%!important;*/
	margin: 0 auto;
	/deep/ thead tr{ 
		width: 100%;
		th{
			padding:10px 0!important;    		
			text-align: center;
    		background: #eeeeee;
    		border-bottom: 1px solid #e8e8e8;
    		color: rgba(0, 0, 0, 0.85);
    		font-weight: 500;
    		font-size: 12px;
    		line-height: 35px;
    	}
	}
	/deep/ tbody tr td{
		text-align: center;
		padding:5px 0!important;    
		.cell{
			font-size:12px;
			line-height:35px;
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
	/*更新时间和创建时间*/
	/deep/ tbody tr td:nth-child(8),/deep/ tbody tr td:nth-child(10){
		.cell{
			min-width: 88px;
		}
	}
	/*报表名称，报表标题，创建人，更新人*/
	/deep/ tbody tr td:nth-child(5),/deep/ tbody tr td:nth-child(6),/deep/ tbody tr td:nth-child(7),/deep/ tbody tr td:nth-child(9){
		.cell{
			min-width: 88px;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		}
	}
	
	/deep/ tbody tr:nth-child(2n){
		background: #fafafa;
	}
}
div.pagination{
	text-align: center;
	margin-top: 20px;
	font-weight: 500;
}
</style>