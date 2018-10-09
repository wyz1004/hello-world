import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import HelloVue from "@/components/day01/HelloVue"
import NewCom from "@/components/newCom";
import EnergyMonitor from "@/components/energyMonitor/energyMonitor";
import Water from "@/components/energyMonitor/water";
import Gas from "@/components/energyMonitor/gas";
//import Anaysis from "@/components/anaysis";
import Forecast from "@/components/forecast";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path:"/helloVue",
    	name:"HelloVue",
    	component:HelloVue
    },
    {
    	path:"/main",
    	name:"NewCom",
    	component:NewCom
    },
    {
    	path:"/energyMonitor",
    	name:"EnergyMonitor",
    	component:EnergyMonitor,
    	redirect:"/energyMonitor/water",
    	children:[
    		{path:"water",component:Water},
    		{path:"gas",component:Gas},
    	]
    },
    {
    	path:"/anaysis",
    	name:"Anaysis",
    	component:resolve=>require(["@/components/anaysis"],resolve)
    },
    {
    	path:"/forecast",
    	name:"Forecast",
    	component:Forecast
    },
  ]
})
