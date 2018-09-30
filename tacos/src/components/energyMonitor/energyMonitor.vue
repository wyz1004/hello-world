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
   mounted(){
   	  let self = this;
   	  this.hanleRouteChange(self.$route);	
   },
   	watch:{
   		//用watch监测路由变化；；解决的是子路由变化模板（子组件的模板）数据不更新的问题。这里要解决的是子路由跳转父组件不刷新的问
        $route(now,old) {
            //console.log(now,old);//now = this.$route
	   		this.hanleRouteChange(now);
        }
    },
    methods: {
       handleSelect:function(key, keyPath) {
       	var self = this;
//      console.log(key, keyPath);
		//console.log(this.$route.path);//{name: undefined, meta: {…}, path: "/energyMonitor/gas", hash: "", query: {…}, …}
		  if(key == "water"){
		  	this.$router.push({path:"water"})
		  	this._data.activeIndex = "water";
		  }else if(key == "gas"){
		  	this.$router.push({path:"gas"}) 
		  	this._data.activeIndex = "gas";
		  }
      },
      //改变默认选中menu的状态。
      hanleRouteChange(rou){
      	var pathCon = rou.path;
   		if(pathCon == "/energyMonitor/gas"){
   			this.activeIndex = "gas";
   		}else if(pathCon == "/energyMonitor/water"){
   			this.activeIndex = "water";
   		}
      }
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