import request from '@/utils/request';

export interface queryData {
  pageSize: number;
  pageNum: number;
}

// export async function fetchList(params: any) {
//   return request(`/dapi/v2/chinaunicom/fun_expression_service/get_fun_expression_list`, {
//     method: 'POST',
//     data: params
//   });
// }

export async function fetchList(params: queryData) {
  return request(`/api/func_exp/get_list`, {
    method: 'POST',
    data: params
  });
}

export async function createExpression(params: any) {
  return request(`/api/func_exp/create_item`, {
    method: 'POST',
    data: params
  });
}

export async function deleteExpression(params: any) {
  return request(`/api/func_exp/delete_item`, {
    method: 'POST',
    data: params
  });
}

export async function updateExpression(params: any) {
  return request(`/api/func_exp/update_item`, {
    method: 'POST',
    data: params
  });
}

export async function queryExpression(params: any) {
  return request(`/api/func_exp/query_list`, {
    method: 'POST',
    data: params
  });
}