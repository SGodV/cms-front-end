export interface FuncCodeListItem {
  key: number;
  func_id: number,
  func_name: string,
  func_code: number,
  func_order: string,
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: FuncCodeListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  func_id?: number,
  func_name?: string,
  func_code?: number,
  func_order?: string,
  key?: number;
  pageSize?: number;
  currentPage?: number;
}