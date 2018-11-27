import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/day01/HelloWorld'

import HelloVue from "@/components/day01/HelloVue"
import NewCom from "@/components/day01/newCom";
import EnergyMonitor from "@/components/energyMonitor/energyMonitor";
import Water from "@/components/energyMonitor/water";
import Gas from "@/components/energyMonitor/gas";
import Elec from "@/components/energyMonitor/elec";
import TryMonitor from "@/components/energyMonitor/tryMonitor";
//import Anaysis from "@/components/anaysis";
import Forecast from "@/components/forecast";
import Optimization from "@/components/optimization";
import TryPie from "@/components/day01/tryPie";
import FormTry from "@/components/reportManagement/form";
//import Trytable from "@/components/day01/trytable"
import ReportManage from "@/components/reportManage/index";
import DeviceManage from "@/components/deviceManage/deviceManage";
import EnergySearch from "@/components/energySearch/energySearch";
import EnergyResult from "@/components/energyResult";

import TryDialog from "@/components/day01/tryDialog";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/anaysis',
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
    		{path:"tryMonitor",component:TryMonitor},
    		{path:"elec",component:Elec},
    	]
    },
    {
    	path:"/",
    	name:"Anaysis",
    	component:resolve=>require(["@/components/anaysis"],resolve)
    },
    {
    	path:"/forecast",
    	name:"Forecast",
    	component:Forecast
    },{
    	path:"/optimization",
    	name:"Optimization",
    	component:Optimization
    },{
    	path:"/trypie",
    	name:"TryPie",
    	component:TryPie
    },{
    	path:"/tryDialog",
    	name:"TryDialog",
    	component:TryDialog
    },
    {
    	path:"/form",
    	name:"FormTry",
    	component:FormTry
    },{
    	path:"/reportManage",
    	name:"ReportManage",
    	component:ReportManage
    },
    {
    	path:"/energySearch",
    	name:"EnergySearch",
    	component:EnergySearch
    },
    {
    	path:"/energyResult",
    	name:"EnergyResult",
    	component:EnergyResult
    },
    {
    	path:"/deviceManage",
    	name:"DeviceManage",
    	component:DeviceManage
    }
  ]
})
