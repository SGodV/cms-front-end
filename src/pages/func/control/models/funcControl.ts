import {Effect} from 'dva';
import {Reducer} from 'redux';
import {
  fetchControlList,
  fetchDimensionList
} from '@/services/func';
import {message} from 'antd';

interface funcControlType {
  namespace: string;
  state: {
    visible: boolean;
    listData: {
      currentPage: number;
      pageSize: number;
      total: number;
      dataSource: any[];
    },
    modalData: any[];
    constant: {
      brandList: any[];
      netList: any[];
      netTypeList: any[];
      feeList: any[];
    };
    queryParams: {
      brand: string[],
      net: string[],
      netType: string[],
      fee: string[],
      functionId: string,
      functionName: string,
      areaName: string
    }
  };
  effects: {
    fetchList: Effect;
    showModal: Effect;
    hideModal: Effect;
    changeModalData: Effect;
    fetchDimensionList: Effect;
  };
  reducers: {
    save: Reducer<any>;
    reset: Reducer<any>;
    changeModalStatus: Reducer<any>;
    _changeModalData: Reducer<any>;
  };
}

const funcControl: funcControlType = {
  namespace: 'funcControl',
  state: {
    visible: false,
    listData: {
      currentPage: 0, pageSize: 10, total: 0, dataSource: [],
    },
    modalData: [],
    constant: {
      brandList: [], netList: [], netTypeList: [], feeList: []
    },
    queryParams: {
      brand: [],
      net: [],
      netType: [],
      fee: [],
      functionId: '',
      functionName: '',
      areaName: ''
    }
  },
  effects: {
    * fetchList({payload}, {call, put}) {
      debugger;
      try {
        const res = yield call(fetchControlList, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              total: res.data.total,
              currentPage: res.data.currentPage,
              pageSize: res.data.pageSize,
              dataSource: res.data.dataSources
            },
            index: 'listData'
          })
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    * showModal({payload}, {put}) {
      yield put({
        type: 'changeModalStatus',
        payload
      })
    },
    * hideModal({payload}, {put}) {
      yield put({
        type: 'changeModalStatus',
        payload
      })
    },
    * changeModalData({payload}, {put}) {
      yield put({
        type: '_changeModalData',
        payload
      })
    },
    * fetchDimensionList(_, {call, put}) {
      const res = yield call(fetchDimensionList);
      let result = res.data.filter((item: any) => (item.dim === 2))
        .map((item: any) => {
          return {
            did: item.did,
            typeName: item.typeName
          }
        });
      debugger;
      console.log("result:", result);
      if (res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            brandList: res.data.filter((item: any) => (item.dim === 2))
              .map((item: any) => {
                return {
                  did: item.did,
                  typeName: item.typeName
                }
              }),
            netList: res.data.filter((item: any) => (item.dim === 3))
              .map((item: any) => {
                return {
                  did: item.did,
                  typeName: item.typeName
                }
              }),
            netTypeList: res.data.filter((item: any) => (item.dim === 1))
              .map((item: any) => {
                return {
                  did: item.did,
                  typeName: item.typeName
                }
              }),
            feeList: res.data.filter((item: any) => (item.dim === 4))
              .map((item: any) => {
                return {
                  did: item.did,
                  typeName: item.typeName
                }
              }),
          },
          index: 'constant'
        })
      }
    }
  },
  reducers: {
    save(state, {payload, index}) {
      console.log("payload-save:", payload);
      return {
        ...state,
        [index]: {
          ...state[index],
          ...payload
        },
      };
    },
    reset(state) {
      return {
        ...state,
        queryParams: {
          brand: [],
          net: [],
          netType: [],
          fee: [],
          functionId: '',
          functionName: '',
          areaName: ''
        }
      }
    },
    changeModalStatus(state, {payload}) {
      return {
        ...state,
        visible: payload.modalStatus
      }
    },
    _changeModalData(state, {payload}) {
      return {
        ...state,
        modalData: payload.modalData
      }
    },
  }
};

export default funcControl;
