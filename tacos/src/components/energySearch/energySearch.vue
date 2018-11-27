<template>
<div class="energySearch">
	<el-tabs v-model="activeName" @tab-click="handleClick" class="tabsWrapper">
	    <el-tab-pane label="车间查询" name="factorySearch">
	    	<div class="wrapper">
	    		<FactorySearch></FactorySearch>
	    	</div>
	    </el-tab-pane>
	    <el-tab-pane label="批次查询" name="batchSearch">
	    	<div class="wrapper">
	    		<BatchSearch></BatchSearch>
	    	</div>
	    </el-tab-pane>
	  </el-tabs>
</div>
</template>

<script>
import FactorySearch from "./factorySearch";
import BatchSearch from "./batchSearch";
export default({
	name:"energySearch",
	data(){
		return {
			msg:"这是能源查询页面",
			activeName: 'factorySearch',
			bigWorkshopArrays:[],
			bigDrugNameArrays:[],
		}
	},
	mounted(){
		this.handleStoreBigWorkshop();
		this.handleStoreBigDrugName();
		this.handleStoreAllRecordsOptions();
	},
	methods: {
	  handleStoreBigWorkshop(){
	  	this.$store.dispatch("deviceManageEnergySearch/bigWorkshopArrays");
	  },
	  handleStoreBigDrugName(){
	  	this.$store.dispatch("deviceManageEnergySearch/bigDrugNameArrays");
	  },
	  handleStoreAllRecordsOptions(){
	  	this.$store.dispatch("deviceManageEnergySearch/handleRequestRecords");
	  },
      handleClick(tab, event) {
        //console.log(tab, event);
      }
   },
   components:{FactorySearch,BatchSearch},
})
</script>

<style lang="scss" scoped>
div.energySearch{
	width: 100%;
	div.wrapper{
		/*padding: 20px;*/
	}
}
div.energySearch /deep/ div.tabsWrapper{
		width: 100%;
		/*height: 100%;   此处放在可以取消滚动条*/     
		div.el-tabs__header{
			background:white;
			/*margin-bottom:10px;*/
			margin-bottom: 0px!important;
			div.el-tabs__nav-wrap{
				padding-left: 20px;
				div.el-tabs__item{
					height: 48px;
					line-height: 48px;
				}
			}
		}
		div.el-tabs__content{
			width: 100%;
			height: calc(100% - 48px);
			/*background: white;*/
		}
	}
</style>