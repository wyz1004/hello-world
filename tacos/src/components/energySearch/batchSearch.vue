<template>
<div class="batchSearch">
	<el-form ref="form" :model="form" :rules="rules" label-width="80px" class="formWrapper">
		<div class="formCondition">
	  <el-form-item prop="search" class="condition">
	    <el-cascader
		  :options="bigDrugNameArrays"
		  v-model="form.search"
		  placeholder="药品名称和批次号"
		  separator="  "
		  class="wang"
	    ></el-cascader>
	  </el-form-item>
	  <el-form-item prop="layer" class="condition">
	    <el-select v-model="form.layer " placeholder="层次">
		    <el-option label="车间" value="workshop"></el-option>
      		<el-option label="工艺" value="process"></el-option>
		    <el-option label="设备" value="device"></el-option>
		</el-select>
	  </el-form-item>
	  <el-form-item prop="energyType" class="condition">
	    <el-select v-model="form.energyType" placeholder="能源">
		    <el-option label="自来水" value="自来水"></el-option>
		    <el-option label="纯化水" value="纯化水"></el-option>
		    <el-option label="电量" value="电量"></el-option>
		    <el-option label="蒸汽量" value="蒸汽量"></el-option>
		    <el-option label="水气电量" value="总量"></el-option>
		</el-select>
	  </el-form-item>	
	  
	  <el-form-item prop="reportType" class="condition">
	    <el-select v-model="form.reportType " placeholder="报表类型">
	    	<el-option label="表格" value="table"></el-option>
		    <el-option label="柱状图" value="bar"></el-option>
      		<el-option label="折线图" value="line"></el-option>
		    <el-option label="饼状图" value="pie"></el-option>
		</el-select>
	  </el-form-item>
	  </div>
	  <el-form-item class="submit">
	    <el-button @click="resetForm('form')" class="resetBtn">重置</el-button>
	    <el-button type="primary" @click="submitForm('form')">查询</el-button>
	  </el-form-item>
	</el-form> 
	<div class="allRecords">
		<img src="@/assets/picture/jiqi.png" alt="搁置的内容"  />
	</div>
</div>
</template>

<script>
export default ({
	name:"batchSearch",
	//props:["bigDrugNameArrays"],//处理好层级关系，本地假数据
	data(){
		return {
	        energyTypeValue: '',
	        form:{
	        	search:[],
	        	energyType:"",
	        	layer:"",
	        	reportType:"",
	        },
	        rules:{
	        	search:[
	        	  { type: 'array', required: true, message: '请至少查询层次', trigger: 'change' }
	        	],
	        	energyType:[
	        	  { required: true, required: true,message: '请选择查询的能源类型', trigger: 'change' }
	        	],
	        	layer:[
	        	  { required: true, required: true,message: '请选择层次', trigger: 'change' }
	        	],
	        	reportType:[
	        	  { required: true, required: true,message: '请选择图表类型', trigger: 'change' }
	        	],
	        }
		}
	},
	computed:{
		bigDrugNameArrays(){
			return this.$store.state.deviceManageEnergySearch.bigDrugNameArrays;
		}
	},
	methods:{
		//提交按钮
		submitForm(formName) {
			var self = this;
			var form = undefined;
	        this.$refs[formName].validate((valid) => {
	          if (valid) { 
	            alert('submit!');
	            form = this.form;
	            form.dataType = "batchSearch";
	            //console.log(form);
	            self.$store.commit("deviceManageEnergySearch/handleSearchCriteriaDrug",form);
	            self.$router.push({
	            	name:"EnergyResult"
	            });
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	    },
	    //重置按钮
	    resetForm(formName) {
	        this.$refs[formName].resetFields();
	    },
	}
})
</script>

<style lang="scss" scoped>
.batchSearch{
	height: 100%;
	width: 100%;
}
.formWrapper{
			/*box-sizing: border-box;*/
			padding: 20px;
			background: white;
			/*width: 99.7%;*/
			text-align: center;
			box-shadow: 8px 8px 10px #e1e1e1;
			div.formCondition{
				overflow: hidden;
				margin-top: 10px;
				display: flex;
				flex-wrap: nowrap;
				justify-content:space-between;
				.condition{
					width: 24%;
					/deep/ div.el-form-item__content{
						margin-left:0px!important;
						.el-select,.el-cascader{
							width: 100%;
							div.el-input input{
							}
							
						}
					}
				}
				
			}
			/*更改下拉框选择之后，外边框的样式--颜色*/
		/deep/ .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
					border-color:#409EFF!important;
				}
	}
	div.submit{
		margin-bottom: 0px!important;
		clear:both;
		/deep/ div.el-form-item__content{
			margin-left: 0!important;
			.el-button{
				width: 100px;
				margin-bottom: 4px;
			}
			.el-button+.el-button {
			    margin-left: 45px!important;
			}
			
		}
	}
	div.allRecords{
		margin-top: 20px;
		width: 100%;
		height: calc(100% - 176px);
		img{
			display: block;
			width: 100%;
			height: 100%;
		}
	}

</style>