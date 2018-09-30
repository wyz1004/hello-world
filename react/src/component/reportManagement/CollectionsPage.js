import React from "react";
import axios from 'axios';
import { Input, Button, Form,Select,Modal,DatePicker  } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import "../../style/component.css"
const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
     class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        //datepicker start  
        function onChange(date,dateString){
          // console.log(dateString,"时间选择器")
        }
  
        //datepicker end
        return (
          <Modal
            visible={visible}
            title="新增"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
            <FormItem label="设备名称">
                  {getFieldDecorator('utilitiesMetris', {
                    rules: [{ required: true, message: '设备名称不能为空' }],
                  })(
                    <Select
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch
                    style={{ width: "100%"}}
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="steam_collector001">steam_collector001</Option>
                    <Option value="steam_collector002">steam_collector002</Option>
                    <Option value="steam_collector003">steam_collector003</Option>
                    <Option value="steam_collector004">steam_collector004</Option>
                  </Select>,
                  )}
                </FormItem>
              <FormItem label="报表类型">
                {getFieldDecorator('tableType',{
                  rules: [{ required: true, message: '报表类型不能为空' }],
                })
                (
              <Select showSearch 
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择">
                  <Option key='0' value="0">柱状图</Option>
                  <Option key='1' value="1">饼状图</Option>
                  <Option key='2' value="2">报表数据</Option>
                  <Option key='3' value="3">折线图</Option>
                </Select>
              )}
              </FormItem>
              <FormItem label="报表分类">
                {getFieldDecorator('tableClassify',{
                  rules: [{ required: true, message: '报表分类不能为空' }],
                })(
                <Select 
                getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch placeholder="请选择" >
                  <Option key='0' value="0">蒸汽表</Option>
                  <Option key='1' value="1">水电汽表</Option>
                  <Option key='2' value="2">水量表</Option>
                  <Option key='3' value="3">电量表</Option>
                </Select>
              )}
              </FormItem>
              <FormItem label="统计周期">
                {getFieldDecorator('utilitiesZyn',{
                  rules: [{ required: true, message: '统计周期不能为空' }],
                })(
                <Select 
                getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch placeholder="请选择" >
                  <Option key='3' value="3">天</Option>
                  <Option key='2' value="2">月</Option>
                  <Option key='0' value="0">年</Option>
                  <Option key='1' value="1">季度</Option>
                </Select>
              )}
              </FormItem>
              <FormItem label="报表名称">
                {getFieldDecorator('tableName',{
                  rules: [{ required: true, message: '报表名称不能为空' }],
                })(<Input type="textarea" />)}
              </FormItem>
              <FormItem label="报表标题">
                {getFieldDecorator('tableTitle',{
                  rules: [{ required: true, message: '报表标题不能为空' }],
                })(<Input type="textarea" />)}
              </FormItem>
              <FormItem label="创建人">
              {getFieldDecorator('tableCreate',{
                rules: [{ required: true, message: '创建人不能为空' }],
              })(<Input type="textarea" />)}
              </FormItem>
              <FormItem label="开始-结束时间">
                {getFieldDecorator('tableUpdateTime',{
                  rules: [{ required: true, message: '开始时间-结束时间不能为空' }],
                })(<RangePicker
                  className="dataPicker"
                  locale={locale}
                 getPopupContainer={triggerNode => triggerNode.parentNode} onChange={onChange} />)}
              </FormItem>
              <FormItem label="更新人">
                {getFieldDecorator('tableUpdate',{
                  rules: [{ required: true, message: '更新人不能为空' }],
                })(<Input type="textarea" />)}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );
  
  export default class CollectionsPage extends React.Component {
    state = {
      visible: false,
    };
    showModal = () => {
      this.setState({ visible: true });
    }
  
    handleCancel = () => {
      this.setState({ visible: false });
    }
  
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        // var formateCreateTime = new Date(values.tableCreateTime._d);
        // var formateCreateTime_value=Date.parse(formateCreateTime.getFullYear() + '-' + (formateCreateTime.getMonth() + 1) + '-' + formateCreateTime.getDate()); 
       
        var formateStartTime = new Date(values.tableUpdateTime[0]._d);
        var formateStartTime_value=formateStartTime.getFullYear() + '-' + (formateStartTime.getMonth() + 1) + '-' + formateStartTime.getDate()+
        " " +"00" + ":" +"00" +":"+"00"; 
        var formateEndTime = new Date(values.tableUpdateTime[1]._d);
        var formateEndTime_value=formateEndTime.getFullYear() + '-' + (formateEndTime.getMonth() + 1) + '-' + formateEndTime.getDate()+
        " " +"00" + ":" +"00" +":"+"00"; ; 
        // console.log("时间戳"+formateStartTime_value)
        // console.log("默认时间 更新",formateStartTime)
        values.tableUpdateTime[0] = formateStartTime_value;
        values.tableUpdateTime[1] = formateEndTime_value;
  
        values.tableType = parseInt(values.tableType)
        values.tableClassify = parseInt(values.tableClassify)
        values.utilitiesZyn = parseInt(values.utilitiesZyn)
        // console.log("ding values.utilitiesZyn===",values.utilitiesZyn)
  
        axios.get("http://10.100.121.153:8010/ssm/utilities/addOrUpdateUtilities.do?utilitiesType="+values.tableType+
        "&utilitiesMetris="+values.utilitiesMetris+"&utilitiesClassify="+values.tableClassify+
        "&utilitiesName="+values.tableName+"&utilitiesHeadline="+values.tableTitle+
        "&utilitiesStarttime="+values.tableUpdateTime[0]+
        "&utilitiesEndtime="+values.tableUpdateTime[1]+
        "&utilitiesCreator="+values.tableCreate+
        "&utilitiesUpdate="+values.tableUpdate+"&utilitiesZyn="+values.utilitiesZyn
        ).then((res)=>{
          this.addData=res.data;
        //  console.log("添加页面接口数据xin",this.addData)
         if(this.addData.success===true){
              this.props.checkTableData(this.addData)
              window.location.reload()
          }else{
            alert("添加失败！")
          }
        }).catch((err)=>{
          console.log(err);
        })
        // console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
      });
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      return (
        <div style={{display:"inline"}}>
          <Button className ="fr addBtn" type="primary" onClick={this.showModal}>新增</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }