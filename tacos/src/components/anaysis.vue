<template>
	<div class="anaysis">
		<div v-if="seen" class="had">
		<Bars 
			v-bind:title="title"
			v-bind:legend="legend"
			v-bind:tooltipFormatter="tooltipFormatter"
			v-bind:xAxisData="xAxisData"
			v-bind:yAxisFormat="yAxisFormat"
			v-bind:seriesDataSeconed="seriesDataSeconed"
		></Bars>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Bars from "@/components/public/bars";
	
export default ({
	name:"anaysis",
	data(){
		return {
			title:"能源分析",
			legend:["蒸气用量","耗电量","耗水量"],
			tooltipFormatter:'{b} 年<br />{a0} : {c0} %<br />{a1} : {c1} %<br />{a2} : {c2} %<br />',
			xAxisData:null,
			yAxisFormat:'{value} ％',
			seriesDataSeconed:null,
			requestDatas:null,
			seen:false,
		}
	},
	mounted(){
		this.handleRequestDatas();
	},
	methods:{
		handleRequestDatas(){
			//从后台中获取数据
			var self = this;
			axios.get("/static/mockData/anaysis.json").then(res=>{
				//console.log(res.data);
				self.handleDatas(res.data);
			}).catch(err=>{
				console.log(err);
			})
		},
		handleDatas(data){
			var self = this;
			//console.log(data);
			self.requestDatas = data;
			self.xAxisData = data.time;
			var seriesDataSeconed = [{
		        	name:self.legend[0],
		            type:'bar',
		            data:data.qi,
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color: 'rgba(104, 253, 255, 0.7)',
						},
					},
		        },{
		        	name:self.legend[1],
		            type:'bar',
		            data:data.shui,
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color:'rgba(253, 200, 106, 0.7)',
						},
					},
		        },{
					name:self.legend[2],
		            type:'bar',
		            data:data.dian,
					itemStyle: {//图形样式
						normal: {
							barBorderRadius: [5, 5, 0, 0],
							color:'rgba(127, 128, 225, 0.7)',
						},
					},
				}];
			self.seriesDataSeconed = seriesDataSeconed;
			self.seen = true;
		},
	},
	components:{Bars},
})
</script>

<style lang="scss" scoped>
div.anaysis{
	width: 100%;
	height: 100%;
	padding:20px;
	background: white;
}
div.had{
	width: 100%;
	height: 100%;
}
</style>