<template>
<div class="optimization">
	<el-tabs v-model="activeName" @tab-click="handleClick" class="tabsWrapper">
	    <el-tab-pane label="公共设备" name="public">
	    	<div class="wrapper" v-if="seenPublic">
	    		<Bars v-bind:optionBars="optionBars"></Bars>
	    	</div>
	    </el-tab-pane>
	    <el-tab-pane label="中医药设备" name="medicine">
	    	<div class="wrapper" v-if="seenMedicine">
	    		<Bars v-bind:optionBars="optionBars"></Bars>
	    	</div>
	    </el-tab-pane>
	    		<!--<Lines
		    		v-bind:title="title"
		    		v-bind:legend="legend"
		    		v-bind:xAxisData="xAxisData"
		    		v-bind:yAxisFormat="yAxisFormat"
		    		v-bind:seriesDataSeconed="seriesDataSeconed"
		    		v-bind:markLine="markLine"
		    		v-bind:markPoint="markPoint"
		    	></Lines>-->
	</el-tabs>
</div>
</template>

<script>
import Bars from "../public/bars";	
export default ({
	name:"optimization",
	data(){
		return {
			seenPublic:true,
			seenMedicine:false,
			activeName: 'public',
			optionBars:{
				title:{
					text:"设备电能优化",
					left:"left",
				},
				legend:["2017年","2018年"],
				xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				yAxisFormat:'{value} °',
				tooltipFormatter:"{b} <br />{a0} : {c0} °<br />{a1} : {c1} °",
				seriesDataSeconed:[{
					name:"2017年",
		            type:'bar',
		            barWidth : 30,//柱图宽度
		            data:[134,125,167,145,139,150,119,168,169,194,154,176],
		            itemStyle: {//图形样式
							normal: {
								barBorderRadius: [5, 5, 0, 0],
								color: '#9999FF',
							},
						},
				},{
					name:"2018年",
		            type:'bar',
		            barWidth : 30,//柱图宽度
		            data:[34,25,67,45,39,50,19,68,69,94,54,76],
		            itemStyle: {//图形样式
							normal: {
								barBorderRadius: [5, 5, 0, 0],
								color:'#CC66FF',
							},
						},
				}],
			},
		}
	},
	methods:{
		handleClick(tab, event) {
	        //console.log(tab.index ==="1");
	        if(tab.index ==="1"){
	        	this.optionBars={
	        		title:{
						text:"中医药电能优化",
						left:"left",
					},
	        		yAxisFormat:'{value} °',
	        		legend:["批次一","批次二"],
					xAxisData:["煎煮","浓缩","纯化","干燥","制剂"],
					tooltipFormatter:"{b} <br />{a0} : {c0} °<br />{a1} : {c1} °",
					seriesDataSeconed:[{
						name:"批次一",
			            type:'bar',
			            barWidth : 30,//柱图宽度
			            data:[134,125,167,145,139],
			            itemStyle: {//图形样式
								normal: {
									barBorderRadius: [5, 5, 0, 0],
									color: '#FFCC33',
								},
							},
					},{
						name:"批次二",
			            type:'bar',
			            barWidth : 30,//柱图宽度
			            data:[68,69,94,54,76],
			            itemStyle: {//图形样式
								normal: {
									barBorderRadius: [5, 5, 0, 0],
									color: '#99CCFF',
								},
							},
					}],
	        	}
				this.seenPublic=false;
				this.seenMedicine=true;
	        }else if(tab.index ==="0"){
	       		this.optionBars={
					title:{
						text:"设备电能优化",
						left:"left",
					},
					legend:["2017年","2018年"],
					xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
					yAxisFormat:'{value} °',
					tooltipFormatter:"{b} <br />{a0} : {c0} °<br />{a1} : {c1} °",
					seriesDataSeconed:[{
						name:"2017年",
			            type:'bar',
			            barWidth : 30,//柱图宽度
			            data:[134,125,167,145,139,150,119,168,169,194,154,176],
			            itemStyle: {//图形样式
								normal: {
									barBorderRadius: [5, 5, 0, 0],
									color: '#9999FF',
								},
							},
					},{
						name:"2018年",
			            type:'bar',
			            barWidth : 30,//柱图宽度
			            data:[34,25,67,45,39,50,19,68,69,94,54,76],
			            itemStyle: {//图形样式
								normal: {
									barBorderRadius: [5, 5, 0, 0],
									color:'#CC66FF',
								},
							},
					}],
				};
	       		this.seenPublic=true;
				this.seenMedicine=false;
	       }
	      }
	},
	components:{
		Bars
	}
})
</script>

<style lang="scss" scoped>
div.optimization{
	width: 100%;
	height: 100%;
}
div.optimization /deep/ div.tabsWrapper{
		width: 100%;
		height: 100%;
		div.el-tabs__header{
			background:white;
			margin-bottom: 0px!important;
			/*margin:0 0 10px!important;*/
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
			background: white;
			div.el-tab-pane{
				width: 100%;
				height:100%;
				div.wrapper{
					width: calc(100% - 40px);
					height: calc(100% - 40px);
					padding: 20px;
				}
			}
		}
	}
</style>