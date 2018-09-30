import React,{Component} from "react";
import Head from "../public/header.js";
import Side from "../public/side.js";
import { Layout } from 'antd';
import "../style/airSystem.css"
const {Content}  = Layout;
export default class GmpPage extends Component{
    constructor(){
        super()
        this.state={
            openKeys:['sub2'],
            defaultSelectedKeys:['7'],
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
                                <ul className="windSpeed">
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
                            <td><button className="topBtn" disabled="true">空调</button><button type="primary">启动</button><button type="primary">停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">空调</button><button>启动</button><button>停机</button></td>
                        </tr>
                        <tr>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">值班</button><button>启动</button><button>停机</button></td>
                        </tr>
                        <tr>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
                            <td><button className="topBtn" disabled="disabled">消毒</button><button>启动</button><button>停机</button></td>
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
                </Content>
            </div>
        )
    }
}