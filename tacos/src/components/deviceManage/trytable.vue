<template>
<div class="trytable">
	<el-table
		class="table"
    :data="conData"
    border>
    <el-table-column
      prop="orderNum"
      label="序号">
      <template slot-scope="scope">
        {{scope.row.orderNum}}
      </template>
    </el-table-column>
    <el-table-column
      prop="device"
      label="设备名称" width="200">
      <template slot-scope="scope">
        {{scope.row.device}}
      </template>
    </el-table-column>
    <el-table-column
      prop="instrument"
      label="仪表名称">
      <template slot-scope="scope">
        {{scope.row.instrument}}
      </template>
    </el-table-column>
    <el-table-column
      prop="metrics"
      label="指标">
      <template slot-scope="scope">
        {{scope.row.metrics}}
      </template>
    </el-table-column>
    <el-table-column
      prop="value"
      label="数值">
      <template slot-scope="scope">
        <span :class="'saveSpan'+scope.row.id" style="display: block;">{{scope.row.value}}</span>
        <el-input :class="'editeInput editeInput'+scope.row.id" v-model="scope.row.value" style="display: none;"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="unit"
      label="单位">
      <template slot-scope="scope">
        {{scope.row.unit}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row,scope)" type="text" size="small" :class="'editeBtn'+scope.row.id" style="display: block;">编辑</el-button>
        <el-button @click="handleSave(scope.$index,scope.row,scope)" type="text" size="small" :class="'saveBtn'+scope.row.id" style="display: none;">保存</el-button>
      </template>
    </el-table-column>
 </el-table>
  <div class="pange" v-if="totalLenght>9">
  	<el-pagination
	 	class="pagination"
	 	background
	  layout="prev, pager, next"
	  @current-change="handleCurrentChange"
	  :total="totalLenght"
	  :page-size="8">
	</el-pagination>
	<a @click="downloadTable" class="downa">导出表格</a>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default ({
	name:"Trytable",
	props:["deviceManageArray"],
	data(){
		return {
			total:"0",
			conData:[],
			seen:false,
		}
	},
	computed:{
		totalLenght(){
			var self = this;
			self.total = self.deviceManageArray.length;
			self.conData = self.deviceManageArray.slice(0,8);
			return self.total;
		}
	},
	methods: {
	  handleCurrentChange(val){
	  	var indexNext = (val-1)*8;
	  	this.conData = this.deviceManageArray.slice(indexNext,indexNext+8);
	  	//console.log(this.deviceManageArray);
	  	//console.log(this.$store.state.bigDeviceManageArrays);
	  },
      handleClick(index,row,con) {
      	//console.log("wang",index);
        document.getElementsByClassName("editeInput"+row.id)[0].style.display = "block";
        document.getElementsByClassName("saveSpan"+row.id)[0].style.display = "none";
        document.getElementsByClassName("saveBtn"+row.id)[0].style.display = "block";
        document.getElementsByClassName("editeBtn"+row.id)[0].style.display = "none";
      },
      handleSave(index,row,con) {
        document.getElementsByClassName("editeInput"+row.id)[0].style.display = "none";
        document.getElementsByClassName("saveSpan"+row.id)[0].style.display = "block";
        document.getElementsByClassName("saveBtn"+row.id)[0].style.display = "none";
        document.getElementsByClassName("editeBtn"+row.id)[0].style.display = "block";
        console.log(row.id,row.value)
        this.$store.dispatch("deviceManageEnergySearch/deviceManageEdite",row);
      },
      downloadTable(){
      	//console.log(this.$store.state.bigDeviceManageArrays);
      	var datas = this.$store.state.deviceManageEnergySearch.bigDeviceManageArrays//从后端获取的原数据；
      	//字符串拼接：
      	var tableDown = document.createElement("table");
      	tableDown.setAttribute("class", "tableDown")
      	document.body.appendChild(tableDown);//把元素放进body标签里面
      	var strThead = `
      		<thead width="100%">
      			<tr width="100%">
      				<th>序号</th>
      				<th>工艺名称</th>
      				<th width="20%">设备名称</th>
      				<th width="20%">仪表名称</th>
      				<th>指标</th>
      				<th>数值</th>
      				<th>单位</th>
      			</tr>
      		</thead>
      		<tbody class="tableTBody" width="100%"></tbody>
      	`;
      	document.getElementsByClassName("tableDown")[0].innerHTML = strThead;
      	var tableTBody = document.getElementsByClassName("tableTBody")[0];
      	var strTbody = '';
      	datas.forEach(function(data,index,datas){
      		strTbody += "<tr><td>"+data.id+"</td><td>"+data.process+"</td><td>"+data.device+"</td><td>"+data.instrument+"</td><td>"+data.metrics+"</td><td>"+data.value+"</td><td>"+data.unit+"</td></tr>"
      	})
      	tableTBody.innerHTML = strTbody;
      	var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByClassName("tableDown")[0].outerHTML + "</body></html>";
        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
        var blob = new Blob([html], { type: "application/vnd.ms-excel" });
        var a = document.getElementsByClassName("downa")[0];
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        a.href = URL.createObjectURL(blob);
        // 设置文件名
        a.download = "设备管理列表.xls";
        document.body.removeChild(tableDown);//把元素从body中删除
      }
    }
	
	
})
</script>

<style lang="scss" scoped>
div.trytable{
	background: white;
	min-height: 600px;
	padding:20px 60px;
	overflow: hidden;
    	div.table{
	    	margin-bottom: 20px;
	    	width: 100%;
	    	/deep/ thead tr{ 
	    		width: 100%;
	    		th{
		    		text-align: center;
		    		background: #eef3f7;
		    	}
	    	}
	    	/deep/ tbody tr td{
	    		text-align: center;
	    		.cell{
		    		button{
		    			margin: 0 auto;
		    		}
		    		div{
		    			input{
		    				text-align: center;
		    			}
		    		}
	    		}
	    	}
	    	/deep/ tbody tr:nth-child(2n){
	    		background: #fafbfd;
	    	}
	    }
	    div.pagination{
	    	text-align: center;
	    }
	    /*/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
	    	background: #838aa8;
	    }*/
	    
	    div.pange{
	    	width: 100%;
			position: relative;
	    }
	    /*导出按钮*/
	    a.downa{
			position: absolute;
			right: 0;
			top:-10px;
			text-align: center;
			text-decoration: none;
			width: 100px;
		    height: 38px;
		    border-radius: 8px;
		    line-height: 40px;
		    font-size: 14px;
		    border:1px solid #409EFF;
		    color: #4d5269;
		}
		a.downa:hover{
			background: #66b1ff;
			border-color: #66b1ff;
			color: white;
		}
		a.downa:active{
			background: #3a8ee6;
			border-color:#3a8ee6;
			color: white;
		}
}

.editeInput,.saveBtn{
	display: none;
}
.saveSpan,.editBtn{
	display: block;
}


</style>