import { Form } from 'antd';
import React, { useRef } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { FuncCodeListItem } from './data.d';
import { queryRule } from './service';

interface TableListProps extends FormComponentProps {}

const TableList: React.FC<TableListProps> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<FuncCodeListItem>[] = [
    {
      title: 'functionId',
      dataIndex: 'func_id',
    },
    {
      title: '菜单名称',
      dataIndex: 'func_name',
    },
    {
      title: '菜单编码',
      dataIndex: 'func_code',
      sorter: true,
    },
    {
      title: '指令',
      dataIndex: 'func_order',
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<FuncCodeListItem>
        headerTitle="菜单编码指令"
        actionRef={actionRef}
        rowKey="key"
        request={params => queryRule(params)}
        columns={columns}
        rowSelection={undefined}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
