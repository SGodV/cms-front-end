import { Request, Response } from 'express';
import mockjs from 'mockjs';

const dataList: any = [];
const total = 200;

for (let i = 0; i < total; i += 1) {
  const dataItem = mockjs.mock({
    'func_id': i + 1,
    'func_name': `菜单 ${i}`,
    'func_code': /[0-9]{5}/,
    'func_order': /[A-Z0-9]{4,8}/,
  });
  dataList.push(dataItem);
}

const fetchList = (req: Request, res: Response) => {
  const { pageSize, pageNum } = req.body;
  const dataSource: any = [];
  for (let i = pageNum * pageSize; i < (pageNum + 1) * pageSize; i += 1) {
    if (dataList[i] === undefined) {
      break;
    }
    dataSource.push(dataList[i]);
  };
  res.json({
    msg: '获取成功',
    code: 200,
    data: {
      pageSize,
      pageNum,
      total: dataList.length,
      dataSource,
    },
  });

}

const queryCode = (req: Request, res: Response) => {
 
  const { pageSize, pageNum, func_id, func_name, func_code, func_order } = req.body;
  const dataQueryList: any = [];
  const dataSource: any = [];
  for (let i = 0; i < dataList.length; i += 1) {
    if (
      (func_id === undefined || func_id === "" || func_id === dataList[i].func_id.toString())
      && (func_name === undefined || dataList[i].func_name.indexOf(func_name) !== -1)
      && (func_code === undefined || dataList[i].func_code.indexOf(func_code) !== -1)
      && (func_order === undefined || dataList[i].func_order.indexOf(func_order) !== -1)
    )
      dataQueryList.push(dataList[i]);
  }

  for (let i = pageNum * pageSize; i < (pageNum + 1) * pageSize; i += 1) {
    if (dataQueryList[i] === undefined) {
      break;
    }
    dataSource.push(dataQueryList[i]);
  };
  res.json({
    msg: '获取成功',
    code: 200,
    data: {
      pageSize,
      pageNum,
      total: dataQueryList.length,
      dataSource,
    },
  });
  
}

export default {
    'POST /api/func_code/fetch_list': fetchList,
    'POST /api/func_code/query_code': queryCode,
  };