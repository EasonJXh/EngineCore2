export interface PriceModel {
    fundcode: string;
    maxvalue: number;
    nowvalue: number;
    assist: number;
}

export interface RateModel{
    fundcode: string;
    value: number;
    assist: number;
}

export interface PriceTrendModel{
    fundcode: string;
    rdate: string;
    value: number;
    assist: number;
}

export interface TextValue{
    text: string;
    value: string;
}

export interface AnalysisData {
    realTimeData: PriceModel[];
    srateData: RateModel[];
    amountTopData: RateModel[];
    classTypeData: RateModel[];
    classIncomeData: RateModel[];
    varianceData: RateModel[];
    holdData: RateModel[];
    priceTrendData: PriceTrendModel[];
    incomeTrendData: PriceTrendModel[];
    recentOperateData: PriceTrendModel[];
    industryListData: TextValue[];
    lastDateData: RateModel[];
    monthDetailsData: RateModel[];
    lastDateFundcodeData: RateModel[];
    indexData: PriceTrendModel[];
    centerAnalysisData: CenterData;
}

export interface RequestData {
    data: PriceModel[];
    code?: string;
    msg?: string;
}  

export interface QueryParas{
    industry?:string;
    fundcode?:string;
    startDate?:string;
    endDate?:string;
}

export interface CenterData{
    rating?:string;
    coeNum?:string;
    maxItem?:string;
    minItem?:string;
    operation?:string;
    market:RateModel[];
    fun: RateModel;
}

export interface ManagerInfoData{
    manager:string;
    country?:string;
    sex?:string;
    education?: string;
    workdate?:string;
    amount?:number;
    returnRate:number;
    imgPath?: string;
    memo?:string;
    managerFund:RateModel[];
}

export interface IdeaReportTrendData{
    rdate:string;
    avgRate:number;
    minRate:number;
    maxRate:number;
    minMed:number;
    maxMed:number;
    minAvg:number;
    maxAvg:number;
    trend:number;
}

export interface IdeaReportAdviceData{
    fundcode:string;
    shortName?:string;
    industry?:string;
    value?:number;
    assist?:number;    
}

/*策略報告數據模型*/
export interface AnalysisDetailData{
    analysisChartData:IdeaReportTrendData[];
    analysisAdviceData:IdeaReportAdviceData[];
}