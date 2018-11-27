<template>
<div class="factorySearch">
	<el-form ref="form" :model="form" :rules="rules" label-width="80px" class="formWrapper">
		<div class="formCondition">
	  <el-form-item prop="search" class="condition">
	    <el-cascader
		  :options="bigWorkshopArrays"
		  v-model="form.search"
		  placeholder="查询层次"
		  separator="-"
		  class="wang"
	    ></el-cascader>
	  </el-form-item>
	  <el-form-item prop="energyType" class="condition">
	    <el-select v-model="form.energyType " placeholder="能源">
		    <el-option
		      v-for="item in energyTypeOptions"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
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
	  <!--</div>
	  <div class="timeCondition">-->
	  <el-form-item prop="startTime" class="condition">
	    <el-date-picker
	      v-model="form.startTime"
	      type="month"
	      placeholder="选择开始日期">
	    </el-date-picker>
	  </el-form-item>
	  <el-form-item prop="endTime" class="condition">
	    <el-date-picker
	      v-model="form.endTime"
	      type="month"
	      placeholder="选择结束日期">
	    </el-date-picker>
	  </el-form-item>
	  </div>
	  <el-form-item class="submit">
	    <el-button @click="resetForm('form')" class="resetBtn">重置</el-button>
	    <el-button type="primary" @click="submitForm('form')">查询</el-button>
	  </el-form-item>
	</el-form> 
	<div class="allRecords">
		<h3 class="allRecords_title">水、电、气消耗总记录<span class="allRecords_tip">（注：今年年初至昨天24点）</span></h3>
		<ul class="allRecords_lists">
			<li class="allRecords_list" v-for="(allRecordsOption,index) in allRecordsOptions" :key="index">
				<div class="allRecords_list_wrapper">
					<div>
						<img :src="allRecordsOption.imgPath" class="waterImg" :alt="allRecordsOption.errTip" :title="allRecordsOption.errTip" />
					</div>
					<p>{{allRecordsOption.name}}</p>
					<p>{{allRecordsOption.sum}}<span>{{allRecordsOption.unit}}</span></p>
					<p v-if="index===0" class="duo">{{allRecordsOption.duo}}</p>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default ({
	name:"factorySearch",
	data(){
		return {
			//allRecordsOptions:[],
			water:"",elec:"",steam:"",
			energyTypeOptions:[{
	          value: '自来水',
	          label: '自来水'
	        }, {
	          value: '纯化水',
	          label: '纯化水'
	        }, {
	          value: '蒸汽量',
	          label: '蒸汽量'
	        }, {
	          value: '电量',
	          label: '电量'
	        }],
	        energyTypeValue: '',
	        form:{
	        	search:[],
	        	energyType:"",
	        	reportType:"",
	        	startTime:"",
	        	endTime:""
	        },
	        rules:{
	        	search:[
	        	  { type: 'array', required: true, message: '请至少查询层次', trigger: 'change' }
	        	],
	        	energyType:[
	        	  { required: true, required: true,message: '请选择查询的能源类型', trigger: 'change' }
	        	],
	        	reportType:[
	        	  { required: true, required: true,message: '请选择图表类型', trigger: 'change' }
	        	],
		        startTime: [
		          { type: 'date', message: '请选择开始日期', trigger: 'change' }
		        ],
		        endTime: [
		          { type: 'date', message: '请选择结束日期', trigger: 'change' }
		        ],
	        }
		}
	},
	computed:{
		bigWorkshopArrays(){
			return this.$store.state.deviceManageEnergySearch.bigWorkshopArrays;
		},
		allRecordsOptions(){
			return this.$store.state.deviceManageEnergySearch.allRecordsOptions;
		}
	},
	mounted(){

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
	            form.dataType = "factorySearch";
	            //console.log(form);
	            self.$store.commit("deviceManageEnergySearch/handleSearchCriteriaFactory",form);
	            self.$router.push({
	            	name:"EnergyResult",
	            	/*params:{
	            		formCon:self.form
	            	}*/
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
	    }
	},
})
</script>

<style lang="scss" scoped>
	div.factorySearch{
		margin:0 auto;
		width: 100%;
		.formWrapper{
			padding: 20px;
			background: white;
			text-align: center;
			box-shadow: 8px 8px 10px #e1e1e1;
			div.formCondition{
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
				flex-wrap: nowrap;
				.condition{
					width: 19%;
					/deep/ div.el-form-item__content{
						margin-left:0px!important;
						.el-select,.el-cascader,div.el-date-editor{
							width: 100%;
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
		/*height: 40%;*/
		margin-top: 10px;
		h3{
			font-weight: 500;
			font-size: 16px;
			color: #333333;
			line-height: 40px;
			padding-left: 20px;
			span{
				font-size: 14px;
				color: #999999;
			}
		}
	}
	ul.allRecords_lists{
		width: 100%;
		height: 30%;
		overflow: hidden;
		li.allRecords_list{
			float: left;
			box-sizing: border-box;
			width: 32.3%;
			margin: 0.5%;
			background:white;
			background-clip:content-box;
			box-shadow: 8px 8px 10px #e1e1e1;
			div.allRecords_list_wrapper{
				max-width: 300px;
				height: 210px;
				margin: 60px auto;
				position: relative;
				div{
					width:100%;
					height: 140px;
					position: relative;
					img{
						position: absolute;
						width: 27%;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
						
					}
				}
				
				
				p{
					margin: 0 auto;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					span{
						margin-left: 5px;
						/*color: #999999;*/
					}
				}
				p:nth-child(2){
					bottom:38px!important;	
					color: #999999;
				}
				p:nth-child(3){
					color: #F30615;
					font-weight: 600;
					font-size: 20px;
					bottom:5px!important;	
				}
				p:nth-child(4){
					bottom: -24px;
					color: #999999;
					font-size: 14px;
					width: 100%;
    				text-align: center;
				}
			}
			
		}
		li:nth-child(3){
			/*margin-right: 0!important;*/
		}
	}
	
	
</style>