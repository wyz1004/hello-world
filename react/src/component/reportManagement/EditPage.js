import React from "react";
import axios from 'axios';
import { Input, Form,Select,Modal,DatePicker  } from 'antd';
import Moment from 'moment';
import 'moment/locale/zh-cn';
import "../../style/component.css"
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

const EditCreateForm = Form.create()(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form  } = this.props;
        const { getFieldDecorator } = form;
        //datepicker start  
        function onChange(date,dateString){
          // console.log(dateString,"时间选择器")
        }
        //datepicker end
        // alert(this.props.editChildrenValue)
        if(this.props.editChildrenValue.utilitiesClassify===1){
          this.props.editChildrenValue.utilitiesClassify="水电汽表";
          
        }else if(this.props.editChildrenValue.utilitiesClassify===0){
          this.props.editChildrenValue.utilitiesClassify="蒸汽表";
        }else if(this.props.editChildrenValue.utilitiesClassify===2){
          this.props.editChildrenValue.utilitiesClassify="水量表";
        }else if(this.props.editChildrenValue.utilitiesClassify===0){
          this.props.editChildrenValue.utilitiesClassify="电量表";
        };
        if(this.props.editChildrenValue.utilitiesType===1){
          this.props.editChildrenValue.utilitiesType="饼状图";
        }else if(this.props.editChildrenValue.utilitiesType===0){
          this.props.editChildrenValue.utilitiesType="柱状图";
        }else if(this.props.editChildrenValue.utilitiesType===2){
          this.props.editChildrenValue.utilitiesType="报表数据"
        }else if(this.props.editChildrenValue.utilitiesType===3){
          this.props.editChildrenValue.utilitiesType="折线图"
        };
        if(this.props.editChildrenValue.utilitiesZyn===2){
          this.props.editChildrenValue.utilitiesZyn="月";
        }else if(this.props.editChildrenValue.utilitiesZyn===3){
          this.props.editChildrenValue.utilitiesZyn="天";
        }else if(this.props.editChildrenValue.utilitiesZyn===0){
          this.props.editChildrenValue.utilitiesZyn="年"
        }else if(this.props.editChildrenValue.utilitiesZyn===1){
          this.props.editChildrenValue.utilitiesZyn="季度"
        };
        return (
          <Modal
            visible={visible}
            title="修改"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="设备名称">
                {getFieldDecorator('utilitiesMetris', {
                  initialValue:this.props.editChildrenValue.utilitiesMetris,
                  rules: [{ required: true, message: '设备名称不能为空' }],
                })(
                  <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch
                  style={{ width: "100%" }}
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
                  initialValue:this.props.editChildrenValue.utilitiesType,                  
                  rules: [{ required: true, message: '报表类型不能为空' }],
                })
                (
              <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch
                  placeholder="请选择"
                >
                  <Option key='0' value="0">柱状图</Option>
                  <Option key='1' value="1">饼状图</Option>
                  <Option key='2' value="2">报表数据</Option>
                  <Option key='3' value="3">折线图</Option>
                </Select>
              )}
              </FormItem>
              <FormItem label="报表分类">
                {getFieldDecorator('tableClassify',{
                  initialValue:this.props.editChildrenValue.utilitiesClassify,                  
                  rules: [{ required: true, message: '报表分类不能为空' }],
                })(
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="请选择" >
                  <Option key='0' value="0">蒸汽表</Option>
                  <Option key='1' value="1">水电汽表</Option>
                  <Option key='2' value="2">水量表</Option>
                  <Option key='3' value="3">电量表</Option>
                </Select>
              )}
              </FormItem>
              <FormItem label="统计周期">
                {getFieldDecorator('utilitiesZyn',{
                  initialValue:this.props.editChildrenValue.utilitiesZyn,                  
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
                  initialValue:this.props.editChildrenValue.utilitiesName,
                  rules: [{ required: true, message: '报表名称不能为空' }],
                })(<Input type="textarea" />)}
              </FormItem>
              <FormItem label="报表标题">
                {getFieldDecorator('tableTitle',{
                  initialValue:this.props.editChildrenValue.utilitiesHeadline,                  
                  rules: [{ required: true, message: '报表标题不能为空' }],
                })(<Input type="textarea" 
                onChange={this.handleSelectChange}                
                />)}
              </FormItem>
              <FormItem label="创建人">
              {getFieldDecorator('tableCreate',{
                  initialValue:this.props.editChildrenValue.utilitiesCreator,                
                rules: [{ required: true, message: '创建人不能为空' }],
              })(<Input type="textarea" />)}
              </FormItem>
              <FormItem label="开始-结束时间">
                {getFieldDecorator('tableUpdateTime',{
                  initialValue: [Moment(this.props.editChildrenValue.utilitiesStarttime),Moment(this.props.editChildrenValue.utilitiesEndtime)],               
                  rules: [{ required: true, message: '开始时间-结束时间不能为空' }],
                })(<RangePicker className="dataPicker" locale={locale} onChange={onChange} />)}
              </FormItem>
              <FormItem label="更新人">
                {getFieldDecorator('tableUpdate',{
                  initialValue:this.props.editChildrenValue.utilitiesUpdate,                  
                  rules: [{ required: true, message: '更新人不能为空' }],
                })(<Input type="textarea" />)}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

  export default class EditPage extends React.Component {
    state = {
      visible: false,
      editChildrenValue:this.props.editMessage,
    };
    showModal = () => {
      this.setState({ visible: true });
    }

    handleCancel = () => {
      this.setState({ visible: false });
    }

    handleCreate = (tableValues) => {

      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        var formateCreateTime = new Date(this.props.editMessage.utilitiesTime);
        var formateCreateTime_value=formateCreateTime.getFullYear() + '-' + (formateCreateTime.getMonth() + 1) + '-' + formateCreateTime.getDate()+
        " " +"00" + ":" +"00" +":"+"00"; 
      
        var formateStartTime = new Date(values.tableUpdateTime[0]._d);
      var formateStartTime_value=formateStartTime.getFullYear() + '-' + (formateStartTime.getMonth() + 1) + '-' + formateStartTime.getDate()+
      " " +"00" + ":" +"00" +":"+"00"; 
      var formateEndTime = new Date(values.tableUpdateTime[1]._d);
      var formateEndTime_value=formateEndTime.getFullYear() + '-' + (formateEndTime.getMonth() + 1) + '-' + formateEndTime.getDate()+
      " " +"00" + ":" +"00" +":"+"00";
      // console.log("时间戳"+formateStartTime_value)
      // console.log("默认时间 更新",formateStartTime)
      values.tableUpdateTime[0] = formateStartTime_value;
      values.tableUpdateTime[1] = formateEndTime_value;

      if(values.tableType==="饼状图"){
        values.tableType = 1;
      }else if(values.tableType==="柱状图"){
        values.tableType =0;
      }else if(values.tableType==="报表数据"){
        values.tableType = 2;
      }else if(values.tableType==="折线图"){
        values.tableType = 3;
      }
      if(values.tableClassify==="水电汽表"){
        values.tableClassify = 1
      }else if(values.tableClassify ==="蒸汽表"){
        values.tableClassify = 0
      }else if(values.tableClassify ==="水量表"){
        values.tableClassify = 2
      }else if(values.tableClassify ==="电量表"){
        values.tableClassify = 3
      }
      if(values.utilitiesZyn==="月"){
        values.utilitiesZyn=2;
      }else if(values.utilitiesZyn==="天"){
        values.utilitiesZyn=3;
      }else if(values.utilitiesZyn==="年"){
        values.utilitiesZyn=0
      }else if(values.utilitiesZyn==="季度"){
        values.utilitiesZyn=1
      };
      values.utilitiesZyn=parseInt(values.utilitiesZyn)
      // console.log("ding tableType",values.tableType)

        axios.get("http://10.100.121.153:8010/ssm/utilities/addOrUpdateUtilities.do?utilitiesId="+this.props.editMessage.utilitiesId+
        "&utilitiesType="+values.tableType+"&utilitiesClassify="+values.tableClassify+
        "&utilitiesName="+values.tableName+"&utilitiesHeadline="+values.tableTitle+
        "&utilitiesStarttime="+values.tableUpdateTime[0]+
        "&utilitiesEndtime="+values.tableUpdateTime[1]+
        "&utilitiesCreator="+values.tableCreate+
        "&utilitiesUpdate="+values.tableUpdate+
        "&utilitiesTime="+formateCreateTime_value+
        "&utilitiesMetris="+values.utilitiesMetris+"&utilitiesZyn="+values.utilitiesZyn
        ).then((res)=>{
          this.editData=res.data;
          if(this.editData.success===true){
            this.props.checkTableData()
            window.location.reload()
          }else{
            alert("修改失败！")
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
          <a style={{paddingRight:5}} href="javascript:;" onClick={this.showModal}>修改</a>
          <EditCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            editChildrenValue={this.state.editChildrenValue}
          />
        </div>
      );
    }
  }