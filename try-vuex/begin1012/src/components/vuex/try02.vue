<template>
	<div class="try02">
		<router-link to="/" class="link">返回到主页</router-link><router-link to="/try01" class="link">进入try01页面</router-link>
		<p @click="clicklog">点击打印</p>
		<p>{{count}}</p>
		<p>
			<button @click="increment">store加1</button>
			<button @click="decrement">store减1</button>
		</p>
	</div>
</template>

<script>
export default ({
	name:"try01",
	computed:{
		count(){
			return this.$store.state.count;//决定了本组件中变量count中显示什么；eg:若return 5； 则渲组件时就显示5；
		}
	},
	methods:{
		clicklog(){
			console.log(this.$store.state.count);
		},
		increment(){
			this.$store.commit("increment");
		},
		decrement(){
			this.$store.commit("decrement");
		}
	}
	
})
</script>

<style scoped>
	.link{
		margin-right: 30px;
	}
</style>