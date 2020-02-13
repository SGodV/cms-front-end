import { Effect } from "dva";
import { Reducer } from "react";
import { message } from "antd";
import { fetchList } from '@/services/func-expression'

export interface FuncExperssionData {
  eid: number;
  origin_order: string;
  replace_order: string;
  source: string;
  create_user: string;
  create_date: string;
}

export interface FuncExperssionState {
  listData: {
    pageSize: number;
    currentPage: number;
    total: number;
    dataSource: FuncExperssionData[];
    // dataSource: any;
  };
}

export interface FuncExperssionModelType {
  namespace: 'funcExperssion';
  state: FuncExperssionState;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
    reset: Reducer<any, any>;
  };
}

const FuncExperssion: FuncExperssionModelType = {
  namespace: 'funcExperssion',
  state: {
    listData: {
      pageSize: 10,
      currentPage: 1,
      total: 15,
      dataSource: [],
    }
  },

  effects: {
    *fetchList(payload, { call, put }) {
      debugger;
      try {
        const res = yield call(fetchList, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              pageSize: res.data.pageSize,
              currentPage: res.data.currentPage,
              total: res.data.total,
              dataSource: res.data.dataSource,
            },
            index: 'listData',
          })
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
  },

  reducers: {
    save(state, { payload, index }) {
      debugger;
      return {
        ...state,
        [index]: {
          ...state[index],
          ...payload,
        },
      };
    },
    reset(state) {
      return {
        ...state,
        currentParameter: {
          keyword: '',
          status: 'all',
        },
      };
    },
  },
};

export default FuncExperssion;