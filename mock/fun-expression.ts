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
  const {pageSize} = req.body.payload;
  const {currentPage} = req.body.payload;
  const dataSource: any = [];
  for (let i = currentPage*pageSize; i < (currentPage+1)*pageSize; i += 1) {
    dataSource.push(dataList[i]);
  };
  // console.log(dataSource);
  res.json({
    msg: '获取成功',
    code: 200,
    data: {
      pageSize,
      currentPage,
      total,
      dataSource,
    },
  });
};

export default {
  'POST /api/func_exp/getlist': getList,
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