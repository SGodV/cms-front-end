import { Table, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { FuncCodeData, FuncCodeDataAllowBlank } from './models/funcCode';
import FormQueryCode from './components/FormQueryCode';

interface FuncCodeTableProps {
  dispatch: any;
  funcCode: any;
}

const FuncCodeTable: React.FC<FuncCodeTableProps> = props => {
  const {
    dispatch,
    funcCode: {
      listData: { pageSizel, currentPage, total, dataSource },
      controlDate: { loading },
    },
  } = props;

  const [expand, changeExpand] = useState<boolean>(false);
  const [firstRender, changeFirstRender] = useState<boolean>(true);
  const [queryData, changeQueryData] = useState<FuncCodeDataAllowBlank>({});

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'funcCode/fetchList',
      payload: {
        pageNum: current - 1,
        pageSize,
      },
    });
  }

  const handleQuery = (flag: number | void) => {
    dispatch({
      type: 'funcCode/save',
      payload: { loading: true },
      index: 'controlDate',
    });
    if (flag === 1) {
      dispatch({
        type: 'funcCode/queryCode',
        payload: {
          pageNum: 0,
          pageSize: 10,
          queryData: undefined,
        },
      });
    }
    else {
      dispatch({
        type: 'funcCode/queryCode',
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
  })

  const columns: ColumnProps<FuncCodeData>[] = [
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
        <Card>
        <FormQueryCode
          expand={expand}
          changeExpand={changeExpand}
          queryData={queryData}
          changeQueryData={changeQueryData}
          handleQuery={handleQuery}
        />
      </Card>
      <br />
      <Card>
        <Table<FuncCodeData>
          columns={columns}
          dataSource={dataSource}
          rowKey={(record: FuncCodeData) => record.func_id.toString()}
          pagination={{ total, current: currentPage + 1, pageSize: pageSizel }}
          onChange={handleChange}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({ funcCode }: any) => ({ funcCode });
export default connect(mapStateToProps)(FuncCodeTable);
