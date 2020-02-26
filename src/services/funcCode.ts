import request from '@/utils/request';

export interface queryData {
    pageSize: number;
    pageNum: number;
}

export async function fetchList(params: queryData) {
    return request('/api/login/fetch_list', {
        method: 'POST',
        data: params,
    });
}

export async function queryCode(params: queryData) {
    return request('/api/login/query_code', {
        method: 'POST',
        data: params,
    });
}