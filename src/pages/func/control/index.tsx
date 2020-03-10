import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Card, Modal, Table, Tag, Row, Col, Input, Button, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';


interface IProps extends FormComponentProps{
  dispatch: any;
  funcControl: any;
}

const Control: React.FC<IProps> = props => {
  const {
    dispatch,
    funcControl: {
      listData: { currentPage, pageSize, total, dataSource },
      visible,
      modalData,
      constant: { brandList, netList, netTypeList, feeList },
      queryParams: { brand, net, netType, fee, functionId, functionName, areaName }
    }
  } = props;
  const fetch = (queryParams: object) => {
    dispatch({
      type: 'funcControl/fetchList',
      payload: {
        queryParams,
        currentPage,
        pageSize,
      }
    })
  };

  const showModal = (modalData: any) => {
    dispatch({
      type: 'funcControl/changeModalData',
      payload: {
        modalData
      }
    });
    dispatch({
      type: 'funcControl/showModal',
      payload: {
        modalStatus: true
      }
    })
  };

  const hideModal = () => {
    dispatch({
      type: 'funcControl/hideModal',
      payload: {
        modalStatus: false
      }
    })
  };

  const handleChange = ({ current, pageSize }: any, filters: any) => {
    let params = {
      ...props.funcControl.queryParams,
      ...filters
    };
    dispatch({
      type: 'funcControl/fetchList',
      payload: {
        queryParams: params,
        currentPage: current - 1,
        pageSize,
      }
    });
    dispatch({
      type: 'funcControl/save',
      payload: filters,
      index: 'queryParams',
    });
  };

  const showDatail = (keyword: string, index: number) => {
    return (
      <>
        <a key="detail" onClick={() => showModal(dataSource[index][keyword])}>详情</a>
      </>
    )
  }

  useEffect(() => {
    dispatch({
      type: 'funcControl/fetchDimensionList',
    });
    fetch(props.funcControl.queryParams);
  }, []);

  const columns = [
    {
      title: '菜单标识',
      dataIndex: 'functionId',
      key: 'funcId',
    }, {
      title: '菜单名称',
      dataIndex: 'functionName',
      key: 'name',
    }, {
      title: '地区等级',
      dataIndex: 'areaLevel',
      key: 'level'
    }, {
      title: '地区标识',
      dataIndex: 'area',
      key: 'area',
      render: (text: any, item: any, index: number) => {
        return showDatail("area", index);
      }
    }, {
      title: '品牌',
      dataIndex: 'brand',
      keyId: 'brand',
      filters: brandList.map((item: any) => (
        {
          text: item.typeName,
          value: item.did
        }
      )),
      filteredValue: brand,
      render: (text: any, item: any, index: number) => {
        return showDatail("brand", index);
      }
    }, {
      title: '网别',
      dataIndex: 'net',
      key: 'net',
      filters: netList.map((item: any) => (
        {
          text: item.typeName,
          value: item.did
        }
      )),
      filteredValue: net,
      render: (text: any, item: any, index: number) => {
        return showDatail("net", index);
      }
    }, {
      title: '是否为智能网',
      dataIndex: 'netType',
      key: 'netType',
      filters: netTypeList.map((item: any) => (
        {
          text: item.typeName,
          value: item.did
        }
      )),
      filteredValue: netType,
      render: (text: any, item: any, index: number) => {
        return showDatail("netType", index);
      }
    }, {
      title: '付费类型',
      dataIndex: 'fee',
      key: 'fee',
      filters: feeList.map((item: any) => (
        {
          text: item.typeName,
          value: item.did
        }
      )),
      filteredValue: fee,
      render: (text: any, item: any, index: number) => {
        return showDatail("fee", index);
      }
    }
  ];

  return (
    <div>
      {console.log("props:", props)}
      {console.log("columns:", columns)}
      <Card>

        <Row gutter={[48, 16]} className="queryRowContainer">
          <Col span="6">
            <span>菜单标识</span>
            <Input
              value={functionId}
              placeholder="请输入菜单唯一标识"
              onChange={e => {
                dispatch({
                  type: 'funcControl/save',
                  payload: {
                    functionId: e.target.value,
                  },
                  index: 'queryParams',
                });
              }}
            />
          </Col>
          <Col span="6">
            <span>菜单名称</span>
            <Input
              value={functionName}
              placeholder="请输入菜单名称"
              onChange={e => {
                dispatch({
                  type: 'funcControl/save',
                  payload: {
                    functionName: e.target.value,
                  },
                  index: 'queryParams',
                });
                console.log("props:", props)
              }}
            />
          </Col>
          <Col span="6">
            <span>地区</span>
            <Input
              value={areaName}
              placeholder="请输入地区名称"
              onChange={e => {
                dispatch({
                  type: 'funcControl/save',
                  payload: {
                    areaName: e.target.value,
                  },
                  index: 'queryParams',
                });
              }}
            />
          </Col>
          <Col span="6">
            <div className="btnContainer">
              <Button type="primary"
                onClick={() => {
                  fetch(props.funcControl.queryParams);
                }}
              >
                查询
              </Button>
              <Button type="default"
                onClick={() => {
                  dispatch({
                    type: 'funcControl/reset'
                  })
                }}>
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <br />
      <Card>
        <Table
          rowKey={record => record.functionId}
          dataSource={dataSource}
          pagination={{ total, current: currentPage + 1, pageSize }}
          onChange={handleChange}
          columns={columns}
        />
        <Modal
          title={"Basic title"}
          visible={visible}
          onOk={hideModal}
          onCancel={hideModal}
        >
          {modalData.map((item: any, index: number) => (
            <Tag
              color="magenta"
              style={{
                marginBottom: '10px'
              }}
              key={index}>{item}</Tag>
          ))}
        </Modal>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ funcControl }: any) => ({ funcControl });
export default connect(mapStateToProps)(Form.create<IProps>()(Control))
