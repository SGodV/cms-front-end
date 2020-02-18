import request from '@/utils/request';

// export async function fetchList(params: any) {
//   return request(`/dapi/v2/chinaunicom/fun_expression_service/get_fun_expression_list`, {
//     method: 'POST',
//     data: params
//   });
// }

export async function fetchList(params: any) {
  return request(`/api/func_exp/getlist`, {
    method: 'POST',
    data: params
  });
}

export async function deleteItem(params: any) {
  return request(``, {
    method: 'POST',
    data: params
  });
}