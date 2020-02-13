import request from '@/utils/request';

export async function fetchList(params: any) {
    return request(`/api/func_exp/getlist`,{
      method: 'POST',
      data: params
    });
  }