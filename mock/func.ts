import { Request, Response } from 'express';
import { parse } from 'url';

let controlList: any[] = []
for (let i = 0; i < 15; i++) {
  controlList.push({
    functionId: `8a0e2485312c4f2801313ba4438a045${i}`,
    functionName: `订购小信使 ${i}`,
    areaLevel: 3,
    area: [`city${i}`, `city${i}`, `city${i}`, `city${i}`, `city${i}`,
    `city${i}`, `city${i}`, `city${i}`, `city${i}`, `city${i}`, `city${i}`, `city${i}`],
    brand: [`brand${i}`, `brand${i}`],
    net: [`net${i}`, `net${i}`],
    netType: [`netType${i}`, `netType${i}`],
    fee: [`fee${i}`, `fee${i}`]
  })
}

function getControlList(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  let params = parse(url, true).query;

  let currentPage: number = parseInt(params.currentPage),
    pageSize: number = parseInt(params.pageSize);

  let dataSources: any = [];
  let length = currentPage === Math.floor(controlList.length / pageSize) ?
    controlList.length - pageSize * currentPage : pageSize
  for (let i = 0; i < length; i++) {
    dataSources[i] = controlList[i + currentPage * pageSize];
  }

  return res.json({
    msg: '请求成功',
    code: 200,
    data: {
      length,
      total: controlList.length,
      currentPage,
      pageSize: 10,
      dataSources
    }
  });
}

const DimensionList = {
  code: 200,
  msg: '请求成功',
  data: [{
    "did": 7,
    "dim": 1,
    "typeName": '智能网',
    "typeCode": 11
  }, {
    "did": 8,
    "dim": 1,
    "typeName": '非智能网',
    "typeCode": 12
  }, {
    "did": 1,
    "dim": 2,
    "typeName": '如意通',
    "typeCode": 2
  }, {
    "did": 9,
    "dim": 3,
    "typeName": '2G',
    "typeCode": 21
  }, {
    "did": 14,
    "dim": 4,
    "typeName": '后付费',
    "typeCode": 32
  }]
}

export default {
  'GET /api/func/controllist': getControlList,
  'GET /api/func/control/dimensionlist': DimensionList,
};