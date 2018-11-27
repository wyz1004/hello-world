<template>
	<div class="forecast">
		<el-tabs v-model="activeName" @tab-click="handleClick" class="tabsWrapper">
		    <el-tab-pane label="水量预测" name="water">
		    	<div class="wrapper" v-if="seenWater">
		    		<Lines v-bind:optionsUse="optionsUse"></Lines>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="燃气量预测" name="gas">
		    	<div class="wrapper" v-if="seenGas">
		    		<Lines v-bind:optionsUse="optionsUse"></Lines>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="电量预测" name="elec">
		    	<div class="wrapper" v-if="seenElec">
		    		<Lines v-bind:optionsUse="optionsUse"></Lines>
		    		<!--<Lines
			    		v-bind:title="title"
			    		v-bind:legend="legend"
			    		v-bind:xAxisData="xAxisData"
			    		v-bind:yAxisFormat="yAxisFormat"
			    		v-bind:seriesDataSeconed="seriesDataSeconed"
			    		v-bind:markLine="markLine"
			    		v-bind:markPoint="markPoint"
			    	></Lines>-->
		    	</div>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import Lines from "@/components/public/lines";
export default ({
	name:"Forecast",
	data(){
		return {
			seenWater:true,
			seenElec:false,
			seenGas:false,
			activeName: 'water',
			optionsUse:{
				title:{
					text:"水量预测",
					left:"left",
				},
				legend:["2017年用水量","2018年用水量"],
				xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				yAxisFormat:'{value}  m³',
				seriesDataSeconed:[{
						name:"2017年用水量",
						type:'line',
						// barWidth : 30,//柱图宽度
						data:[78,75,125,105,99,59,39,120,124,134,100,100],
					},{
						name:"2018年用水量",
						type:'line',
						// barWidth : 30,//柱图宽度
						color:'#FA8072',
						data:[34,25,67,45,39,50,19,68,69,94,54,76],
					}],
				markLine:null,
				markPoint:null,
			},
		}
	},
	methods:{
		handleClick(tab, event) {
	        //console.log(tab.index ==="1");
	        if(tab.index ==="1"){
	        	this.optionsUse={
	        		title:{
						text:"水蒸气用量预测",
						left:"left",
					},
	        		yAxisFormat:'{value} m³',
	        		legend:["2017年用水蒸气量","2018年用水蒸气量"],
	        		xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
	        		seriesDataSeconed:[{
							name:"2017年用水蒸气量",
				            type:'line',
			              // barWidth : 30,//柱图宽度
				            data:[134,125,167,145,139,150,119,168,169,194,154,176],
						},{
							name:"2018年用水蒸气量",
				            type:'line',
			              // barWidth : 30,//柱图宽度
			              color:'#FA8072',
				            data:[34,25,67,45,39,50,19,68,69,94,54,76],
						}],
					markLine:null,
					markPoint:null,
	        	}
				this.seenElec = false;
				this.seenGas = true;
				this.seenWater = false;
	        }else if(tab.index ==="2"){
	        	this.optionsUse={
	        		title:{
						text:"电量预测",
						left:"left",
					},
					yAxisFormat:'{value} °',
					legend:["2017年用电量","2018年用电量"],
					xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
					seriesDataSeconed:[{
						name:"2017年用电量",
			            type:'line',
		              // barWidth : 30,//柱图宽度
			            data:[78,75,125,105,99,59,39,120,124,134,100,100],
					},{
						name:"2018年用电量",
			            type:'line',
		              // barWidth : 30,//柱图宽度
		              color:'#FA8072',
			            data:[34,25,67,45,39,50,19,68,69,94,54,76],
					}],
					markLine:null,
					markPoint:null,
	        	}
				this.seenElec = true;
				this.seenGas = false;
				this.seenWater = false;
	       }else if(tab.index ==="0"){
	       		this.optionsUse={
					title:{
						text:"水量预测",
						left:"left",
					},
					legend:["2017年用水量","2018年用水量"],
					xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
					yAxisFormat:'{value}  m³',
					seriesDataSeconed:[{
							name:"2017年用水量",
							type:'line',
							// barWidth : 30,//柱图宽度
							data:[78,75,125,105,99,59,39,120,124,134,100,100],
						},{
							name:"2018年用水量",
							type:'line',
							// barWidth : 30,//柱图宽度
							color:'#FA8072',
							data:[34,25,67,45,39,50,19,68,69,94,54,76],
						}],
					markLine:null,
					markPoint:null,
				};
	       		this.seenElec = false;
				this.seenGas = false;
				this.seenWater = true;
	       }
	      }
	},
	components:{
		Lines
	}
})
</script>

<style lang="scss" scoped>
div.forecast{
	width: 100%;
	height: 100%;
}
div.forecast /deep/ div.tabsWrapper{
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