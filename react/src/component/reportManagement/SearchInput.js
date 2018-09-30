import React from "react";
import axios from 'axios';
import { Select,DatePicker  } from 'antd';
import 'moment/locale/zh-cn';
import "../../style/component.css"

// search start
const Option = Select.Option;
let timeout;
let currentValue;
// search end
export default class SearchInput extends React.Component {
    state = {
      data: [],
      value: undefined,
      openKeys: ['sub2'],//侧边默认打开第二个二级菜单
    }
    constructor(){
      super()
      this.fetch= this.fetch.bind(this)
    }
    fetch(value, callback) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      currentValue = value;
    
      // function fake() {
      //   const str = querystring.encode({
      //     code: 'utf-8',
      //     q: value,
      //   });
          var getTypeValue = sessionStorage.getItem("pickChart")
          // alert(getTypeValue)
          axios.get("http://10.100.121.153:8010/ssm/utilities/selectByWhere.do?utilitiesType="+getTypeValue+"&utilitiesName="+currentValue).then((res)=>{
          this.searchSource = res.data
          for(var i=0;i<this.searchSource.length;i++){
            if(this.searchSource[i].utilitiesType===1){
              this.searchSource[i].utilitiesType="饼状图";
            }else if(this.searchSource[i].utilitiesType===0){
              this.searchSource[i].utilitiesType="柱状图";
            }else if(this.searchSource[i].utilitiesType===2){
              this.searchSource[i].utilitiesType="报表数据"
            }else if(this.searchSource[i].utilitiesType===3){
              this.searchSource[i].utilitiesType="折线图"
            };
            if(this.searchSource[i].utilitiesClassify===1){
              this.searchSource[i].utilitiesClassify="水电汽表"
            }else if(this.searchSource[i].utilitiesClassify===0){
              this.searchSource[i].utilitiesClassify="蒸汽表"
            }else if(this.searchSource[i].utilitiesClassify===2){
              this.searchSource[i].utilitiesClassify="水量表"
            }else if(this.searchSource[i].utilitiesClassify===3){
              this.searchSource[i].utilitiesClassify="电量表"
            };
            if(this.searchSource[i].utilitiesZyn===2){
              this.searchSource[i].utilitiesZyn="月"
            }else if(this.searchSource[i].utilitiesZyn===3){
              this.searchSource[i].utilitiesZyn="天"
            }else if(this.searchSource[i].utilitiesZyn===0){
              this.searchSource[i].utilitiesZyn="年"
            }else if(this.searchSource[i].utilitiesZyn===1){
              this.searchSource[i].utilitiesZyn="季度"
            };
            function get_Date(tm){  
              var d = new Date(tm);    //根据时间戳生成的时间对象 
              var date = (d.getFullYear()) + "-" +  
                      (d.getMonth() + 1) + "-" + 
                      (d.getDate()); 
                      return date; 
              }
              this.searchSource[i].utilitiesTime=get_Date(this.searchSource[i].utilitiesTime)
              this.searchSource[i].utilitiesUpdatetime=get_Date(this.searchSource[i].utilitiesUpdatetime)
              this.searchSource[i].key = i;
          }
          this.props.checkTableData(this.searchSource)
          // console.log(this.searchSource)
           }).catch((err)=>{
             console.log(err);
           })
    
      // }
    
      // timeout = setTimeout(fake, 300);
    }
  
    handleSearch = (value) => {
      this.fetch(value, data => this.setState({ data }));
    }
  
    handleChange = (value) => {
      this.setState({ value });
    }
  
    render() {
      const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
      return (
        <Select
          showSearch
          value={this.state.value}
          placeholder={this.props.placeholder}
          style={this.props.style}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          notFoundContent={null}
        >
          {options}
        </Select>
      );
    }
  }