<template>
<div class="editForm">
	<el-dialog title="收货地址" :visible.sync="show">
	  <el-form :model="data">
	  	<el-form-item label="设备名称">
	      <el-select v-model="data.utilitiesMetris" placeholder="请选择">
	        <el-option label="steam_collector001" value="steam_collector001"></el-option>
	        <el-option label="steam_collector002" value="steam_collector002"></el-option>
	        <el-option label="steam_collector003" value="steam_collector003"></el-option>
	        <el-option label="steam_collector004" value="steam_collector004"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="报表类型">
	      <el-select v-model="data.utilitiesType" placeholder="请选择">
	        <el-option label="柱状图" value="0"></el-option>
	        <el-option label="饼状图" value="1"></el-option>
	        <el-option label="报表数据" value="2"></el-option>
	        <el-option label="折线图" value="3 "></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="报表分类">
	      <el-select v-model="data.utilitiesClassify" placeholder="请选择">
	        <el-option label="蒸汽表" value="0"></el-option>
	        <el-option label="水电气表" value="1"></el-option>
	        <el-option label="水量表" value="2"></el-option>
	        <el-option label="电量表" value="3 "></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="统计周期">
	      <el-select v-model="data.utilitiesZyn" placeholder="请选择">
	        <el-option label="年" value="0"></el-option>
	        <el-option label="季度" value="1"></el-option>
	        <el-option label="月" value="2"></el-option>
	        <el-option label="天" value="3 "></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="报表名称">
	      <el-input v-model="data.utilitiesName" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="报表标题">
	      <el-input v-model="data.utilitiesHeadline" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="创建人">
	      <el-input v-model="data.utilitiesCreator" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="开始-结束时间">
		    <el-date-picker
		      v-model="data.utilitiesTime"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
    	</el-form-item>
    	<el-form-item label="更新人">
	      <el-input v-model="data.utilitiesUpdate" autocomplete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="handleCancel">取 消</el-button>
	    <el-button type="primary" @click="handleOK">确 定</el-button>
	  </div>
	</el-dialog>
</div>
</template>

<script>
export default ({
	name:"editForm",
	props:["dialogFormVisible","data"],
	data(){
		return {
			show:this.dialogFormVisible
		}
	},
	methods:{
		handleCancel(){
			this.show = false;
			this.$emit("handleClick",false);
		},
		handleOK(){
			this.show = false;
			console.log(this.data);
			this.$emit("handleClick",false);
		}
	}
})
</script>

<style lang="scss" scoped>

</style>