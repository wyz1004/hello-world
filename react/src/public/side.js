import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import "../style/public.css"
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class Side extends Component{
	constructor(props){
		super(props);
		this.state = {
			rootSubmenuKeys:['sub1', 'sub2', 'sub3','sub4','sub5','sub6'],
			openKeys: this.props.openKeys,
			defaultSelectedKeys:this.props.defaultSelectedKeys,
		}
	}
	onOpenChange = (openKeys) => {
		let rootSubmenuKeys = this.state.rootSubmenuKeys;
	    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
	    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
	      this.setState({ openKeys });
	    } else {
	      this.setState({
	        openKeys: latestOpenKey ? [latestOpenKey] : [],
	      });
	    }
	}

	render(){
		return (
			<Layout>
		        <Sider className="side">
		          <Menu
		          	defaultSelectedKeys={this.state.defaultSelectedKeys}
		          	openKeys={this.state.openKeys}
		            mode="inline"
		            theme="light"
		            style={{ height: '100%' }}
		            onOpenChange={this.onOpenChange}
		          >
		            <Menu.Item key="1">
			            <Link to="/energyMonitor" className="subLink">
		            	  <Icon type="dashboard" />
			              <span>能源监控</span>
			            </Link>
		            </Menu.Item>
						<SubMenu key="sub2" title={<span><Icon type="setting" /><span>能源优化</span></span>}>
						
					  <Menu.Item key="2">
						<Link to="/optimization" className="subLink">
					      <Icon type="rocket" />
						  <span>能源优化</span>
						</Link>
					  </Menu.Item>
						<Menu.Item key="6">
						<Link to="/airSystem" className="subLink">
					      <Icon type="rocket" />
						  <span>空调净化系统</span>
						</Link>
					  </Menu.Item>
						<Menu.Item key="7">
						<Link to="/gmpPage" className="subLink">
					      <Icon type="rocket" />
						  <span>新版GMP洁净度等级</span>
						</Link>
					  </Menu.Item>
					  <Menu.Item key="8">
						<Link to="/efficiencyReport" className="subLink">
					      <Icon type="rocket" />
						  <span>批次能效报表</span>
						</Link>
					  </Menu.Item>
					</SubMenu> 
		              <Menu.Item key="3">
						<Link to="/forecast" className="subLink">
		                  <Icon type="schedule" />
						  <span>能源预测</span>
						</Link>
					  </Menu.Item>
		              <Menu.Item key="5">
						<Link to="/reportManagement" className="subLink">
		                  <Icon type="table" />
						  <span>报表管理</span>
						</Link>
					  </Menu.Item>
		              <Menu.Item key="4">
						<Link to="/" className="subLink">
		                  <Icon type="appstore" />
						  <span>能源分析</span>
						</Link>
					  </Menu.Item>
		          </Menu>
		        </Sider>
		    </Layout>
		)
	}
}

/*<Menu.Item key="4">
 <Link to="/previewReport" className="subLink">
  <span>预览报表</span>
</Link>
</Menu.Item>
<SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据统计</span></span>}>
<Menu.Item key="1">
<Link to="/electricity" className="subLink">
  <span>电量统计</span>
 </Link>
</Menu.Item>

<Menu.Item key="2">
<Link to="/" className="subLink">
  <span>蒸气统计</span>
</Link>
</Menu.Item>
<Menu.Item key="3">
<Link to="/water" className="subLink">
  <span>水量统计</span>
</Link>
</Menu.Item>
</SubMenu> 
<SubMenu key="sub3" title={<span><Icon type="appstore" /><span>能源预测</span></span>}>
  <Menu.Item key="5">
	<Link to="/monitor" className="subLink">
	  <span>实时监测</span>
	</Link>
  </Menu.Item>
  <Menu.Item key="6">
	  <a className="subLink" 
	  	 onClick={()=>window.location.href = "https://www.baidu.com"}>
		<span>能源监控</span>
	  </a>
  </Menu.Item>
</SubMenu> 


<SubMenu key="sub6" title={<span><Icon type="setting" /><span>试一试</span></span>}>
  <Menu.Item key="6">
	<Link to="/Try" className="subLink">
      <Icon type="appstore" />
	  <span>子传父</span>
	</Link>
  </Menu.Item>
  <Menu.Item key="7">
	<Link to="/electricity" className="subLink">
      <Icon type="appstore" />
	  <span>电量统计</span>
	 </Link>
  </Menu.Item>
  <Menu.Item key="8">
	<Link to="/gas" className="subLink">
      <Icon type="appstore" />
	  <span>蒸气统计</span>
	</Link>
  </Menu.Item>
  <Menu.Item key="9">
	<Link to="/water" className="subLink">
	  <Icon type="appstore" />
	  <span>水量统计</span>
	</Link>
  </Menu.Item>
</SubMenu> 
*/



