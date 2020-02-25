import { Effect } from "dva";
import { Reducer } from "react";
import { message } from "antd";
import { fetchList, createExpression, deleteExpression, updateExpression, queryExpression } from '@/services/func-expression'

export interface FuncExpressionData {
  eid: number;
  origin_order: string;
  replace_order: string;
  source: string;
  create_user: string;
  create_date: string;
  update_date?: string;
}

export interface FuncExpressionDataAllowBlank {
  eid?: number;
  origin_order?: string;
  replace_order?: string;
  source?: string;
  create_user?: string;
  create_date?: string;
  end_create_date?: string;
  update_date?: string;
  end_update_date?: string;
}

export interface FuncExpressionState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: FuncExpressionData[];
  };
  controlDate: { loading: boolean; }
}

export interface FuncExpressionModelType {
  namespace: 'funcExpression';
  state: FuncExpressionState;
  effects: {
    fetchList: Effect;
    createExpression: Effect;
    deleteExpression: Effect;
    updateExpression: Effect;
    queryExpression: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
    reset: Reducer<any, any>;
  };
}

const FuncExpression: FuncExpressionModelType = {
  namespace: 'funcExpression',
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
    *createExpression({ payload }, { call, put }) {
      try {
        const res = yield call(createExpression, payload);
        if (res.code === 200) {
          yield put({
            type: 'fetchList',
            payload: { pageNum: 0, pageSize: 10 },
          });
        }
        if (res !== undefined) {
          yield put({
            type: 'save',
            payload: { loading: false },
            index: 'controlDate',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *deleteExpression({ payload }, { call, put }) {
      try {
        const res = yield call(deleteExpression, payload);
        if (res.code === 200) {
          yield put({
            type: 'fetchList',
            payload: { pageNum: FuncExpression.state.listData.currentPage, pageSize: FuncExpression.state.listData.pageSizel },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *updateExpression({ payload }, { call, put }) {
      try {
        const res = yield call(updateExpression, payload);
        if (res.code === 200) {
          yield put({
            type: 'fetchList',
            payload: { pageNum: FuncExpression.state.listData.currentPage, pageSize: FuncExpression.state.listData.pageSizel },
          });
        }
        if (res !== undefined) {
          yield put({
            type: 'save',
            payload: { loading: false },
            index: 'controlDate',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *queryExpression({ payload }, { call, put }) {
      try {
        const res = yield call(queryExpression, payload);
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
        if (res !== undefined) {
          yield put({
            type: 'save',
            payload: { loading: false },
            index: 'controlDate',
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
    reset(state) {
      return {
        ...state,
        loading: false,
      };
    },
  },
};

export default FuncExpression;