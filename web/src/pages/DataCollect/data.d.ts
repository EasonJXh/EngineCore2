//INVESTMENT_RECORDS表模型定義
export interface InvestmentRecord {
    seq?: string;
    id: string;
    trasdate?: string;
    operator?: string;
    otype?: string;
    fundcode?: string;
    amount?: number;
    platform?: string;
    events?: string;
    createdate?: Date;
    updatedate?: Date;  
}

//刪除時參數模型
export interface delIdList{
  idList:string[];
}

//查詢參數模型
export interface paraList {
  id?:string;
  trasdate?: string;
  operator?: string;
  otype?: string;
  fundcode?: string;
  platform?: string;
  events?:string;
  amount?:number; 
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };  
}

//表格數據分頁模型
export interface TableListPagination {
    totalRow: number;
    pageSize: number;
    current: number;
  }
  
  //表格數據模型
  export interface TableListData {
    list: InvestmentRecord[];
    pagination: Partial<TableListPagination>;
  }