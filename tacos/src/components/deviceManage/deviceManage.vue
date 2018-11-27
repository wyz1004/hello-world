<template>
<div class="deviceManage">
	<h3>设备管理</h3>
	<el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="wrapper">
		<el-tab-pane class="content" v-for="(deviceManageArray,index) in deviceManageArrays" :label="deviceManageArray.label" :name="deviceManageArray.value" :key="index">
	    	<Trytable v-bind:deviceManageArray="deviceManageArray.children"></Trytable>
	   </el-tab-pane>
	</el-tabs>
	
</div>
</template>

<script>
import Trytable from "./trytable";
import axios from "axios";
export default ({
	name:"DeviceManage",
	data(){
		return {
			activeName: 'process0',
		}
	},
	components:{Trytable},
	computed:{
		deviceManageArrays(){
			return this.$store.state.deviceManageEnergySearch.deviceManageArrays;
		}
	},
	mounted(){
		this.requestDatas();
	},
	methods: {
	  requestDatas(){
	  	this.$store.dispatch("deviceManageEnergySearch/deviceManageArrays");
	  },
      handleClick(tab, event) {
      	var self = this;
        //console.log(tab.label, event);
        //console.log(self.extractionDatas);
      }
    }
})
</script>

<style lang="scss" scoped>
div.deviceManage{
	width: 100%;
	h3{
		background: white;
		border-bottom: 2px solid #f2f2f2;
		font-weight: 500;
		font-size: 16px;
		padding-left:20px;
		line-height: 46px;
		height: 46px;
	}
}
div.wrapper{
	/deep/ .el-tabs__header{
		border-bottom: 0;
		padding: 20px 30px;
		background: white;
		width: auto;
		div.el-tabs__nav{
			width: 100%; 
			border:0px;	
			border-radius:0 0 0 0;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			div{
				padding:0 30px;
				border-left: 0;
				border:1px solid #4d5269;
				border-radius: 8px;
				text-align: center;
				/*min-width: 11%;*/
				/*margin-right: 40px;*/
				
			}
			/*div:last-child{
				margin-right:0;
			}*/
			.el-tabs__item.is-active{
				background:#3a8ee6;
				border-color:#3a8ee6;
				color: white;
			}
		}
		
	}
	
}

</style>