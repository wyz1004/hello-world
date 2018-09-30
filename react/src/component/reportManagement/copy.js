
import React from 'react';
import CollectionsPage from './CollectionsPage';
import 'antd/dist/antd.css';
import "../../style/component.css"
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
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

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [      {
        title: '设备名称',
        dataIndex: 'utilitiesMetris',
        // key:'utilitiesMetris',
        // width: '10%',
        // editable: true,
      },
       {
        title: '报表类型',
        dataIndex: 'utilitiesType',
        // key:"utilitiesType",
        // editable: true,
      }, {
        title: '报表分类',
        dataIndex: 'utilitiesClassify',
        // key:"utilitiesClassify",
        // editable: true,
      }, {
        title: '统计周期',
        dataIndex: 'utilitiesZyn',
        // key:"utilitiesZyn",
        // editable: true,
      },{
        title: '报表名称',
        dataIndex: 'utilitiesName',
        // key:"utilitiesName",
        // editable: true,
      },{
        title: '报表标题',
        dataIndex: 'utilitiesHeadline',
        // key:"utilitiesHeadline",
        // editable: true,
      },{
        title: '创建人',
        dataIndex: 'utilitiesCreator',
        // key:"utilitiesCreator",
        // editable: true,
      },{
        title: '创建时间',
        dataIndex: 'utilitiesTime',
        // key:"utilitiesTime",
        // editable: true,
      }, {
        title: '更新人',
        dataIndex: 'utilitiesUpdate',
        // key:"utilitiesUpdate",
        // editable: true,
      },{
        title: '更新时间',
        dataIndex: 'utilitiesUpdatetime',
        // key:"utilitiesUpdatetime",
        // editable: true,
      }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 0
            ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            ) : null
        );
      },
    }];

    this.state = {
      dataSource: [
        {
        key:0,
        utilitiesId: '0',
        utilitiesType: 'Edward King 0',
        utilitiesClassify: '32',
        utilitiesName: 'London, Park Lane no. 0',
        utilitiesHeadline:'aaa',
        utilitiesCreator:'',
        utilitiesTime:'',
        utilitiesUpdate:'',
        utilitiesUpdatetime:'',
      },
      {
        key:1,
        utilitiesId: '0',
        utilitiesType: 'Edward King 0',
        utilitiesClassify: '32',
        utilitiesName: 'London, Park Lane no. 0',
        utilitiesHeadline:'aaa',
        utilitiesCreator:'',
        utilitiesTime:'',
        utilitiesUpdate:'',
        utilitiesUpdatetime:'',
      }
      ],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      utilitiesId: '88',
        utilitiesType: 'Edward King 0',
        utilitiesClassify: '32',
        utilitiesName: 'London, Park Lane no. 0',
        utilitiesHeadline:'aaa',
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
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
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
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

          