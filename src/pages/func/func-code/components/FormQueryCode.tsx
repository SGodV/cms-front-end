import { FormComponentProps } from "antd/lib/form";
import React from "react";
import { Form, Input, Row, Col, Button, Icon } from "antd";
import { FuncCodeDataAllowBlank } from "../models/funcCode";

interface FormQueryCodeProps extends FormComponentProps {
  expand: boolean;
  changeExpand: Function;
  queryData: FuncCodeDataAllowBlank;
  changeQueryData: Function;
  handleQuery: Function;
}

const FormQueryCode: React.FC<FormQueryCodeProps> = props => {
  const { form, expand, changeExpand, queryData, changeQueryData, handleQuery } = props;

  const handleSubmit = () => {
    handleQuery();
  };

  const handleClear = () => {
    changeQueryData({});
    handleQuery(1);
  };

  return (
    <Form
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 18 }}
  >
    <Row gutter={24}>
      <Col span={8}>
        <Form.Item label="functionId">
          <Input
            placeholder="输入需要查询的functionId"
            value={queryData.func_id}
            onChange={e => changeQueryData({
              ...queryData,
              func_id: e.target.value,
            })}
          />
        </Form.Item >
      </Col>
      <Col span={8}>
        <Form.Item label="菜单名称">
          <Input
            placeholder="输入需要查询的菜单名称"
            value={queryData.func_name}
            onChange={e => changeQueryData({
              ...queryData,
              func_name: e.target.value,
            })}
          />
        </Form.Item>
      </Col>
      <Col span={8} style={{ display: expand ? "block" : "none" }}>
        <Form.Item label="菜单编码">
          <Input
            placeholder="输入需要查询的菜单编码"
            value={queryData.func_code}
            onChange={e => changeQueryData({
              ...queryData,
              func_code: e.target.value,
            })}
          />
        </Form.Item>
      </Col>
      <Col span={8} style={{ display: expand ? "block" : "none" }}>
        <Form.Item label="指令">
          <Input
            placeholder="输入需要查询的指令"
            value={queryData.func_order}
            onChange={e => changeQueryData({
              ...queryData,
              func_order: e.target.value,
            })}
          />
        </Form.Item>
      </Col>
      <Col span={8} style={{ display: expand ? "block" : "none" }}/>
      <Col span={8} style={{ marginTop: '3.5px', textAlign: 'right' }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          查询
      </Button>
        <Button style={{ marginLeft: 12 }} onClick={handleClear}>
          重置
      </Button>
        <a style={{ marginLeft: 12, fontSize: 14 }} onClick={() => changeExpand(!expand)}>
          {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
        </a>
      </Col>
    </Row>
  </Form>
  );
};

export default Form.create<FormQueryCodeProps>()(FormQueryCode);