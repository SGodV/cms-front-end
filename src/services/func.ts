import request from '@/utils/request';

export async function fetchControlList(params: any) {
  console.log("params:", params);
  return request('/api/func/controllist', {
    method: 'GET',
    params
  }).then((response) => {
    console.log('response:', response);
    return response;
  });
}

export async function fetchDimensionList(params: any) {
  return request('/api/func/control/dimensionlist', {
    method: 'GET',
    params
  }).then((response) => {
    console.log('dimensionlist:', response);
    return response;
  });
}
