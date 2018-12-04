<template>
	<div id="airSystem">
		<table class="airTable">
			<thead>
	            <tr>
	             	<!--<th>灌装B级区AHCU-F</th>
	                <th>配置C级区AHCU-D</th>
	                <th>轧盖C级AHCU-G</th>
	                <th>清洗、灭菌D级区AHCU-E</th>
	                <th>洗烘瓶D级区AHCU-C</th>
	                <th>外包、灯检区AHCU-H</th>-->
	                <th>A级洁净区</th>
	                <th>B级洁净区</th>
	                <th>C级洁净区</th>
	                <th>D级洁净区</th>
	                <th>洗烘瓶D级区AHCU-C</th>
	                <th>外包、灯检区AHCU-H</th>
	            </tr>
	        </thead>
	        <tbody>
	            <tr>
	            	<!--input中的value，再丁春雨的代码中是用的defaultValue-->
                    <td>回风温度{{dataSource.number1}} <input type="text" :value="dataSource.number9"/>℃</td>
                    <td>回风温度 29.1 <input/>℃</td>
                    <td>回风温度 29.1 <input/>℃</td>
                    <td>回风温度 29.1 <input/>℃</td>
                    <td>回风温度 29.1 <input/>℃</td>
                    <td>回风温度 29.1 <input/>℃</td>
                </tr>
                <tr>
                    <td>回风湿度{{dataSource.number2}} <input type="text" :value="dataSource.number10"/>%</td>
                    <td>回风湿度 47.5 <input/>%</td>
                    <td>回风湿度 47.5 <input/>%</td>
                    <td>回风湿度 47.5 <input/>%</td>
                    <td>回风湿度 47.5 <input/>%</td>
                    <td>回风湿度 47.5 <input/>%</td>
                </tr>
                <tr>
                    <td>送风风速{{dataSource.number3}} M/S</td>
                    <td>送风风速 3.3 M/S</td>
                    <td>送风风速 3.3 M/S</td>
                    <td>送风风速 3.3 M/S</td>
                    <td>送风风速 3.3 M/S</td>
                    <td>送风风速 3.3 M/S</td>
                </tr>
                <tr>
                    <td>送风机频率{{dataSource.number4}} Hz</td>
                    <td>送风机频率 3.3 Hz</td>
                    <td>送风机频率 3.3 Hz</td>
                    <td>送风机频率 3.3 Hz</td>
                    <td>送风机频率 3.3 Hz</td>
                    <td>送风机频率 3.3 Hz</td>
                </tr>
                <tr>
                    <td>风量{{dataSource.number5}} m³/h</td>
                    <td>风量 666 m³/h</td>
                    <td>风量 666 m³/h</td>
                    <td>风量 666 m³/h</td>
                    <td>风量 666 m³/h</td>
                    <td>风量 666 m³/h</td>
                </tr>
                <tr>
                    <td>灌装间温度{{dataSource.number6}}℃</td>
                    <td>配液间温度 25.0℃</td>
                    <td>轧盖间温度 24.7℃</td>
                    <td>洗涤干燥室温度 25.6℃</td>
                    <td>穿洁净衣间温度 25.8℃</td>
                    <td></td>
                </tr>
                <tr>
                    <td>灌装间湿度{{dataSource.number7}}℃</td>
                    <td>配液间湿度 25.0℃</td>
                    <td>轧盖间湿度 24.7℃</td>
                    <td>洗涤干燥室湿度 25.6℃</td>
                    <td>穿洁净衣间湿度 25.8℃</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>灌装间压差 {{dataSource.number8}}<input type="text" :value="dataSource.number11"/>Pa</td>
                    <td>配液间压差23.4<input/>Pa</td>
                    <td>轧盖间压差23.4<input/>Pa</td>
                    <td>洗涤干燥室压差23.4<input/>Pa</td>
                    <td>穿洁净衣间压差23.4<input/>Pa</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>称量室压差23.4<input/>Pa</td>
                    <td>轧盖清洗灭菌间压差23.4<input/>Pa</td>
                    <td>器具灭菌室压差23.4<input/>Pa</td>
                    <td>洗涤烘干间压差23.4<input/>Pa</td>                        
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>润碾室压差23.4<input/>Pa</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><button class="topBtn" disabled="true">空调</button><button @click="btnState" id="airTurnOn">启动</button><button id="airTurnOff">停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                </tr>
                <tr>
                    <td><button class="topBtn" disabled="disabled">值班</button><button id="stayTurnOn">启动</button><button id="stayTurnOff">停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                </tr>
                <tr>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button id="clearTurnOn">启动</button><button id="clearTurnOff">停机</button></td>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
	</div>
</template>

<script>
import axios from "axios";
import "../../../static/mockjs/mockdata.js"
export default ({
	name:"airSystem",
	data(){
		return {
			home:"这是 空调净化系统",
			dataSource:{}
		}
	},
	mounted(){
		let that = this;
        axios.get('/data',{dataType:'json'})
        .then((res) => {
        	that.dataSource = res.data.data;
        })
        this.getData();
	},
	methods:{
		getData(){
	        let that = this;
			that.timer = setInterval(function (){
		        axios.get('/data',{dataType:'json'})
		        .then((res) => {
		            that.dataSource = res.data.data;
		        })
			}, 5000);
	   },
	   btnState(){
	        console.log("ding ==="+this.dataSource.theBtn)
	        if(this.dataSource.theBtn===true){
	            document.getElementById("clearTurnOn").disabled = true
	            document.getElementById("clearTurnOn").style.background = "#ccc"
	            document.getElementById("stayTurnOn").disabled = true
	            document.getElementById("stayTurnOn").style.background = "#ccc"
	        }else{
	            document.getElementById("clearTurnOn").disabled = false
	            document.getElementById("clearTurnOn").style.background = "#63B8FF"
	            document.getElementById("stayTurnOn").disabled = false
	            document.getElementById("stayTurnOn").style.background = "#63B8FF"
	            document.getElementById("airTurnOn").disabled = true
	            document.getElementById("airTurnOn").style.background = "#ccc"
	        }
    	},
	},
	beforeDestroy(){
		var self = this;
		window.clearInterval(self.timer);
	}
})
</script>

<style lang="scss" scoped>
div#airSystem{
	width: 100%;
	height: auto;
}
.airTable{
    font-size: 12px;
    width: 100%;
    background: #ffffff;
    margin-bottom: 20px;
    border: 1px solid #dedede;
    color: #333333;
    border-collapse: collapse;
}
.airTable button{
    text-align: center;
    width: 45px;
    height: 25px;
    line-height: 25px;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    background: #63B8FF;
    color: #ffffff;
    cursor:pointer;
}
.airTable input{
	box-sizing: border-box;
    padding-left: 5px;
    width: 50px;
    display: inline-block;
    margin-right: 5px;
    margin-left: 5px;
    border: 1px solid #63B8FF;
    border-radius: 2px;
}
.airTable tr{
    height: 35px;
    box-sizing: border-box;
    /* border: 1px solid #dedede; */
}
/* .airTable td:nth-child(2n-1),th:nth-child(2n-1){
    background: #b2d6eb;
} */
.airTable thead tr:nth-child(1){
    background: #859197;
}
.airTable th{
    text-align: center;
}
.airTable td{
    padding-left: 10px;
    border-left: #dedede 1px solid;
}
.topBtn{
    background: #EE2C2C!important;
    cursor: default!important;
}
</style>