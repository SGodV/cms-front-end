import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Card, Divider, Table, Form, Row, Button, Col, Input, Popconfirm, Modal } from 'antd';
import { connect } from 'dva';
import { FuncExpressionData, FuncExpressionDataAllowBlank } from './models/func-expression'
import CreateExpressionForm from './components/FormCreateExpression'
import styles from './index.less';
import './index.css'
import FormQueryExpression from './components/FormQueryExpression';

interface IProps {
  dispatch: any;
  funcExpression: any;
  formConclude: any;
}

const FuncExpressionTable: React.FC<IProps> = props => {
  const {
    dispatch,
    funcExpression: {
      listData: { pageSizel, currentPage, total, dataSource },
      controlDate: { loading },
    },
  } = props;

  const [expand, changeExpand] = useState<boolean>(false);
  const [firstRender, changeFirstRender] = useState<boolean>(true);
  const [selectedRowKeysRecord, changeSelectedRowKeysRecord] = useState<string[] | number[]>([]);
  const [selectedRowsRecord, changeSelectedRowsRecord] = useState<FuncExpressionData[]>([]);
  const [visible, changeVisible] = useState<boolean>(false);
  const [visible2, changeVisible2] = useState<boolean>(false);
  // const [loading, changeLoading] = useState<boolean>(false);
  const [modelData, changeModelData] = useState<FuncExpressionDataAllowBlank>({});
  const [queryData, changeQueryData] = useState<FuncExpressionDataAllowBlank>({});

  const handleChange = ({ current, pageSize }: any) => {
    if (queryData === {}) {
      dispatch({
        type: 'funcExpression/fetchList',
        payload: {
          pageNum: current - 1,
          pageSize,
        },
      });
    }
    else {
      dispatch({
        type: 'funcExpression/queryExpression',
        payload: {
          pageNum: current - 1,
          pageSize,
          ...queryData,
        },
      });
    }
  };

  const handleCreate = () => {
    dispatch({
      type: 'funcExpression/save',
      payload: { loading: true },
      index: 'controlDate',
    });
    modelData.source = "人工";
    modelData.create_user = "Serati Ma"
    modelData.create_date = new Date().toISOString();
    modelData.create_date = modelData.create_date.slice(0, modelData.create_date.indexOf("T"));
    dispatch({
      type: 'funcExpression/createExpression',
      payload: { ...modelData },
    });
    changeVisible(false);
    changeModelData({});
    changeQueryData({});
  };

  const handleCancel = () => {
    changeVisible(false);
    changeVisible2(false);
    changeModelData({});
    changeQueryData({});
  };

  const handleDelete = (eidList: string[] | number[]) => {
    dispatch({
      type: 'funcExpression/deleteExpression',
      payload: {
        eidList,
      }
    });
    changeQueryData({});
  };

  const handleUpdate = () => {
    dispatch({
      type: 'funcExpression/save',
      payload: { loading: true },
      index: 'controlDate',
    });
    modelData.update_date = new Date().toISOString();
    modelData.update_date = modelData.update_date.slice(0, modelData.update_date.indexOf("T"));
    dispatch({
      type: 'funcExpression/updateExpression',
      payload: {
        eid: modelData.eid,
        replace_order: modelData.replace_order,
        update_date: modelData.update_date,
      }
    });
    changeVisible2(false);
    changeModelData({});
  }

  const handleQuery = (flag: number | void) => {
    dispatch({
      type: 'funcExpression/save',
      payload: { loading: true },
      index: 'controlDate',
    });
    if (flag === 1) {
      dispatch({
        type: 'funcExpression/queryExpression',
        payload: {
          pageNum: 0,
          pageSize: 10,
          queryData: undefined,
        },
      });
    }
    else {
      dispatch({
        type: 'funcExpression/queryExpression',
        payload: {
          pageNum: 0,
          pageSize: 10,
          ...queryData,
        },
      });
    }
  };

  useEffect(() => {
    if (firstRender) {
      handleChange({ current: currentPage + 1, pageSize: pageSizel });
      changeFirstRender(!firstRender);
    }
  });

  const columns = [
    {
      title: "eid",
      dataIndex: "eid",
    },
    {
      title: "原指令",
      dataIndex: "origin_order",
    },
    {
      title: "替换指令",
      dataIndex: "replace_order",
    },
    {
      title: "来源",
      dataIndex: "source",
    },
    {
      title: "加入人",
      dataIndex: "create_user",
    },
    {
      title: "加入日期",
      dataIndex: "create_date",
    },
    {
      title: "修改日期",
      dataIndex: "update_date",
    },
    {
      title: "Action",
      render: (record: FuncExpressionData) => (
        <span>
          <a onClick={() => {
            changeVisible2(true);
            changeModelData({
              ...modelData,
              eid: record.eid,
            });
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
    onChange: (selectedRowKeys: string[] | number[], selectedRows: FuncExpressionData[]) => {
      changeSelectedRowKeysRecord(selectedRowKeys);
      changeSelectedRowsRecord(selectedRows);
    },
  };

  return (
    <PageHeaderWrapper className={styles.main}>
      <Modal
        visible={visible}
        title="新增菜单表达式替换关系"
        onOk={() => handleCreate()}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => handleCreate()}
            disabled={
              modelData.origin_order === undefined ||
              modelData.origin_order.length <= 0 ||
              modelData.replace_order === undefined ||
              modelData.replace_order.length <= 0
            }>
            提交
          </Button>,
        ]}
      >
        <CreateExpressionForm
          setCreateDate={changeModelData}
          modelData={modelData}
        />
      </Modal>
      <Modal
        visible={visible2}
        title="修改菜单表达式替换关系"
        onOk={() => handleUpdate()}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => handleUpdate()}
            disabled={
              modelData.replace_order === undefined ||
              modelData.replace_order.length <= 0
            }>
            提交
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="替换指令:">
            <Input
              placeholder="请输入替换指令"
              value={modelData.replace_order}
              onChange={e => changeModelData({
                ...modelData,
                replace_order: e.target.value,
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Card>
        <FormQueryExpression
          expand={expand}
          changeExpand={changeExpand}
          queryData={queryData}
          changeQueryData={changeQueryData}
          handleQuery={handleQuery}
        />
      </Card>
      <br />
      <Card>
        <div id="func-expression-table">
          <Row style={{ margin: '10px' }}>
            <Col span={24} style={{ textAlign: 'left' }}>
              <Button icon="plus" type="primary" style={{ margin: '0 10px' }}
                onClick={() => {
                  changeVisible(true);
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
          <Table<FuncExpressionData>
            columns={columns}
            dataSource={dataSource}
            rowKey={(record: FuncExpressionData) => record.eid.toString()}
            rowSelection={rowSelection}
            pagination={{ total, current: currentPage + 1, pageSize: pageSizel }}
            onChange={handleChange}
          />
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({ funcExpression }: any) => ({ funcExpression });
export default connect(mapStateToProps)(FuncExpressionTable);
