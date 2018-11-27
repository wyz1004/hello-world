<template>
<div class="trypies">
	<Pie v-bind:optionsPie="optionsPie"></Pie>
</div>
</template>

<script>
import Pie from "../public/pies";
export default ({
	name:"trypies",
	data(){
		return {
			optionsPie:{
				title:'天气情况统计',
				xAxisData:['西凉', '益州','兖州','荆州','幽州','楼兰'],
				tooltipFormatter:"{a} <br/>{b} : {c} ({d}%)",
				seriesData:[
				        {
				            type: 'pie',
				            radius : '65%',
				            center: ['50%', '50%'],
				            selectedMode: 'single',
				            data:[
				                {value:798,name: '楼兰'},
				                {value:680,name: '幽州'},
				                {value:535, name: '荆州'},
				                {value:510, name: '兖州'},
				                {value:634, name: '益州'},
				                {value:735, name: '西凉'}
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ],
			}
		}
	},
	components:{Pie}
})
</script>

<style lang="scss" scoped>
div.trypies{
	background: white;
	width: calc(100% - 40px);
	height: calc(100% - 40px);
	padding:20px;
}
</style>