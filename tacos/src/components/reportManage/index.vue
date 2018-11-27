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
			    <el-button type="primary" @click="onSubmit">重置查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<div class="rightAdd">
			<el-button type="primary" @click="openDialog">新增</el-button>
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
	      :width="columnArr.width ? columnArr.width : null">
	     </el-table-column>   
	    <el-table-column
	      label="操作" width="180px">
	      <template slot-scope="scope">
	      	<el-popover
			  placement="top"
			  width="160"
			  :value="popVisibleArrays[scope.$index]">
			  <p>确定要删除该项吗？</p>
			  <div style="text-align: center; margin: 0">
			    <el-button size="mini" type="text" @click="handlePopCancel(scope.$index)">取消</el-button>
			    <el-button type="primary" size="mini" @click="handlePopOK(scope.$index)">确定</el-button>
			  </div>
			  <el-button slot="reference" @click="handleClickDel(scope.$index,scope.row,scope)" type="text" size="small">删除</el-button>
			</el-popover>
	        <el-button @click="handleClickEdit(scope.$index,scope.row,scope)" type="text" size="small">修改</el-button>
	        <el-button @click="handleClick(scope.$index,scope.row,scope)" type="text" size="small">预览</el-button>
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
				{label:"设备名称",prop:"utilitiesMetris",width:"180px"},
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
			popVisible:false,
			popVisibleArrays:[false,false,false,false,false,false,false,false,false,false],
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
			this.conData =  this.lists.slice(0,10);
			return this.lists.length;
		},
		/*popVisibleArrays(){
			var datas = this.conData
			var self = this;
			var falseArrays = [];
			datas.forEach(function(data,index,datas){
				falseArrays.push(false);
			})
			console.log(falseArrays);
			return falseArrays
		}*/
	},
	watch:{
		popVisibleArrays(newVal,oldVal){
			if(newVal){
				console.log(newVal)
				return newVal;
			}
		}
	},
	methods:{
		getLists(){
			this.$store.dispatch("reportManage/lists");
		},
		handleClick(index,row,all){
			console.log(index,row,all);
		},
		handleCurrentChange(val){
		  	var indexNext = (val-1)*10;
		  	this.conData = this.lists.slice(indexNext,indexNext+10);
		},
		//搜索查询按钮
		onSubmit(){
			console.log(this.formInline);
		},
		//弹出对话框
		openDialog(){
			this.dialogFormVisible = true;
			this.editForm = {
				name:"",
				region:""
			}
		},
		//接受从子组件中传过来的值；
		handledialogFormVisible(val){
			console.log(val);
			this.dialogFormVisible = val;
		},
		handleClickEdit(index,row,datas){
			this.dialogFormVisible = true;
			this.editForm={
				utilitiesMetris:'',
				utilitiesType:'',
				utilitiesClassify:'',
				utilitiesZyn:'',
				utilitiesName:'',
				utilitiesHeadline:'',
				utilitiesCreator:'',
				utilitiesTime:'',
				utilitiesUpdate:'',
			}
		},
		handleClickDel(index,row,datas){
			console.log(this);
			this.popVisibleArrays[index] = true;
			console.log(index,this.popVisibleArrays);
			
		},
		handlePopCancel(index){
			console.log(this.popVisibleArrays);
			this.popVisibleArrays[index] = false;
		},
		handlePopOK(index){
			console.log(this.popVisibleArrays);
			this.popVisibleArrays[index] = false;
			
			console.log("删除该项");
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
	width: 98%;
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
	width: 98%!important;
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