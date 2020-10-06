import { Effect, Reducer } from 'umi';

import { AnalysisData } from './data.d';
import { GetRealTimeData } from './service';

export interface ModelType {
    namespace: string;
    state: AnalysisData;
    effects: {
        fetch: Effect;
    };
    reducers: {
        save: Reducer<AnalysisData>;
        clear: Reducer<AnalysisData>;
    }
}

//初始化
const initState = {
    realTimeData: [
        {
            fundcode: '110022',
            maxvalue: 10,
            nowvalue: -10,
            assist: 0,
        },
        {
            fundcode: '002548',
            maxvalue: 10,
            nowvalue: -10,
            assist: 0,
        },
        {
            fundcode: '515050',
            maxvalue: 10,
            nowvalue: -10,
            assist: 0,
        },
        {
            fundcode: '002623',
            maxvalue: 10,
            nowvalue: -10,
            assist: 0,
        },
        {
            fundcode: 'days',
            maxvalue: 21,
            nowvalue: 0,
            assist: 0,
        },
        {
            fundcode: 'amounts',
            maxvalue: 7000,
            nowvalue: 0,
            assist: 0,
        },
        {
            fundcode: 'allamouonts',
            maxvalue: 114083.5,
            nowvalue: 0,
            assist: 0,
        },
        {
            fundcode: 'increameamounts',
            maxvalue: 1426.9,
            nowvalue: 0,
            assist: 0,
        },
    ],
    srateData: [
        {
            fundcode: "008749",
            value: 0,
            assist: 0,
        },

        {
            fundcode: "515050",
            value: 0,
            assist: 0,
        },

        {
            fundcode: "110022",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "564825",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "001789",
            value: 0,
            assist: 0,
        },
    ],
    amountTopData: [
        {
            fundcode: "110022",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "008749",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "115844",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "151510",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "515050",
            value: 0,
            assist: 0,
        }
    ],
    classTypeData: [
        {
            fundcode: "2001",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "2002",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "2003",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "2004",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "2005",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "2006",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "2007",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "2008",
            value: 0,
            assist: 0,
        },
    ],
    classIncomeData: [
        { fundcode: '消費', assist: 0, value: 0 },
        { fundcode: '科技', assist: 0, value: 0 },
        { fundcode: '半導體', assist: 0, value: 0 },
        { fundcode: '醫療', assist: 0, value: 0 },
        { fundcode: '5G', assist: 0, value: 0 },
        { fundcode: '新能源', assist: 0, value: 0 },
    ],
    varianceData: [
        {
            fundcode: "110022",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "008749",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "115844",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "151510",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "515050",
            value: 0,
            assist: 0,
        }
    ],
    holdData: [
        {
            fundcode: "110022",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "008749",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "115844",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "151510",
            value: 0,
            assist: 0,
        },
        {
            fundcode: "515050",
            value: 0,
            assist: 0,
        }
    ],
    priceTrendData:[
        {
            fundcode: "110022",
            rdate: '2020/1/1',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "008749",
            rdate: '2020/1/2',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "115844",
            rdate: '2020/1/3',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "151510",
            rdate: '2020/1/4',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "515050",
            rdate: '2020/1/5',
            value: 0,
            assist: 0,
        }
    ],
    incomeTrendData:[
        {
            fundcode: "110022",
            rdate: '2020/1/1',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "008749",
            rdate: '2020/1/2',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "115844",
            rdate: '2020/1/3',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "151510",
            rdate: '2020/1/4',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "515050",
            rdate: '2020/1/5',
            value: 0,
            assist: 0,
        },
    ],
    recentOperateData:[
        {
            fundcode: "110022",
            rdate: '2020/5/1',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "008749",
            rdate: '2020/7/2',
            value: 0,
            assist: 0,
        },
    ],
    industryListData:[
        {
            text: '5G',
            value: '5G',
        },
    ],
    lastDateData:[
        {
            fundcode: "110022",
            value: 0,
            assist: 0,
        },
    ],
    monthDetailsData:[
        {
            fundcode: "110022",
            value: 0,
            assist: 0,
        },
    ],
    lastDateFundcodeData:[
        {
            fundcode: "110022",
            value: 0,
            assist: 0,
        },
    ],
    indexData:[
        {
            fundcode: "110022",
            rdate: '2020/1/1',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "008749",
            rdate: '2020/1/2',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "115844",
            rdate: '2020/1/3',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "151510",
            rdate: '2020/1/4',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "515050",
            rdate: '2020/1/5',
            value: 0,
            assist: 0,
        },
        {
            fundcode: "上證指數",
            rdate: '2020/1/5',
            value: 0,
            assist: 0,
        },
    ],
    centerAnalysisData:{
        market: [
            {
                fundcode: '0',
                value: 80,
                assist: 0,
            },
            {
                fundcode: '1',
                value: 20,
                assist: 0,
            },
        ],
        fun: {
            fundcode: '1',
            value: 80,
            assist: 0,
        }
    },
};

const Model: ModelType = {
    namespace: 'FundAnalysis',
    state: initState,
    effects: {
        *fetch(_, { call, put }) {
            const reponse = yield call(GetRealTimeData);
            yield put({
                type: 'save',
                payload: reponse,
            });
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        clear() {
            return initState;
        },
    },
};

export default Model;