import { Effect } from "dva";
import { Reducer } from "react";
import { message } from "antd";
import { fetchList, queryCode } from '@/services/funcCode'

export interface FuncCodeData {
  func_id: number,
  func_name: string,
  func_code: number,
  func_order: string,
}

export interface FuncCodeDataAllowBlank {
  func_id?: number,
  func_name?: string,
  func_code?: number,
  func_order?: string,
}

export interface FuncCodeState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: FuncCodeData[];
  };
  controlDate: { loading: boolean; }
}

export interface FuncCodeModelType {
  namespace: 'funcCode';
  state: FuncCodeState;
  effects: {
    fetchList: Effect;
    queryCode: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const FuncCode: FuncCodeModelType = {
  namespace: 'funcCode',
  state: {
    listData: { pageSizel: 10, currentPage: 0, total: 10, dataSource: [] },
    controlDate: { loading: false },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      try {
        const res = yield call(fetchList, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              pageSize1: res.data.pageSize,
              currentPage: res.data.pageNum,
              total: res.data.total,
              dataSource: res.data.dataSource,
            },
            index: 'listData',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *queryCode({ payload }, { call, put }) {
      try {
        const res = yield call(queryCode, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              pageSize1: res.data.pageSize,
              currentPage: res.data.pageNum,
              total: res.data.total,
              dataSource: res.data.dataSource,
            },
            index: 'listData',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
  },

  reducers: {
    save(state, { payload, index }) {
      return {
        ...state,
        [index]: {
          ...state[index],
          ...payload,
        },
      };
    },
  },
};

export default FuncCode;