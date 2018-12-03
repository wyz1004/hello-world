import axios from "axios";
var state={
		bigWorkshopArrays:[],
		bigProcessArrays:[],
		bigDrugNameArrays:[],
		allRecordsOptions:[],
		deviceManageArrays:[],//理好关系的数组
		bigDeviceManageArrays:[],//从后端获取过来的元数据
		searchCriteria:{},//查询条件
		energyResultsArray:[],//能源查询结果
		energyReaultsBars:{},//这是柱状图和折线图的结果
		energyReaultsPies:{},//这是饼状图的结果
		/*factoryResultsArrays:[],
		batchResultsArrays:[]*/
};
var mutations={
		//获取车间、工艺、设备的名称列表
		handleBigWorkshopArrays(state,datas){
	      	var workshopArrays=[];//所有车间
	      	var bigProcessArrays=[];//所有工艺
	      	var enterpriseName = undefined;
	      	datas.forEach(function(data,index,datas){
	      		workshopArrays.push(data.workshop);
	      		bigProcessArrays.push(data.process);
	      	})
	      	//所有车间组成的数组；并去重；["提取车间","制剂车间"]
	      	workshopArrays = [...new Set(workshopArrays)]
	      	state.bigProcessArrays = [...new Set(bigProcessArrays)];//给store中的bigProcessArrays赋值；
	      	
	      	var bigWorkshopArrays = [{value:datas[0].enterprise,label:"全部车间"}];//层次关系的最外层数组，[{},{},{}]
	      	//将企业名称存到localStorage
	      	localStorage.setItem("enterpriseName",datas[0].enterprise);
	      	for(var j = 0;j<workshopArrays.length;j++){
	      		var processArrays = [];//某个车间内部的全部工艺；
		      	for(var i =0;i<datas.length;i++){
		      		if(workshopArrays[j] == datas[i].workshop){
		      			processArrays.push(datas[i].process);
		      		}
		      	}
		      	processArrays = [...new Set(processArrays)];//去重  ["提取工艺","浓缩工艺","层析工艺","醇沉工艺","乙醇回收工艺"]
		      	
		      	var allProcessArrays = [{value:workshopArrays[j],label:"全部工艺"}];//[{},{},{},{},{},{}]
		      	
		      	for(var m = 0;m<processArrays.length;m++){
		      		/*var deviceArrays = [{value:processArrays[m],label:"全部设备"}];//某个工艺下的全部设备  [{label:"全部是设备"},{label:"设备1"}，{label:"设备2"}]
		      		for(var n = 0;n<datas.length;n++){
		      			if(processArrays[m] == datas[n].process){
		      				deviceArrays.push({value:datas[n].device,label:datas[n].device});
		      			}
		      		}*/
		      		//allProcessArrays.push({value:processArrays[m],label:processArrays[m],children:deviceArrays});
		      		allProcessArrays.push({value:processArrays[m],label:processArrays[m]});
		      		continue;
		      	}
		      	bigWorkshopArrays.push({value:workshopArrays[j],label:workshopArrays[j],children:allProcessArrays});
		      	continue;
	      	}
	      	//console.log(bigWorkshopArrays);
	      	
	      	//给store中的bigWorkshopArrays赋值；
	      	state.bigWorkshopArrays = bigWorkshopArrays;
		},
		//获取药品名称、批次号的名称列表
		handleBigDrugNameArrays(state,datas){
			var bigDrugNameArrays = [];
	      	var drugNameArrays = [];
	      	datas.forEach(function(data,index,datas){
	      		drugNameArrays.push(data.medicine);
	      	})
	      	drugNameArrays = [...new Set(drugNameArrays)];
	      	//console.log(drugNameArrays);
	      	var batchNumArrays
	      	drugNameArrays.forEach(function(drugNameArray,ind,drugNameArrays){
	      		batchNumArrays = [];
	      		datas.forEach(function(data,index,datas){
	      			if(drugNameArray == data.medicine){
	      				batchNumArrays.push({value:data.batch,label:data.batch});
	      			}
	      		})
	      		bigDrugNameArrays.push({
	      			value:drugNameArray,
	      			label:drugNameArray,
	      			children:batchNumArrays
	      		})
	      	})
	      	//console.log(bigDrugNameArrays);
	      	state.bigDrugNameArrays = bigDrugNameArrays;
		},
		//获取车间查询页面中，整个工厂的总消耗；
		handleAllRecordsOptions(state,datas){
			//console.log(datas);
			var tapWater,pureWater,water=0,elec,steam;
			for(var i=0;i<datas.length;i++){
				if(datas[2*i]=="自来水"){
		    		tapWater =datas[2*i + 1].toFixed(2)
		    		water += datas[2*i + 1];
		    	}else if(datas[2*i] =="纯化水"){
		    		pureWater = datas[2*i + 1].toFixed(2)
		    		water += datas[2*i + 1];
		    	}else if(datas[2*i] =="电量"){
		    		elec = datas[2*i + 1].toFixed(2);
		    	}else if(datas[2*i] =="蒸汽量"){
		    		steam = datas[2*i + 1].toFixed(2);
		    	}
			}
		    /*datas.forEach(function(data,index,datas){
		    	if(data[0].energy=="自来水"){
		    		tapWater =data[0].sum
		    	}else if(data[0].energy =="纯化水"){
		    		pureWater = data[0].sum
		    	}else if(data[0].energy =="电量"){
		    		elec = data[0].sum
		    	}else if(data[0].energy =="蒸汽量"){
		    		steam = data[0].sum
		    	}
		    })*/
		   // water = tapWater+pureWater;
		    //console.log(water,elec,steam)
		    state.allRecordsOptions = [
		    	{imgPath:require("@/assets/picture/water.png"),name:'水共消耗',sum:water,errTip:"水的图标",unit:"m³",duo:'自来水'+tapWater+"m³；"+'纯化水'+pureWater+"m³"},
		    	{imgPath:require("@/assets/picture/elec.png"),name:'电共消耗',sum:elec,errTip:"电的图标",unit:"°"},
		    	{imgPath:require("@/assets/picture/steam.png"),name:'蒸气共消耗',sum:steam,errTip:"蒸气的图标",unit:"㎏"}
		    ]
		},
		//获取设备管理列表
		handleDeviceManageArrays(state,datas){
			//console.log(datas);
			var deviceManageArrays = [];
			var processArrays = [];
			datas.forEach(function(data,index,datas){
				processArrays.push(data.process);
			})
			processArrays = [...new Set(processArrays)];
			processArrays.forEach(function(processArray,ind,processArrays){
				var deviceArrays = [];
				datas.forEach(function(data,index,datas){
					if(processArray == data.process){
						deviceArrays.push(data);
					}
				})
				//给数组的每一项添加一个序号，并返回改变之后的数组；
				deviceArrays.forEach(function(deviceArray,index,deviceArrays){
		      		deviceArray.orderNum = index + 1;
		      	})
				deviceManageArrays.push({label:processArray,value:"process"+ind,children:deviceArrays});
			})
			//console.log(deviceManageArrays);
			state.deviceManageArrays = deviceManageArrays;
			state.bigDeviceManageArrays = datas;
		},
		//从页面中获取查询条件-------车间查询的条件
		handleSearchCriteriaFactory(state,form){
			//console.log("factort",form);
			var l = form.search.length;
            var dateStart = new Date(form.startTime);
            var dateEnd = new Date(form.endTime);
            var startYear = dateStart.getFullYear();
            var endYear = dateEnd.getFullYear();
            var startTimeMonthUse;
            if((dateStart.getMonth()+1)<10){
            	startTimeMonthUse = "0"+(dateStart.getMonth()+1);
            }else{
            	startTimeMonthUse = dateStart.getMonth()+1;
            }
            var endTimeMonthUse;//传给后端的月份；
            var endTimeMonthUse1;
            if((dateEnd.getMonth()+2)<10){
            	endTimeMonthUse = "0"+(dateEnd.getMonth()+2);
            	endTimeMonthUse1 = "0"+(dateEnd.getMonth()+1);
            }else if((dateEnd.getMonth()+2)>12){
            	endTimeMonthUse = "01";
            	endYear = endYear+1
            }else{
            	endTimeMonthUse = dateEnd.getMonth()+2;
            	endTimeMonthUse1 = dateEnd.getMonth()+1;
            }
            console.log(dateStart.getMonth(),dateEnd.getMonth());
            form.searchUse = form.search[l-1];
            form.startTimeUse = startYear+"-"+startTimeMonthUse+"-01 00:00:00";//传给后端
            form.endTimeUse = endYear+"-"+endTimeMonthUse+"-01 00:00:00";//传给后端
            form.time = startYear+"."+startTimeMonthUse+"~"+endYear+"."+endTimeMonthUse1;
            /*form:{
	        	search:[],
	        	energyType:"",--------
	        	reportType:"",
	        	startTime:"",
	        	endTime:"",
	        	dataType:"",
	        	searchUse:"",-------
	        	startTimeUse:"",-----
	        	endTimeUse:"",------
	        },*/
	       	localStorage.setItem("form",JSON.stringify(form));
	       	state.searchCriteria = form;
		},
		//从页面中获取查询条件-------批次查询的条件
		handleSearchCriteriaDrug(state,form){
	            var l = form.search.length;
	            form.searchUse = form.search[l-1];
	            form.dataType = "batchSearch";
	            /*form:{
		        	search:[],
		        	energyType:"",
		        	layer:"",
		        	reportType:"",
		        },*/
		       localStorage.setItem("form",JSON.stringify(form));
	           state.searchCriteria = form;
		},
		handelFactoryResultsArrays(state,datas){
			var form = JSON.parse(localStorage.getItem("form"));
			var unitWord = undefined;//单位汉字
			var unitSymbol = undefined;//单位符号
			var price = undefined;//价格计算
			if(form.energyType=="纯化水"||form.energyType=="自来水"){
				unitWord = "立方";//m³㎏°
				unitSymbol ="m³";
				price = 2;
			}else if(form.energyType=="电量"){
				unitWord = "度"
				unitSymbol ="°";
				price = 4;
			}else if(form.energyType=="蒸汽量"){
				unitWord = "千克"
				unitSymbol="㎏";
				price = 8;
			}else{
				unitWord ="";
			}
			var sum = 0;//计算占总量的百分比；
			var xaiso = [];//柱状图x轴上的数据
			var yaiso = [];//柱状图y轴上的数据
			var pieDatas=[];//饼状图中series的数据
			var ObjListArrs = [];
			for(var i = 0;i<datas.length;i++){
				if(i%2){
					yaiso.push(datas[i]);//400
					sum += datas[i];
				}else{
					
					xaiso.push(datas[i]);//设备
				}
			}
			
			yaiso.forEach(function(data,index,yaiso){
					pieDatas.push({"value":data,"name":xaiso[index]})
					ObjListArrs.push({
						"value":data,
						"name":xaiso[index],
						"row":index+1,
						"time":form.time,
						"energy":form.energyType,
						"unitValue":unitWord,
						"unitSymbol":unitSymbol,
						"unitPrice":"元",
						"price":data * price,
						"percentage":((data/sum)*100).toFixed(2) +"%"
					})
				})
			
			if(form.reportType =="table"){
				state.energyResultsArray=ObjListArrs;
			}else if(form.reportType === 'bar'||form.reportType === 'line'){
				var obj = {
					xaiso,yaiso,unitSymbol
				}
				state.energyReaultsBars = obj;
			}else if(form.reportType === 'pie'){
				var obj = {
					xaiso,pieDatas,unitSymbol
				}
				state.energyReaultsPies = obj;
			}
		},
		handleBatchResultsArrays(state,datas){
			var form = JSON.parse(localStorage.getItem("form"));
			var unitWord = undefined;//单位汉字
			var unitSymbol = undefined;//单位符号
			if(form.energyType=="纯化水"||form.energyType=="自来水"){
				unitWord = "立方";//m³㎏°
				unitSymbol ="m³";
			}else if(form.energyType=="电量"){
				unitWord = "度"
				unitSymbol ="°";
			}else if(form.energyType=="蒸汽量"){
				unitWord = "千克"
				unitSymbol="㎏";
			}else if(form.energyType=="总量"){
				unitSymbol=" ";
			}
			var xaiso=[],yaiso=[];
			var pieDatas=[];//饼状图中series的数据;
			var ObjListArrs = [];
			for(var i = 0;i<datas.length;i++){
				if(i%2){
					yaiso.push(datas[i]);//400
				}else{
					
					xaiso.push(datas[i]);//设备
				}
			}
			yaiso.forEach(function(data,index,yaiso){
					pieDatas.push({"value":data,"name":xaiso[index]})
					if(xaiso[index]==="纯化水"||xaiso[index]==="自来水"){
						unitWord = "立方";
//						unitSymbol ="m³";
					}else if(xaiso[index]=="电量"){
						unitWord = "度"
//						unitSymbol ="°";
					}else if(xaiso[index]=="蒸汽量"){
						unitWord = "千克"
//						unitSymbol="㎏";
					}
					ObjListArrs.push({
						"value":data,
						"name":xaiso[index],
						"row":index+1,
						"drugName":form.search[0],
						"batchNum":form.search[1],
						"energy":form.energyType,
						"unitValue":unitWord,
					})
				})
			
			if(form.reportType =="table"){
				state.energyResultsArray=ObjListArrs;
			}else if(form.reportType === 'bar'||form.reportType === 'line'){
				
				var obj = {
					xaiso,yaiso,unitSymbol
				}
				state.energyReaultsBars = obj;
			}else if(form.reportType === 'pie'){
				var obj = {
					xaiso,pieDatas,unitSymbol
				}
				state.energyReaultsPies = obj;
			}
		},
};
var actions={
		bigWorkshopArrays({commit}){
			axios.get("http://10.110.180.50:8020/TZYEnergy/Dimension/toDimensionList.do").then(res=>{
			//axios.get("/static/handle/layers.json").then(res=>{
	      		//commit("handleBigWorkshopArrays",res.data.layersFactory);
	      		commit("handleBigWorkshopArrays",res.data);
	      	}).catch(err=>{
	      		console.log(err);
	      	})
	      	
		},
		bigDrugNameArrays({commit}){
			//axios.get("http://10.110.180.50:8020/TZYEnergy/batch/toBatchList.do").then(res=>{
	      	axios.get("/static/handle/layers.json").then(res=>{
	      		commit("handleBigDrugNameArrays",res.data.layersDrug);
	      		//commit("handleBigDrugNameArrays",res.data);
	      	}).catch(err=>{
	      		console.log(err);
	      	})
		},
		//获取消耗总记录
		handleRequestRecords({commit}){
			var self = this;
			var now = new Date();
			var yearNow = now.getFullYear();
			var monthNow = now.getMonth()+1;
			if(monthNow<10){
				monthNow = "0" +monthNow;
			}
			var dateNow = now.getDate();
			//console.log(yearNow,monthNow,dateNow);
			var startTime = yearNow+"-01"+"-01 "+"00:00:00";
			var endTime = yearNow +"-"+ monthNow+"-" +(dateNow-1) +" 24:00:00"
			//console.log(startTime,endTime);
			var str = "staTime="+startTime+"&endTime="+endTime;
			//console.log(str);
			//axios.get("http://10.110.180.50:8020/TZYEnergy/energy/getSQDByTime.do?"+str).then(res=>{
				//console.log(res.data);
				//commit("handleAllRecordsOptions",res.data)
			axios.get("/static/mockData/search.json").then(res=>{
				commit("handleAllRecordsOptions",res.data.now)
			}).catch(err=>{
				console.log(err);
			})
		},
		//获取设备管理列表
		deviceManageArrays({commit}){
			//axios.get("/static/mockData/deviceManage.json").then(res=>{
	      	axios.get("http://10.110.180.50:8020/TZYEnergy/device/toDeviceList.do").then(res=>{
	      		commit("handleDeviceManageArrays",res.data);
	      	}).catch(err=>{
	      		console.log(err);
	      	})
		},
		//修改设备管理列表中的某一项
		deviceManageEdite({commit,dispatch},payload){
			axios.get("http://10.110.180.50:8020/TZYEnergy/device/upDeviceById.do?value="+payload.value+"&id="+payload.id).then(res=>{
	        	//console.log(res)
	        	if(res.success=="true"){
	        		//console.log(res.msg);
	        		//this.$emit("handleRequestDatas");//调用父组件中的方法
	        		dispatch("deviceManageArrays");
	        	}
	        }).catch(err=>{
	        	console.log(err);
	        })
		},
		//获取车间查询结果
		factoryResultsArrays({commit,dispatch},payload){
			var form = JSON.parse(localStorage.getItem("form"));
			var searchUse = form.searchUse;
			var energyType = form.energyType;
			var startTime = form.startTimeUse;
			var endTime = form.endTimeUse;
			var str = '';
			if(searchUse.indexOf("工艺") !== -1){
				console.log("工艺")
				str = "http://10.110.180.50:8020/TZYEnergy/energy/getWorkShop.do?staTime="+startTime+"&endTime="+endTime+"&energy="+energyType+"&process="+searchUse;
			}else if(searchUse.indexOf("车间")!== -1){
				console.log("车间")
				str = "http://10.110.180.50:8020/TZYEnergy/energy/getWorkShop.do?staTime="+startTime+"&endTime="+endTime+"&energy="+energyType+"&workshop="+searchUse;
			}else{
				console.log("企业")
				str = "http://10.110.180.50:8020/TZYEnergy/energy/getWorkShop.do?staTime="+startTime+"&endTime="+endTime+"&energy="+energyType+"&enterprise="+searchUse;
			}
			//axios.get("/static/handle/layersResult.json").then(res=>{
			axios.get(str).then(res=>{
				console.log(res.data);
				commit("handelFactoryResultsArrays",res.data);
				//commit("handelFactoryResultsArrays",res.data.useFactoryResults);
			}).catch(err=>{
				console.log(err);
			})
		},
		//获取批次查询结果
		batchResultsArrays({commit,dispatch},payload){
			var form = JSON.parse(localStorage.getItem("form"));
			var batch = form.search[1];
			var energyType = form.energyType;
			var medicine = form.search[0];
			var layer = form.layer;
			//console.log(energyType,layer);
			var str = "http://10.110.180.50:8020/TZYEnergy/batch/getBatch.do?energy="+energyType+"&ziduan="+layer+"&batch="+batch+"&medicine="+medicine;
			//axios.get(str).then(res=>{
			axios.get("/static/handle/layersResult.json").then(res=>{
				//console.log(res.data);
				//commit("handleBatchResultsArrays",res.data)
				commit("handleBatchResultsArrays",res.data.useBatchResultAll)
			}).catch(err=>{
				console.log(err);
			})
		},
	};
	//将三者暴露出去
export default {
	namespaced:true,
	state,mutations,actions
}
