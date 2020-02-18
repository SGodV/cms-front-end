import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Card, Divider, Table, Form, Row, Button, Col, Icon, Input, DatePicker, Popconfirm, Modal } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import { FuncExperssionData } from './models/func-expression'
import styles from './index.less';
import './index.css'

interface IProps {
  dispatch: any;
  funcExperssion: any;
  formConclude: any;
}

interface NewFuncExpressionFormProps extends FormComponentProps {
}

const FuncExpressionTable: React.FC<IProps> = props => {
  const {
    dispatch,
    funcExperssion: {
      listData: {pageSizel,currentPage,total,dataSource},
    },
    // formConclude: {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched},
  } = props;

  const [expand, changeExpand] = useState<boolean>(false);
  const [firstRender, changeFirstRender] = useState<boolean>(true);
  const [selectedRowKeysRecord, changeSelectedRowKeysRecord] = useState<string[] | number[]>([]);
  const [selectedRowsRecord, changeSelectedRowsRecord] = useState<FuncExperssionData[]>([]);
  const [visible, changeVisible] = useState<boolean>(false);
  const [loading, changeLoading] = useState<boolean>(false);
  const [modelState, changeModelState] = useState<string>();
  const [modelData, changeModelData] = useState<FuncExperssionData>(dataSource);

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'funcExperssion/fetchList',
      payload: {
        pageNum: current - 1,
        pageSize,
      }
    });
  };

  const handleOk = () => {
    changeLoading(true);
    setTimeout(() => {
      changeLoading(false);
      changeVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    changeVisible(false);
  };

  const handleDelete = (eidList: string[] | number[]) => {
    dispatch({
      type: 'funcExperssion/deleteItem',
      payload: {
        eidList,
      }
    })
  };

  // const handleChoose = (rowKeys: any, row: any) => {
  //   console.log(rowKeys);
  //   console.log(row);
  // };

  const { RangePicker } = DatePicker;

  useEffect(() => {
    // props.formConclude.validateFields();
    if (firstRender) {
      handleChange({ current: currentPage + 1, pageSize: pageSizel });
      changeFirstRender(!firstRender);
    }
  });

  const columns = [
    {
      title: "eid",
      dataIndex: "eid",
      // key: "eid",
    },
    {
      title: "原指令",
      dataIndex: "origin_order",
      // key: "origin_order",
    },
    {
      title: "替换指令",
      dataIndex: "replace_order",
      // key: "replace_order",
    },
    {
      title: "来源",
      dataIndex: "source",
      // key: "source",
      filters: [
        {
          text: '机器',
          value: '0',
        },
        {
          text: '人工',
          value: '1',
        },
      ],
    },
    {
      title: "加入人",
      dataIndex: "create_user",
      // key: "create_user",
    },
    {
      title: "加入日期",
      dataIndex: "create_date",
      // key: "create_date",
    },
    {
      title: "Action",
      // key: "action",
      render: (record: FuncExperssionData) => (
        <span>
          <a onClick={() => {
            changeVisible(true);
            changeModelState("修改菜单表达式替换关系");
            changeModelData(record);
          }}
          >修改</a>
          <Divider type="vertical" />
          <Popconfirm title="确认删除吗？" onConfirm={() => handleDelete([record.eid])}>
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  const rowSelection = {
    selectedRowKeys: selectedRowKeysRecord,
    onChange: (selectedRowKeys: string[] | number[], selectedRows: FuncExperssionData[]) => {
      changeSelectedRowKeysRecord(selectedRowKeys);
      changeSelectedRowsRecord(selectedRows);
    },
  };

  return (
    <PageHeaderWrapper className={styles.main}>
      <Modal
        visible={visible}
        title={modelState}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            取消
            </Button>,
        ]}
      >
        {modelState === "新建菜单表达式替换关系" && (
          <Form onSubmit={handleOk}>
            <Form.Item label="原指令:">
              {/* {getFieldDecorator('origin_order')} */}<Input/>
            </Form.Item>
            <Form.Item label="替换指令:"></Form.Item>
            <Form.Item label="来源:"></Form.Item>
            <Form.Item label="加入人:"></Form.Item>
            <Form.Item label="加入日期:"></Form.Item>
            <Form.Item><Button key="submit" type="primary" loading={loading} onClick={() => handleOk()}>
            提交
            </Button></Form.Item>
          </Form>
        )}
        {modelState === "修改菜单表达式替换关系" && (
          <div>
            <p>eid: {modelData.eid}</p>
            <p>原指令: {modelData.origin_order}</p>
            <p>替换指令: {modelData.replace_order}</p>
            <p>来源: {modelData.source}</p>
            <p>加入人: {modelData.create_user}</p>
            <p>加入日期: {modelData.create_date}</p>
          </div>
        )}
      </Modal>
      <Card>
        <Form className=".ant-advanced-search-form" onSubmit={undefined}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item className={styles.form_item} label="eid">
                <Input className={styles.form_wrapper} placeholder="placeholder" />
              </Form.Item >
            </Col>
            <Col span={8}>
              <Form.Item className={styles.form_item} label="原指令">
                <Input placeholder="placeholder" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.form_item} label="替换指令">
                <Input placeholder="placeholder" />
              </Form.Item>
            </Col>
            <Col span={8} style={{ display: expand ? "block" : "none" }}>
              <Form.Item className={styles.form_item} label="加入人">
                <Input placeholder="placeholder" />
              </Form.Item>
            </Col>
            <Col span={16} style={{ display: expand ? "block" : "none" }}>
              <Form.Item className={styles.form_item} label="加入日期">
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
            </Button>
              <Button style={{ marginLeft: 8 }} onClick={undefined}>
                重置
            </Button>
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={() => changeExpand(!expand)}>
                Collapse <Icon type={expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <div id="func-expression-table">
          <Row style={{ margin: '10px' }}>
            <Col span={24} style={{ textAlign: 'left' }}>
              <Button icon="plus" type="primary" style={{ margin: '0 10px' }}
                onClick={() => {
                  changeVisible(true);
                  changeModelState("新建菜单表达式替换关系");
                }}
              >
                新建
              </Button>,
              {selectedRowKeysRecord && selectedRowKeysRecord.length > 0 && (
                <Button onClick={() => handleDelete(selectedRowKeysRecord)}>
                  批量删除
              </Button>
              )}
            </Col>
          </Row>
          <Table<FuncExperssionData>
            columns={columns}
            dataSource={dataSource}
            rowKey={(record: FuncExperssionData) => record.eid.toString()}
            rowSelection={rowSelection}
            pagination={{ total, current: currentPage + 1, pageSize: pageSizel }}
            onChange={handleChange}
          />
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({ funcExperssion }: any) => ({ funcExperssion });
export default connect(mapStateToProps)(FuncExpressionTable);
