<template>
	<div class="try01">
		<router-link to="/">返回</router-link>
		<router-link to="/try02">进入try02页面</router-link>	
		<p>{{count}}</p>
		<p>
			<button @click="increment">加1</button>
			<button @click="decrement">减1</button>
		</p>
	</div>
</template>

<script>
export default ({
	name:"try01",
	data(){
		return {
			count:0
		}
	},
	methods:{
		increment(){
			this.count ++;
		},
		decrement(){
			this.count --;
		}
	}
})
</script>

<style>
</style>