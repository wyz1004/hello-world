<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <el-container>
		    <el-header class="header">
		    	<h1>{{title}}
					<a class="index_hf" href="https:www.baidu.com">
						<img src="@/assets/picture/home.png" :alt="imgAlt" :title="imgAlt" />
					</a>
				</h1>
		    </el-header>
		    <el-container>
		    <el-aside width="200px">
		  	<el-menu
		  		:unique-opened=true
		  		:router=true
      default-active="1-1"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <!--<el-menu-item-group>
          <template slot="title">分组一</template>-->
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        <!--</el-menu-item-group>
        <el-menu-item-group title="分组2">-->
          <el-menu-item index="1-3">选项3</el-menu-item>
        <!--</el-menu-item-group>-->
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </template>
      	<el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <!--</el-menu-item-group>
        <el-menu-item-group title="分组2">-->
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <!--</el-menu-item-group>
        <el-menu-item-group title="分组2">-->
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
		  </el-aside>
		  
		  <el-main class="main">
		  	<router-view/>
		  </el-main>
		  </el-container>
		</el-container>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
		return {
			title:"中医药能源管理",
			imgAlt:"返回主页",//如果和上文中的“返回主页”换成imgAlt这个变量名？
		}
	},
  methods:{
			handleSelect(key, keyPath) {
        		console.log(key, keyPath);
      		},
			handleOpen(key, keyPath) {
        		console.log(key, keyPath);
      		},
		    handleClose(key, keyPath) {
		        console.log(key, keyPath);
		    }
		}
}
</script>

<style lang="scss">
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
*{margin:0;padding:0;}
html,body{
	width: 100%;height: 100%;
	#app{
		height: 100%;
		section.el-container{
			height: 100%;
			section.el-container{
				height: calc(100% - 50px);
				aside.el-aside{
					ul.el-menu{
						height: 100%;
					}
				}
			}
		}
	}
}
body{
	background-color: #f0f2f5 !important;
}
/*头部样式*/
header.header{
	height: 50px!important;
	line-height: 50px;
	background: #000000;
	h1{
		color: white;
		text-align: lef;
		font-size: 1.2vw;
		a.index_hf{
			float: right;
			text-decoration: none;
			img{
				height: 25px;
				width: 25px;
				margin-right: 0;
			}
		}
	}
}
</style>
