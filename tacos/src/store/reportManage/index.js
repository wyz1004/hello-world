import axios from "axios";
var state = {
	lists:[],
};
var mutations = {
	lists(state,datas){
		//console.log(datas);
		var objType={
			"饼状图":1,
			"柱状图":0,
			"报表数据":2,
			"折线图":3
		}
		var objClassify={
			"水气电表":1,
			"蒸汽表":0,
			"水量表":2,
			"电量表":3
		}
		var objZyn = {                                                       
			"年":0,
			"季度":1,
			"月":2,
			"天":3
		}
		function get_Date(tm){  
          var d = new Date(tm);    //根据时间戳生成的时间对象 
          var date = (d.getFullYear()) + "-" +  
                  (d.getMonth() + 1) + "-" + 
                  (d.getDate()); 
                  return date; 
        }
		if(datas.length){
			datas.forEach(function(data,index,datas){
				data.key = index +1;
				data.utilitiesTime = get_Date(data.utilitiesTime);
				data.utilitiesTimeUse = data.utilitiesTime;
				data.utilitiesUpdatetime = get_Date(data.utilitiesUpdatetime);
				for(var zyn in objZyn){
					if(data.utilitiesZyn===objZyn[zyn]){
						data.utilitiesZyn = zyn;
					}
				}
				for(var classify in objClassify){
					if(data.utilitiesClassify===objClassify[classify]){
						data.utilitiesClassify = classify;
					}
				}
				for(var type in objType){
					if(data.utilitiesType === objType[type]){
						data.utilitiesType = type;
					}
				}
			})
		}else{
			datas = [];
		}
		
		//console.log(datas);
		return state.lists = datas;
	}
};
var actions = {
	//http://10.110.180.50:8010/ssm/utilities/toUtilitiesList.do
	//获取后端的列表
	lists({commit}){
		//axios.get("http://10.110.180.50:8010/ssm/utilities/toUtilitiesList.do").then(res=>{
		axios.get("/static/reportManage/lists.json").then(res=>{
		//console.log(res.data);
		console.log(res.data);
			commit("lists",res.data);
		}).catch(err=>{
			console.log(err);
		})
	},
	SearchInput({commit,dispatch},payload){
		/*utilitiesName: "fs"	utilitiesType: "2"*/
		axios.get("http://10.110.180.50:8010/ssm/utilities/selectByWhere.do?utilitiesType="+payload.utilitiesType+"&utilitiesName="+payload.utilitiesName).then((res)=>{
			commit("lists",res.data);
		}).catch(err=>{
			console.log(err);
		})
	},
	listsDel({commit,dispatch},payload){
		axios.get("http://10.110.180.50:8010/ssm/utilities/delUtilities.do?utilitiesId="+payload).then((res)=>{
	        if(res.data.success==true){
	        	console.log("del")
	        	dispatch("lists");
	        }
	      }).catch((err)=>{
	        console.log(err);
	      })
	},
};
	
export default {
	namespaced:true,
	state,mutations,actions
}
