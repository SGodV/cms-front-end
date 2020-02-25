import { Form, Table } from 'antd';
import React, { } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FuncCodeListItem } from './data.d';
import { } from './service';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';

interface TableListProps extends FormComponentProps {

}

const TableList: React.FC<TableListProps> = props => {
  const {} = props;
  const columns: ColumnProps<FuncCodeListItem>[] = [
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
      <Table<FuncCodeListItem>
        rowKey="key"
        onChange={}
        columns={columns}
        rowSelection={undefined}
      />
    </PageHeaderWrapper>
  );
};

const mapToProps = Form.create<TableListProps>()(TableList);
export default connect()(mapToProps);
