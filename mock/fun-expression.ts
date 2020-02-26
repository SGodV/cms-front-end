/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import mockjs from 'mockjs';

const dataList: any = [];
const total = 200;

const generateDate = () => {
  const beginDate = new Date('2010-1-1');
  const getBeginDate = beginDate.getTime();
  const nowDate = new Date();
  const getNowDate = nowDate.getTime();
  const sub = getNowDate - getBeginDate;
  return new Date(getBeginDate + Math.floor(Math.random() * sub));
}

for (let i = 0; i < total; i += 1) {
  const dataItem = mockjs.mock({
    'eid': i + 1,
    'origin_order': /[A-Z0-9]{4,8}/,
    'replace_order': /[A-Z0-9]{4,8}/,
    'source|1': ['人工', '机器'],
    'create_user': /[A-Z]{4,5} [A-Z]{4,8}/,
    'create_date': generateDate().toLocaleDateString(),
  });
  dataList.push(dataItem);
}

const getList = (req: Request, res: Response) => {
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
};

const createItem = (req: Request, res: Response) => {
  const dataItem = {
    eid: dataList[dataList.length - 1].eid + 1,
    origin_order: req.body.origin_order,
    replace_order: req.body.replace_order,
    source: req.body.source,
    create_user: req.body.create_user,
    create_date: req.body.create_date,
  }
  dataList.push(dataItem);
  res.json({
    msg: '插入成功',
    code: 200,
    data: {},
  });
}

const deleteItem = (req: Request, res: Response) => {
  if (dataList.length <= 1) {
    res.statusCode = 403;
    res.json({
      msg: '删除失败',
      code: 403,
      data: {},
    });
  }
  else {
    for (let i = 0; i < req.body.eidList.length; i += 1) {
      for (let j = 0; j < dataList.length; j += 1) {
        if (dataList[j].eid === req.body.eidList[i]) {
          dataList.splice(j, 1);
        }
      }
    }
    res.json({
      msg: '删除成功',
      code: 200,
      data: {},
    });
  }
}

const updateItem = (req: Request, res: Response) => {
  for (let i = 0; i < dataList.length; i += 1) {
    if (dataList[i].eid === req.body.eid) {
      dataList[i].replace_order = req.body.replace_order;
      dataList[i].update_date = req.body.update_date;
    }
  }
  res.json({
    msg: '修改成功',
    code: 200,
    data: {},
  });
}

const queryList = (req: Request, res: Response) => {
  const { pageSize, pageNum, eid, origin_order, replace_order, source, create_user, create_date, end_create_date } = req.body;
  const dataQueryList: any = [];
  const dataSource: any = [];
  for (let i = 0; i < dataList.length; i += 1) {
    if (
      (eid === undefined || eid === "" || eid === dataList[i].eid.toString())
      && (origin_order === undefined || dataList[i].origin_order.indexOf(origin_order) !== -1)
      && (replace_order === undefined || dataList[i].replace_order.indexOf(replace_order) !== -1)
      && (source === undefined || source === dataList[i].source)
      && (create_user === undefined || dataList[i].create_user.indexOf(create_user) !== -1)
      && ((create_date === undefined || end_create_date === undefined)
        || ((new Date(create_date).getTime() <= new Date(dataList[i].create_date).getTime())
          && (new Date(dataList[i].create_date).getTime() <= new Date(end_create_date).getTime())))
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
};

export default {
  'POST /api/func_exp/get_list': getList,
  'POST /api/func_exp/create_item': createItem,
  'POST /api/func_exp/delete_item': deleteItem,
  'POST /api/func_exp/update_item': updateItem,
  'POST /api/func_exp/query_list': queryList,
};

// const dataSource = [
//   {
//     eid: 1,
//     origin_order: "Brown",
//     replace_order: "Broown",
//     source: "人工",
//     create_user: "John Brown",
//     create_date: new Date("2019-5-30").toLocaleDateString(),
//   },
//   {
//     eid: 2,
//     origin_order: "Jim",
//     replace_order: "Jimm",
//     source: "人工",
//     create_user: "Jim Green",
//     create_date: new Date("2019-7-21").toLocaleDateString(),
//   },
//   {
//     eid: 3,
//     origin_order: "Joe",
//     replace_order: "Jooe Black",
//     source: "机器",
//     create_user: "Joe Black",
//     create_date: new Date("2020-1-2").toLocaleDateString(),
//   },
//   {
//     eid: 4,
//     origin_order: "Brown",
//     replace_order: "Broown",
//     source: "人工",
//     create_user: "John Brown",
//     create_date: new Date("2019-5-30").toLocaleDateString(),
//   },
//   {
//     eid: 5,
//     origin_order: "Jim",
//     replace_order: "Jimm",
//     source: "人工",
//     create_user: "Jim Green",
//     create_date: new Date("2019-7-21").toLocaleDateString(),
//   },
//   {
//     eid: 6,
//     origin_order: "Joe",
//     replace_order: "Jooe Black",
//     source: "机器",
//     create_user: "Joe Black",
//     create_date: new Date("2020-1-2").toLocaleDateString(),
//   },
//   {
//     eid: 7,
//     origin_order: "Brown",
//     replace_order: "Broown",
//     source: "人工",
//     create_user: "John Brown",
//     create_date: new Date("2019-5-30").toLocaleDateString(),
//   },
//   {
//     eid: 8,
//     origin_order: "Jim",
//     replace_order: "Jimm",
//     source: "人工",
//     create_user: "Jim Green",
//     create_date: new Date("2019-7-21").toLocaleDateString(),
//   },
//   {
//     eid: 9,
//     origin_order: "Joe",
//     replace_order: "Jooe Black",
//     source: "机器",
//     create_user: "Joe Black",
//     create_date: new Date("2020-1-2").toLocaleDateString(),
//   },
//   {
//     eid: 10,
//     origin_order: "Brown",
//     replace_order: "Broown",
//     source: "人工",
//     create_user: "John Brown",
//     create_date: new Date("2019-5-30").toLocaleDateString(),
//   },
//   {
//     eid: 11,
//     origin_order: "Jim",
//     replace_order: "Jimm",
//     source: "人工",
//     create_user: "Jim Green",
//     create_date: new Date("2019-7-21").toLocaleDateString(),
//   },
//   {
//     eid: 12,
//     origin_order: "Joe",
//     replace_order: "Jooe Black",
//     source: "机器",
//     create_user: "Joe Black",
//     create_date: new Date("2020-1-2").toLocaleDateString(),
//   },
//   {
//     eid: 13,
//     origin_order: "Brown",
//     replace_order: "Broown",
//     source: "人工",
//     create_user: "John Brown",
//     create_date: new Date("2019-5-30").toLocaleDateString(),
//   },
//   {
//     eid: 15,
//     origin_order: "Jim",
//     replace_order: "Jimm",
//     source: "人工",
//     create_user: "Jim Green",
//     create_date: new Date("2019-7-21").toLocaleDateString(),
//   },
//   {
//     eid: 16,
//     origin_order: "Joe",
//     replace_order: "Jooe Black",
//     source: "机器",
//     create_user: "Joe Black",
//     create_date: new Date("2020-1-2").toLocaleDateString(),
//   },
// ]