import React,{Component} from "react";
import {Link} from 'react-router';
import { Layout } from "antd";
import axios from 'axios';
import Head from "../../public/header.js";
import Side from "../../public/side.js";
import SearchInput from "./SearchInput.js"
import CollectionsPage from './CollectionsPage'
import EditPage from './EditPage'
import { Table, Input, Button, Popconfirm, Form,Select  } from 'antd';
import "../../style/component.css"
import "../../style/reportManagement.css"

const Option = Select.Option;
const {Content}  = Layout;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

//select start
function handleChange(value) {
  // console.log(`selected ${value}`);
  var pickChart = value;
  // alert(pickChart)
  sessionStorage.setItem("pickChart",pickChart)
}

function handleBlur() {
  // console.log('blur');
}

function handleFocus() {
  // console.log('focus');
}

class EditableCell extends React.Component {
  state = {
    editing: false,
    dataSource:[]
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    console.log("edit")
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {    
    // console.log("save")
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}


export default class ReportManagement extends Component{

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  componentDidMount(){
    // this.checkTableData();
    document.body.style.backgroundColor = "#efefef";
    document.body.style.height = "100%";
  }
  componentWillMount(){
    this.checkTableData();
  }
  checkTableData(dataSource) {
    // console.log(dataSource);
    // const { count } = this.state;
    // axios.get("http://10.100.121.153:8010/ssm/utilities/toUtilitiesList.do").then((res)=>{
    axios.get("http://10.110.180.50:8010/ssm/utilities/toUtilitiesList.do").then((res)=>{
      this.getData=res.data;
      //按照需求转变格式：
        for(var i=0;i<this.getData.length;i++){
        if(this.getData[i].utilitiesType===1){
          this.getData[i].utilitiesType="饼状图";
        }else if(this.getData[i].utilitiesType===0){
          this.getData[i].utilitiesType="柱状图";
        }else if(this.getData[i].utilitiesType===2){
          this.getData[i].utilitiesType="报表数据"
        }else if(this.getData[i].utilitiesType===3){
          this.getData[i].utilitiesType="折线图"
        };
        if(this.getData[i].utilitiesClassify===1){
          this.getData[i].utilitiesClassify="水电汽表"
        }else if(this.getData[i].utilitiesClassify===0){
          this.getData[i].utilitiesClassify="蒸汽表"
        }else if(this.getData[i].utilitiesClassify===2){
          this.getData[i].utilitiesClassify="水量表"
        }else if(this.getData[i].utilitiesClassify===3){
          this.getData[i].utilitiesClassify="电量表"
        };
        if(this.getData[i].utilitiesZyn===2){
          this.getData[i].utilitiesZyn="月"
        }else if(this.getData[i].utilitiesZyn===3){
          this.getData[i].utilitiesZyn="天"
        }else if(this.getData[i].utilitiesZyn===0){
          this.getData[i].utilitiesZyn="年"
        }else if(this.getData[i].utilitiesZyn===1){
          this.getData[i].utilitiesZyn="季度"
        };
        function get_Date(tm){  
          var d = new Date(tm);    //根据时间戳生成的时间对象 
          var date = (d.getFullYear()) + "-" +  
                  (d.getMonth() + 1) + "-" + 
                  (d.getDate()); 
                  return date; 
          }
          this.getData[i].utilitiesTime=get_Date(this.getData[i].utilitiesTime)
          this.getData[i].utilitiesUpdatetime=get_Date(this.getData[i].utilitiesUpdatetime)
          this.getData[i].key = i;
      }
      if(dataSource){
        this.setState({
          dataSource: dataSource
        });
      }else{
        this.setState({
          dataSource: this.getData
        });
      }
      // console.log(this.getData)
    }).catch((err)=>{
      console.log(err);
    })
  }
  constructor(props) {
    super(props);
    this.checkTableData = this.checkTableData.bind(this);
    this.columns = [
      {
      title: '设备名称',
      dataIndex: 'utilitiesMetris',
      // width: '10%',
      // editable: true,
    },
     {
      title: '报表类型',
      dataIndex: 'utilitiesType',
      // editable: true,
    }, {
      title: '报表分类',
      dataIndex: 'utilitiesClassify',
      // editable: true,
    }, {
      title: '统计周期',
      dataIndex: 'utilitiesZyn',
      // editable: true,
    },{
      title: '报表名称',
      dataIndex: 'utilitiesName',
      // editable: true,
    },{
      title: '报表标题',
      dataIndex: 'utilitiesHeadline',
      // editable: true,
    },{
      title: '创建人',
      dataIndex: 'utilitiesCreator',
      // editable: true,
    },{
      title: '创建时间',
      dataIndex: 'utilitiesTime',
      // editable: true,
    }, {
      title: '更新人',
      dataIndex: 'utilitiesUpdate',
      // editable: true,
    },{
      title: '更新时间',
      dataIndex: 'utilitiesUpdatetime',
      // editable: true,
    },{
      title: 'operation',
      dataIndex: 'operation',
      width:'13%',
      render: (text, record) => {
        //record 就是这一行的记录
        if(record.utilitiesType==="饼状图"){
          record.utilitiesType=1;
        }else if(record.utilitiesType==="柱状图"){
          record.utilitiesType=0;
        }else if(record.utilitiesType==="报表数据"){
          record.utilitiesType=2
        }else if(record.utilitiesType==="折线图"){
          record.utilitiesType=3
        };
        return ( 
          this.state.dataSource.length > 0
            ? (<div>
                <Popconfirm title="确定要删除?" onConfirm={() => this.handleDelete(record.utilitiesId,record.key)}>
                  <a style={{paddingRight:5}} href="javascript:;">删除</a>
                </Popconfirm >
              <EditPage editMessage = {record}  checkTableData = {dataSource => this.checkTableData(dataSource)}></EditPage>
                  <Link to={
                    {
                      pathname:"/previewReport",
                      query:{
                        deviceId:record.utilitiesId,
                        type:record.utilitiesClassify,
                        picType:record.utilitiesType,
                        startTime:record.utilitiesStarttime,
                        endTime:record.utilitiesEndtime,
                        deviceName:record.utilitiesMetris, 
                        period:record.utilitiesZyn
                      }
                  }}>预览</Link>
            </div>
            ) : null
        );
      },
    },
  ];
    this.state = {
      dataSource: [
        /*{
        // key:0,
        // utilitiesId: '0',
        // utilitiesType: 'Edward King 0',
        // utilitiesClassify: '32',
        // utilitiesName: 'London, Park Lane no. 0',
        // utilitiesHeadline:'aaa',
        // utilitiesCreator:'',
        // utilitiesTime:'',
        // utilitiesUpdate:'',
        // utilitiesUpdatetime:'',
      }*/
    ],
      count: 0,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      openKeys: ['sub5'],
      defaultSelectedKeys:["5"],
    };
  }

  handleDelete = (id,key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    // axios.get("http://10.100.121.153:8010/ssm/utilities/delUtilities.do?utilitiesId="+id).then((res)=>{
    axios.get("http://10.110.180.50:8010/ssm/utilities/delUtilities.do?utilitiesId="+id).then((res)=>{
        this.deleteRow=res.data
        // console.log(this.deleteRow.success)
        if(this.deleteRow.success==true){
          this.checkTableData();
          window.location.reload()
        }
      }).catch((err)=>{
        console.log(err);
      })
  }

  handleAdd = (newData) => {
    const { count, dataSource } = this.state;
    newData = {
      key: count,
      utilitiesMetris: '',
      utilitiesType: '',
      utilitiesClassify: '',
      utilitiesZyn:'',
      utilitiesName: '',
      utilitiesHeadline:'',
      utilitiesCreator:'',
      utilitiesTime:'',
      utilitiesUpdate:'',
      utilitiesUpdatetime:'',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  handleSave = (row) => {
    // const newData = [...this.state.dataSource];
    // const index = newData.findIndex(item => row.key === item.key);
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });
    // this.setState({ dataSource: newData });
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        
        <Head />
			  <Side openKeys={this.state.openKeys} defaultSelectedKeys={this.state.defaultSelectedKeys} />
			  <Content>
        <div style={{padding:5,margin:5}}>
        {/* 下拉框 */}
        <div className="topContent">
          <Select
            className="ant-select"
            showSearch
            style={{ width: 200,marginRight:16 }}
            placeholder="报表类型"
            optionFilterProp="children"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="2">报表数据</Option>
            <Option value="0">柱状图</Option>
            <Option value="1">饼状图</Option>
            <Option value="3">折线图</Option>
          </Select>
          {/* 搜索框 */}
            <SearchInput placeholder="输入关键字" style={{ width: 200,marginRight:16 }}
             checkTableData = {dataSource => this.checkTableData(dataSource)} />
             <Button type="primary" style={{marginRight:16}}
              onClick={() => window.location.reload()}
             >重置查询</Button>
            {/* 新增按钮 */}
            <CollectionsPage checkTableData = {dataSource => this.checkTableData(dataSource)}/>
        </div>
        <div className="tableContent">
            {/* 表格 */}
            <Table
            className="tablePart"
               style={{marginTop:5}}
              components={components}
              rowClassName={() => 'editable-row'}
              // bordered
              dataSource={dataSource}
              columns={columns}
              // rowSelection={rowSelection} 
            />
        </div>
      </div>
      </Content>
      </div>
      
    );
  }
}
