<template>
<div class="editForm">
	<el-dialog title="新增" :visible.sync="show">
	  <el-form :model="data" :rules="rules" ref="data">
	  	<el-form-item label="设备名称" prop="utilitiesMetris">
	      <el-select v-model="data.utilitiesMetris" placeholder="请选择">
	        <el-option label="steam_collector001" value="steam_collector001"></el-option>
	        <el-option label="steam_collector002" value="steam_collector002"></el-option>
	        <el-option label="steam_collector003" value="steam_collector003"></el-option>
	        <el-option label="steam_collector004" value="steam_collector004"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="报表类型" prop="utilitiesType">
	      <el-select v-model="data.utilitiesType" placeholder="请选择">
	        <el-option label="柱状图" value="0"></el-option>
	        <el-option label="饼状图" value="1"></el-option>
	        <el-option label="报表数据" value="2"></el-option>
	        <el-option label="折线图" value="3 "></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="报表分类" prop="utilitiesClassify">
	      <el-select v-model="data.utilitiesClassify" placeholder="请选择">
	        <el-option label="蒸汽表" value="0"></el-option>
	        <el-option label="水电气表" value="1"></el-option>
	        <el-option label="水量表" value="2"></el-option>
	        <el-option label="电量表" value="3 "></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="统计周期" prop="utilitiesZyn">
	      <el-select v-model="data.utilitiesZyn" placeholder="请选择">
	        <el-option label="年" value="0"></el-option>
	        <el-option label="季度" value="1"></el-option>
	        <el-option label="月" value="2"></el-option>
	        <el-option label="天" value="3 "></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="报表名称" prop="utilitiesName">
	      <el-input v-model="data.utilitiesName" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="报表标题" prop="utilitiesHeadline">
	      <el-input v-model="data.utilitiesHeadline" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="创建人" prop="utilitiesCreator">
	      <el-input v-model="data.utilitiesCreator" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="开始-结束时间" prop="utilitiesDuringTime">
		    <el-date-picker
		      v-model="data.utilitiesDuringTime"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
    	</el-form-item>
    	<el-form-item label="更新人" prop="utilitiesUpdate">
	      <el-input v-model="data.utilitiesUpdate" autocomplete="off"></el-input>
	    </el-form-item>
	    
	    <!--<el-form-item>
	    	<el-button @click="handleCancel">取 消</el-button>
	    	<el-button type="primary" @click="submitForm('data')">确 定</el-button>
	    </el-form-item>-->
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="handleCancel">取 消</el-button>
	    <el-button @click="resetForm('data')">重置</el-button>
	    <el-button type="primary" @click="submitForm('data')">确 定</el-button>
	  </div>
	</el-dialog>
</div>
</template>

<script>
import axios from "axios";
export default ({
	name:"editForm",
	props:["dialogFormVisible","data"],
	data(){
		return {
			show:this.dialogFormVisible,
			/*this.editForm={
				utilitiesMetris:'',
				utilitiesType:'',
				utilitiesClassify:'',
				utilitiesZyn:'',
				utilitiesName:'',
				utilitiesHeadline:'',
				utilitiesCreator:'',
				utilitiesDuringTime:'',
				utilitiesUpdate:'',
			}*/
			rules:{
				utilitiesMetris: [
		            { required: true, message: '设备名称不能为空', trigger: 'change' },
//		            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ],
		          utilitiesType: [
		            { required: true, message: '报表类型不能为空', trigger: 'change' }
		          ],
		          utilitiesClassify: [
		            { required: true, message: '报表分类不能为空', trigger: 'change' }
		          ],
		          utilitiesZyn: [
		            { required: true, message: '统计周期不能为空', trigger: 'change' }
		          ],
		          utilitiesName: [
		            { required: true, message: '报表名称不能为空', trigger: 'blur' }
		          ],
		          utilitiesHeadline: [
		            { required: true, message: '报表标题不能为空', trigger: 'blur' }
		          ],
		          utilitiesCreator: [
		            { required: true, message: '创建人不能为空', trigger: 'blur' }
		          ],
		          utilitiesUpdate: [
		            { required: true, message: '更新人不能为空', trigger: 'blur' }
		          ],
		         /* date1: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          date2: [
		            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
		          ],*/
		          utilitiesDuringTime: [
		            { type: 'array', required: true, message: '开始时间-结束时间不能为空', trigger: 'change' }
		          ]
			},
		}
	},
	mounted(){
		console.log(this.data);
	},
	methods:{
		handleCancel(){
			this.show = false;
			this.$emit("handleClick",false);
		},
		/*handleOK(){
			this.show = false;
			console.log(this.data);
			this.$emit("handleClick",false);
		},*/
		submitForm(formName) {
			var self = this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            //alert('submit!');
	            console.log(self.data);
	            var dataUse = self.data;
	            this.$emit("handleClick",false);
	            var formateStartTime = new Date(dataUse.utilitiesDuringTime[0]);
		        var formateStartTime_value=formateStartTime.getFullYear() + '-' + (formateStartTime.getMonth() + 1) + '-' + formateStartTime.getDate()+
		        " " +"00" + ":" +"00" +":"+"00"; 
		        var formateEndTime = new Date(dataUse.utilitiesDuringTime[1]);
		        var formateEndTime_value=formateEndTime.getFullYear() + '-' + (formateEndTime.getMonth() + 1) + '-' + formateEndTime.getDate()+
		        " " +"00" + ":" +"00" +":"+"00";
		        var utilitiesTime = new Date(dataUse.utilitiesTime);
		        var utilitiesTime_value=utilitiesTime.getFullYear() + '-' + (utilitiesTime.getMonth() + 1) + '-' + utilitiesTime.getDate()+
		        " " +"00" + ":" +"00" +":"+"00"; 
		        if(dataUse.utilitiesId){
		        	console.log("这是修改页面")
		        	var objType={
						"饼状图":1,
						"柱状图":0,
						"报表数据":2,
						"折线图":3
					}
					var objClassify={
						"水气电表":1,
						"蒸汽表":0,
						"水量表":2,
						"电量表":3
					}
					var objZyn = {                                                       
						"年":0,
						"季度":1,
						"月":2,
						"天":3
					}
					for(var dataUseIndex in dataUse){
						for(var zyn in objZyn){
							if(dataUse[dataUseIndex]===zyn){
								dataUse[dataUseIndex] = objZyn[zyn];
							}
						}
						for(var classify in objClassify){
							if(dataUse[dataUseIndex]===classify){
								dataUse[dataUseIndex] = objClassify[classify];
							}
						}
						for(var type in objType){
							if(dataUse[dataUseIndex] === type){
								dataUse[dataUseIndex] = objType[type];
							}
						}
					}
		        	axios.get("http://10.110.180.50:8010/ssm/utilities/addOrUpdateUtilities.do?utilitiesId="+dataUse.utilitiesId+
			        "&utilitiesType="+dataUse.utilitiesType+"&utilitiesClassify="+dataUse.utilitiesClassify+
			        "&utilitiesName="+dataUse.utilitiesName+"&utilitiesHeadline="+dataUse.utilitiesHeadline+
			        "&utilitiesStarttime="+formateStartTime_value+
			        "&utilitiesEndtime="+formateEndTime_value+
			        "&utilitiesCreator="+dataUse.utilitiesCreator+
			        "&utilitiesUpdate="+dataUse.utilitiesUpdate+
			        "&utilitiesTime="+utilitiesTime_value+
			        "&utilitiesMetris="+dataUse.utilitiesMetris+"&utilitiesZyn="+dataUse.utilitiesZyn
			       ).then((res)=>{
			          if(res.data.success===true){
			            window.location.reload()
			          }else{
			            alert("修改失败！")
			          }
			        }).catch((err)=>{
			          console.log(err);
			        })
		        }else{
		        	console.log("这是新增页面")
		        	axios.get("http://10.110.180.50:8010/ssm/utilities/addOrUpdateUtilities.do?utilitiesType="+dataUse.utilitiesType+
			        "&utilitiesMetris="+dataUse.utilitiesMetris+"&utilitiesClassify="+dataUse.utilitiesClassify+
			        "&utilitiesName="+dataUse.utilitiesName+"&utilitiesHeadline="+dataUse.utilitiesHeadline+
			        "&utilitiesStarttime="+formateStartTime_value+
			        "&utilitiesEndtime="+formateEndTime_value+
			        "&utilitiesCreator="+dataUse.utilitiesCreator+
			        "&utilitiesUpdate="+dataUse.utilitiesUpdate+"&utilitiesZyn="+dataUse.utilitiesZyn
			        ).then((res)=>{
			        	//res.data 为{success:true,msg:"新增成功",data:null}
			         if(res.data.success===true){
			              window.location.reload();
			          }else{
			            alert("添加失败！")
			          }
			        }).catch((err)=>{
			          console.log(err);
			        })
		        }
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	    },
	    resetForm(formName) {
	        this.$refs[formName].resetFields();
	    }
	}
})
</script>

<style lang="scss" scoped>
div.editForm{
	
}
/deep/ div.el-dialog__header{
	border-bottom: 2px solid #E6E6E6;
}
/deep/ div.el-dialog__body{
	padding: 10px 20px!important;
	form{
		overflow: hidden;
		.el-form-item{
			box-sizing: border-box;
			width: 49.5%;
			float: right;
			padding-right: 10px;
			div.el-select{
				width: 100%;
			}
			div.el-range-editor.el-input__inner{
				width: 100%;
			}
		}
		.el-form-item:nth-child(2n+1){
			padding-left: 10px;
			padding-right: 0px;
		}
		.el-form-item:last-child{
			padding-left:0px;
			padding-right: 10px;
		}
		.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
			border-color: #dcdfe6;
		}
	}
}
/deep/ div.el-dialog__footer{
	border-top: 2px solid #E6E6E6;
	padding:10px!important;
}

</style>