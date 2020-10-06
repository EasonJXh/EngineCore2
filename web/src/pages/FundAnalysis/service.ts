import request from 'umi-request';
import { QueryParas } from './data';

//調用後台接口

/**
 * -獲取主頁要顯示數據
 * @param params 
 */
export async function GetRealTimeData (params?:QueryParas){
    return request('/api/chart/getrealtimerowdata',{
        method: 'POST',
        data: {...params},
    });
}

/**
 * -獲取行業下拉列表
 * @param industry 
 */
export async function GetFundcodeList(industry?:string){
    return request('/api/report/getfundcode',{
        method:'GET',
        params: {industry},
    });
}

/**
 * -獲取指數明細數據
 * @param fundcode 
 */
export async function GetIndexDataDetail(fundcode?:string){
    return request('/api/chart/getindexdatadetail',{
        method:'GET',
        params:{fundcode},
    })
}

/**
 *-獲取經理詳細信息 
 * @param manager 
 */
export async function GetManagerChartInfo(manager?:string){
    return request('/api/chart/getmanagerchart',{
        method:'GET',
        params:{manager},
    })
}

/**
 * -獲取策略報告詳情數據
 * @param inDate 
 */
export async function getAnalysisDetailWay(inDate?:string){
    return request('/api/chart/getanalysisdetaildata',{
        method:'GET',
        params:{inDate},
    })
}