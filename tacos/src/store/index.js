import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//引入设备管理和能源查询页面的store
import deviceManageEnergySearch from "./deviceManageEnergySearch";
import reportManage from "./reportManage";
export default new Vuex.Store({
	modules:{
		deviceManageEnergySearch:deviceManageEnergySearch,
		reportManage:reportManage,
	}
})
