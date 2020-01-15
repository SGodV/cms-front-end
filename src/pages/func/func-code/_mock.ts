import { Request, Response } from 'express';
import { parse } from 'url';
import { FuncCodeListItem, TableListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: FuncCodeListItem[] = [];

function getRanNum(){
  const result = [];
   for(let i=0; i<4; i += 1){
    const ranNum = Math.ceil(Math.random() * 25); // 生成一个0到25的数字
       // 大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
       result.push(String.fromCharCode(65+ranNum));
   }
   return result.join('');
  }

for (let i = 0; i < 123; i += 1) {
  tableListDataSource.push({
    key: i,
    func_id: i,
    func_name: `菜单 ${i}`,
    func_code: Math.floor(Math.random() * 10000),
    func_order: getRanNum(),
  })
}

function getRule(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  const dataSource = tableListDataSource;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    check: parse(url, true),
    check2: params,
    check3: params.func_name?.includes(params.func_name || ''),
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        func_id: i,
        func_name: `菜单 ${i}`,
        func_code: Math.floor(Math.random() * 10000),
        func_order: getRanNum(),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          return { ...item, desc, name };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
};
