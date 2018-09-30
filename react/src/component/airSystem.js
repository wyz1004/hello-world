import React,{Component} from "react";
import Head from "../public/header.js";
import axios from 'axios';
import Side from "../public/side.js";
import { Layout } from 'antd';
import "./mockdata"
import "../style/airSystem.css"
const {Content}  = Layout;
export default class AirSystem extends Component{
    constructor(props){
        super(props)
        this.state={
            openKeys:['sub2'],
            defaultSelectedKeys:['6'],
            dataSource:{}
        }
        this.getData = this.getData.bind(this)
        this.btnState = this.btnState.bind(this)
    }
    componentDidMount(){
        let that = this;
        axios.get('/data',{dataType:'json'})
        .then((res) => {
            that.setState({
                dataSource:res.data.data
            })
        })
        this.getData()
    }
    //modified by wangyz9 start 2018/9/5 
    componentWillUnmount(){
        var that = this;
        window.clearInterval(that.timer);
    }
    //modified by wangyz9 start 2018/9/5
    getData(){
        let that = this;
		that.timer = setInterval(function (){
        axios.get('/data',{dataType:'json'})
        .then((res) => {
            that.setState({
                dataSource:res.data.data
            })
        })
		}, 5000);
    }
    btnState(){
        const {dataSource} = this.state;
        console.log("ding ==="+dataSource.theBtn)
        if(dataSource.theBtn===true){
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
    }
    render(){
        return(
            <div>
                <Head />
				<Side openKeys={this.state.openKeys} defaultSelectedKeys={this.state.defaultSelectedKeys}/>
                <Content>
                <table className="airTable">
                <thead>
                    <tr>
                        {/* <th>灌装B级区AHCU-F</th>
                        <th>配置C级区AHCU-D</th>
                        <th>轧盖C级AHCU-G</th>
                        <th>清洗、灭菌D级区AHCU-E</th>
                        <th>洗烘瓶D级区AHCU-C</th>
                        <th>外包、灯检区AHCU-H</th> */}
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
                            <td>回风温度 {this.state.dataSource.number1} <input defaultValue={this.state.dataSource.number9}/>℃</td>
                            <td>回风温度 29.1 <input/>℃</td>
                            <td>回风温度 29.1 <input/>℃</td>
                            <td>回风温度 29.1 <input/>℃</td>
                            <td>回风温度 29.1 <input/>℃</td>
                            <td>回风温度 29.1 <input/>℃</td>
                        </tr>
                        <tr>
                            <td>回风湿度 {this.state.dataSource.number2} <input defaultValue={this.state.dataSource.number10}/>%</td>
                            <td>回风湿度 47.5 <input/>%</td>
                            <td>回风湿度 47.5 <input/>%</td>
                            <td>回风湿度 47.5 <input/>%</td>
                            <td>回风湿度 47.5 <input/>%</td>
                            <td>回风湿度 47.5 <input/>%</td>
                        </tr>
                        <tr>
                            <td>送风风速 {this.state.dataSource.number3} M/S</td>
                            <td>送风风速 3.3 M/S</td>
                            <td>送风风速 3.3 M/S</td>
                            <td>送风风速 3.3 M/S</td>
                            <td>送风风速 3.3 M/S</td>
                            <td>送风风速 3.3 M/S</td>
                        </tr>
                        <tr>
                            <td>送风机频率 {this.state.dataSource.number4} Hz</td>
                            <td>送风机频率 3.3 Hz</td>
                            <td>送风机频率 3.3 Hz</td>
                            <td>送风机频率 3.3 Hz</td>
                            <td>送风机频率 3.3 Hz</td>
                            <td>送风机频率 3.3 Hz</td>
                        </tr>
                        <tr>
                            <td>风量 {this.state.dataSource.number5} m³/h</td>
                            <td>风量 666 m³/h</td>
                            <td>风量 666 m³/h</td>
                            <td>风量 666 m³/h</td>
                            <td>风量 666 m³/h</td>
                            <td>风量 666 m³/h</td>
                        </tr>
                        <tr>
                            <td>灌装间温度 {this.state.dataSource.number6}℃</td>
                            <td>配液间温度 25.0℃</td>
                            <td>轧盖间温度 24.7℃</td>
                            <td>洗涤干燥室温度 25.6℃</td>
                            <td>穿洁净衣间温度 25.8℃</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>灌装间湿度 {this.state.dataSource.number7}℃</td>
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
                            <td>灌装间压差 {this.state.dataSource.number8}<input defaultValue={this.state.dataSource.number11}/>Pa</td>
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
                            <td><button className="topBtn" disabled="true">空调</button><button onClick={this.btnState} id="airTurnOn">启动</button><button id="airTurnOff">停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                        </tr>
                        <tr>
                            <td><button className="topBtn" disabled="disabled">值班</button><button id="stayTurnOn">启动</button><button id="stayTurnOff">停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                        </tr>
                        <tr>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button id="clearTurnOn">启动</button><button id="clearTurnOff">停机</button></td>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
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
                </Content>
            </div>
        )
    }
}