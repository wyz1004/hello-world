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
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/energyMonitor/water">
        <i class="el-icon-setting"></i>
        <span slot="title">能源监控</span>
      </el-menu-item>
      <el-menu-item index="/forecast">
        <i class="el-icon-setting"></i>
        <span slot="title">能源预测</span>
      </el-menu-item>
      <el-submenu index="/1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <!--<el-menu-item-group>
          <template slot="title">分组一</template>-->
          <el-menu-item index="/anaysis">welcome</el-menu-item>
          <el-menu-item index="/form">form trying</el-menu-item>
        <!--</el-menu-item-group>
        <el-menu-item-group title="分组2">-->
          <el-menu-item index="/1-3">选项3</el-menu-item>
        <!--</el-menu-item-group>-->
        <el-submenu index="/1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="/1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="/2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </template>
      	<el-menu-item index="/2-1">选项1</el-menu-item>
        <el-menu-item index="/2-2">选项2</el-menu-item>
        <!--</el-menu-item-group>
        <el-menu-item-group title="分组2">-->
        <el-menu-item index="/2-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="/3">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </template>
        <el-menu-item index="/3-1">选项1</el-menu-item>
        <el-menu-item index="/3-2">选项2</el-menu-item>
        <!--</el-menu-item-group>
        <el-menu-item-group title="分组2">-->
        <el-menu-item index="/3-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="/">
        <i class="el-icon-setting"></i>
        <span slot="title">能源分析</span>
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
			defaultActive:"/",//默认打开侧边栏的哪一项？
		}
	},
	watch:{
   		//用watch监测路由变化；；解决的是子路由变化模板（子组件的模板）数据不更新的问题。这里要解决的是子路由跳转父组件不刷新的问
        $route(now,old) {
            //console.log(now.path,old.path);//now = this.$route
            this.handleFleshAndChangeRoute(now.path);
        }
    },
  mounted(){
  	var self = this;
  		this.handleFleshAndChangeRoute(self.$route.path);
  },
  methods:{
  	handleFleshAndChangeRoute(now){
  		if(now == "/energyMonitor/gas" || now =="/energyMonitor/water"){
  			this.defaultActive  = "/energyMonitor/water"
  		}else{
  			this.defaultActive = now;
  		}
  	},
			handleSelect(key, keyPath) {
        		//console.log(key, keyPath);
      		},
			handleOpen(key, keyPath) {
        		//console.log(key, keyPath);
      		},
	    handleClose(key, keyPath) {
	        //console.log(key, keyPath);
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
					background: #2a2f43;/*为解决滚动条滚动到最下方时，侧边栏底下（原超出部分）不是白色*/
					ul.el-menu{
						height: 100%;
						background: #2a2f43;
						/*一级菜单的样式*/
					}
				}
			}
		}
	}
}				
/*
li[role="menuitem"]{
	color: white;/*二级菜单的样式
	i,i:hover{
		color: white;/*一级菜单的样式
	}
	div,div:hover{
		color: white;
		span,span:hover{
			color: white;
		}
	}
}*/
ul.el-menu.el-menu-vertical-demo{
	/*一级菜单*/
	li.el-menu-item{
		i{}
		span{}
	}
	/*二级菜单*/
	li.el-submenu{
		div.el-submen__title{
			i{}
			span{}
		}
		ul.el-menu.el-menu--inline{
			li.el-menu-item{
				
			}
			/*三级菜单*/
			li.el-submenu{
				div.el-submenu__title{
					
				}
				ul.el-menu.el-menu--inline{
					
				}
			}
			
		}
	}
}
/*li.is-active{
	width: calc(100% + 1px);
	background: rgb(77,82,105);
	border-right: 3px solid #2a2f43;
}*/

body{
	background-color: #f0f2f5 !important;
}
/*头部样式*/
header.header{
	height: 50px!important;
	line-height: 50px;
	background: #001529;
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

/*能源预测中tabs的样式-----问题：使用在自定义组件中使用scoped，elementui的样式改变不了。
 * 解决办法1:将样式定义到全局中
 * 解决办法2:使用深度作用选择器----见forecast.vue中的样式
 * */
/*div.tabsWrapper{
		div.el-tabs__header{
			background:white;
		}
	}*/
</style>
