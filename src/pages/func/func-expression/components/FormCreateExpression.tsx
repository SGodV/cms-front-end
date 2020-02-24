import { FormComponentProps } from "antd/lib/form";
import React from "react";
import { Form, Input } from "antd";
import { FuncExpressionDataAllowBlank } from "../models/func-expression";

interface FormCreateExpressionProps extends FormComponentProps {
  setCreateDate: Function;
  modelData: FuncExpressionDataAllowBlank;
}

const FormCreateExpression: React.FC<FormCreateExpressionProps> = props => {
  const { setCreateDate, modelData } = props;

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item label="原指令:">
        <Input
          placeholder="请输入原指令"
          value={modelData.origin_order}
          onChange={e => setCreateDate({
            ...modelData,
            origin_order: e.target.value,
          })}
        />
      </Form.Item>
      <Form.Item label="替换指令:">
        <Input
          placeholder="请输入替换指令"
          value={modelData.replace_order}
          onChange={e => setCreateDate({
            ...modelData,
            replace_order: e.target.value,
          })}
        />
      </Form.Item>
    </Form>
  );
};

export default Form.create<FormCreateExpressionProps>()(FormCreateExpression);