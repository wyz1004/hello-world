<template>
	<div class="hello">
		<h2>{{title}}</h2>
	</div>
</template>

<script>
	export default {
		name:"HelloVue",
		data(){
			return {
				title:"欢迎来到vue世界，祝您旅途愉快"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hello{
		width: 100%;
		height: 200px;
		h2{
			width: 100%;
			text-align: center;
			background: gray;
		}
	}
		
	
</style>