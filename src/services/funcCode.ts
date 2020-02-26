import request from '@/utils/request';

export interface queryData {
    pageSize: number;
    pageNum: number;
}

export async function fetchList(params: any) {
    return request('/api/func_code/fetch_list', {
        method: 'POST',
        data: params,
    });
}

export async function queryCode(params: queryData) {
    return request('/api/func_code/query_code', {
        method: 'POST',
        data: params,
    });
}