import React, { Component } from 'react';
import { Layout } from 'antd';
import "../style/public.css"
const { Header } = Layout;
export default class Head extends Component{
	componentDidMount(){
		
	}
	render(){
		return (
			<Layout className="header">
		      <Header>
		      	<h1>中医药能源管理
					<a className="index_hf" href="http://10.100.2.68:8080/">
						<img src="./picture/home.png" alt="返回主页" />
					</a>
				</h1>
		      </Header>
		    </Layout>
		)
	}
}