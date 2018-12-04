<template>
<div id="gmpPage">
	<table class="airTable">
        <thead>
            <tr>
                <!--<th>灌装B级区AHCU-F</th>
                <th>配置C级区AHCU-D</th>
                <th>轧盖C级AHCU-G</th>
                <th>清洗、灭菌D级区AHCU-E</th>
                <th>洗烘瓶D级区AHCU-C</th>
                <th>外包、灯检区AHCU-H</th> -->
                <th>A级洁净区</th>
                <th>B级洁净区</th>
                <th>C级洁净区</th>
                <th>D级洁净区</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                    <td>空气温度 <input/> (20-24)℃</td>
                    <td>空气温度 <input/> (20-24)℃</td>
                    <td>空气温度 <input/> (20-24)℃</td>
                    <td>空气温度 <input/> (18-26)℃</td>
                </tr>
                <tr>
                    <td>空气湿度 <input/> (45-60)%</td>
                    <td>空气湿度 <input/> (45-60)%</td>
                    <td>空气湿度 <input/> (45-60)%</td>
                    <td>空气湿度 <input/> (45-60)%</td>
                </tr>
                <tr>
                    <td>操作区风速 : 
                        <ul class="windSpeed">
                            <li>水平风速>= 0.54 M/S</li>
                            <li>垂直风速>= 0.36 M/S</li>
                        </ul>
                    </td>
                    <td>房间换气次数 : >= 25次/h</td>
                    <td>房间换气次数 : >= 25次/h</td>
                    <td>房间换气次数 : >= 15次/h</td>
                </tr>
                <tr>
                    <td>送风机频率 3.3 Hz</td>
                    <td>相对室外压差 >= 10Pa</td>
                    <td>相对室外压差 >= 10Pa</td>
                    <td>相对室外压差 >= 10Pa</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><button class="topBtn" disabled="true">空调</button><button type="primary">启动</button><button type="primary">停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                </tr>
                <tr>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                </tr>
                <tr>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                    <td><button class="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                </tr>
                <tr>
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
                </tr>
            </tbody>
        </table>
</div>
</template>

<script>
export default ({
	name:"gmpPage",
	data(){
		return {
			
		}
	},
})
</script>

<style lang="scss" scoped>
div#gmpPage{
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
.windSpeed li{
    height: 25px;
    line-height: 25px;
}
</style>