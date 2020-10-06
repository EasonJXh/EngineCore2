import request from '@/utils/request';
import {InvestmentRecord,paraList,delIdList} from './data.d';
//調用後端接口

/**
 * -根據條件查詢相關數據
 * @param para 
 */
export async function queryRecords(params?: paraList){
    return request('/api/investment/queryhistory',{
        method:'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}

/**
 * -根據ID值清除記錄
 * @param params 
 */
export async function removeRecords(params: delIdList){
    return request('/api/investment/dealdatadel',{
        method: 'POST',
        data: {
            ...params,
            method: 'delete',
        },
    })
}

/**
 * -錄入新記錄
 * @param params 
 */
export async function addRrecords(params:InvestmentRecord){
    return request('/api/investment/dealdatasingle',{
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    })
}

/**
 * -根據Id值去更新記錄
 * @param paras 
 */
export async function updateRecords(params:paraList){
    return request('/api/investment/dealdatasingle',{
        method: 'POST',
        data: {
            ...params,
            method: 'update',                            
        },
    })
}

/**
 * -批量處理數據
 * @param params 
 */
export async function multiDealData(params:any){
    return request('/api/investment/dealdata',{
        method: 'POST',
        data:params
    })
}

