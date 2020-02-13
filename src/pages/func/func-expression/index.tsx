import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Card, Divider, Table, Form, Row, Button, Col, Icon, Input, DatePicker } from 'antd';
import { connect } from 'dva';
import { FuncExperssionData } from './models/func-expression'
import styles from './index.less';
import './index.css'

export interface TableListItem {
  key: number;
  eid: number;
  origin_order: string;
  replace_order: string;
  source: string;
  create_user: string;
  create_date: Date;
}

interface IProps {
  dispatch: any;
  funcExperssion: any;
}

const FuncExpressionTable: React.FC<IProps> = props => {
  const [expand, changeExpand] = useState<boolean>(false);
  const [firstRender, changeFirstRender] = useState<boolean>(true);
  const {
    dispatch,
    funcExperssion: {
      listData: {
        pageSize,
        currentPage,
        total,
        dataSource,
      },
    },
  } = props;

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'funcExperssion/fetchList',
      payload: {
        currentPage: current - 1,
        pageSize,
      }
    });
  }

  const { RangePicker } = DatePicker;

  useEffect(() => {
    // dispatch({
    //   type: 'funcExperssion/fetchList',
    //   payload: {
    //     currentPage,
    //     pageSize,
    //   }
    // });
    if (firstRender) {
      handleChange({ current: currentPage, pageSize });
      changeFirstRender(!firstRender);
    }
  });

  const columns = [
    {
      title: "eid",
      dataIndex: "eid",
      key: "eid",
    },
    {
      title: "原指令",
      dataIndex: "origin_order",
      key: "origin_order",
    },
    {
      title: "替换指令",
      dataIndex: "replace_order",
      key: "replace_order",
    },
    {
      title: "来源",
      dataIndex: "source",
      key: "source",
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
      key: "create_user",
    },
    {
      title: "加入日期",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <a onClick={undefined}>修改</a>
          <Divider type="vertical" />
          <a onClick={deleteFunc}>删除</a>
        </span>
      )
    }
  ];

  return (
    <PageHeaderWrapper className={styles.main}>
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
          <Table
            // title={() => "菜单"}
            columns={columns}
            dataSource={dataSource}
            rowKey={(record: FuncExperssionData) => record.eid.toString()}
            // rowSelection={{}}
            pagination={{ total, current: currentPage + 1, pageSize }}
            onChange={handleChange}
          />
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({ funcExperssion }: any) => ({ funcExperssion });
export default connect(mapStateToProps)(FuncExpressionTable);
