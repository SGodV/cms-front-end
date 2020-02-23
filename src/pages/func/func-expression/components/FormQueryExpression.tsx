import { FormComponentProps } from "antd/lib/form";
import React from "react";
import { Form, Input, Row, Col, DatePicker, Button, Icon, Select } from "antd";
import { connect } from "dva";
import moment from "moment";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import { FuncExpressionDataAllowBlank } from "../models/func-expression";

interface IProps extends FormComponentProps {
  expand: boolean;
  changeExpand: Function;
  queryData: FuncExpressionDataAllowBlank;
  changeQueryData: Function;
  handleQuery: Function;
}

const FormQueryExpression: React.FC<IProps> = props => {
  const { expand, changeExpand, queryData, changeQueryData, handleQuery } = props;
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const rangePickerData = (start: string | undefined, end: string | undefined) => {
    const data: [moment.Moment, moment.Moment] = [moment(start), moment(end)];
    if (start !== undefined || end !== undefined) {
      return data;
    }
    return undefined;
  };

  const handleSubmit = () => {
    handleQuery();
  };

  const handleClear = () => {
    changeQueryData({});
    handleQuery(1);
  };

  const handleCreateDate = (dateString: [string, string]) => {
    changeQueryData({
      ...queryData,
      create_date: dateString[0],
      end_create_date: dateString[1],
    })
  };

  const handleUpdateeDate = (dateString: [string, string]) => {
    changeQueryData({
      ...queryData,
      update_date: dateString[0],
      end_update_date: dateString[1],
    })
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item label="eid">
            <Input
              placeholder="输入需要查询的eid"
              value={queryData.eid}
              onChange={e => changeQueryData({
                ...queryData,
                eid: e.target.value,
              })}
            />
          </Form.Item >
        </Col>
        <Col span={6}>
          <Form.Item label="原指令">
            <Input
              placeholder="输入需要查询的原指令"
              value={queryData.origin_order}
              onChange={e => changeQueryData({
                ...queryData,
                origin_order: e.target.value,
              })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="替换指令">
            <Input
              placeholder="输入需要查询的替换指令"
              value={queryData.replace_order}
              onChange={e => changeQueryData({
                ...queryData,
                replace_order: e.target.value,
              })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="加入人">
            <Select
              allowClear
              value={queryData.source}
              onChange={(value: string) => changeQueryData({
                ...queryData,
                source: value,
              })}
            >
              <Option value="机器">机器</Option>
              <Option value="人工">人工</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: expand ? "block" : "none" }}>
          <Form.Item label="加入日期" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <RangePicker
              allowClear
              value={rangePickerData(queryData.create_date, queryData.end_create_date)}
              onChange={(datas: RangePickerValue, dateString: [string, string]) => handleCreateDate(dateString)}
            />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: expand ? "block" : "none" }}>
          <Form.Item label="修改日期" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <RangePicker
              allowClear
              value={rangePickerData(queryData.update_date, queryData.end_update_date)}
              onChange={(datas: RangePickerValue, dateString: [string, string]) => handleUpdateeDate(dateString)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            查询
            </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleClear}>
            重置
            </Button>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={() => changeExpand(!expand)}>
            Collapse <Icon type={expand ? 'up' : 'down'} />
          </a>
        </Col>
      </Row>
    </Form>
  );
};

const QueryExpressio = Form.create<IProps>()(FormQueryExpression);
export default connect()(QueryExpressio);