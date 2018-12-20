import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Try01 from "@/components/vuex/try01";
import Try02 from "@/components/vuex/try02";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/try01',
      name: 'Try01',
      component: Try01
    },
    {
      path: '/try02',
      name: 'Try02',
      component: Try02
    }
  ]
})
