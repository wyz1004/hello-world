<template>
	<div class="energyMonitor">
		<div class="monitor_title">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="water">水蒸气监控</el-menu-item>
		  <el-menu-item index="gas">燃气监控与预警</el-menu-item>
		  <el-menu-item index="elec">电量监控</el-menu-item>
		  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">百度一下</a></el-menu-item>
		</el-menu>
		</div>
		<div class="monitor_content">
			<router-view />
		</div>
	</div>
</template>

<script>
import Water from "@/components/energyMonitor/water";
import Gas from "@/components/energyMonitor/gas";
export default({
	name:"EnergyMonitor",
	data() {
      return {
         activeIndex: 'water',
      };
   },
    methods: {
       handleSelect:function(key, keyPath) {
       	var self = this;
//      console.log(key, keyPath);
		  if(key == "water"){
		  	this.$router.push({path:"water"})
		  	this._data.activeIndex = "water";
		  }else if(key == "gas"){
		  	this.$router.push({path:"gas"}) 
		  	this._data.activeIndex = "gas";
		  }
      },
    },
    components:{
    	Water,
    	Gas
    }
})
</script>

<style lang="scss">
	div.energyMonitor{
		height: 100%;
	}
	div.monitor_content{
		height: calc(100% - 71px);
		margin-top:10px;
		background: white;
	}
</style>