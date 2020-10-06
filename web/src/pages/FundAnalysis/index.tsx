import { EyeOutlined, DownOutlined, AppstoreOutlined, EyeInvisibleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Row, Col, Switch, Menu, Dropdown, DatePicker, Button, Select, Carousel, Progress, Collapse } from 'antd';
import { connect, Dispatch } from 'umi';
import { AnalysisData, QueryParas, TextValue } from './data';
import { GetRealTimeData, GetFundcodeList } from './service';

import PageLoading from './components/PageLoading';
import { round } from 'lodash';


//懶加載減少異常出現頻率(各個圖形組件加載)
const GaugeTick = React.lazy(() => import('./components/Charts/DashBoard'));
const WaterWave = React.lazy(() => import('./components/Charts/WaterWave'));
const Radialbar = React.lazy(() => import('./components/Charts/RadioBar'));
const Radar = React.lazy(() => import('./components/Charts/Radar'));
const Polarstackcolumn = React.lazy(() => import('./components/Charts/Polarstackcolumn'));
const Donut = React.lazy(() => import('./components/Charts/Donut'));
const Basiccolumn = React.lazy(() => import('./components/Charts/Histogram'));
const Curved = React.lazy(() => import('./components/Charts/Curved'));
const TextRadio = React.lazy(() => import('./components/Charts/TextRadio'));
//自定義卡片
const TextCard = React.lazy(() => import('./components/Charts/TextCard'));
//自定義中央顯示插件
const CenterBoard = React.lazy(() => import('./components/Charts/CenterBoard'));

export interface ChartShowProps {
    FundAnalysis: AnalysisData;
    dispatch: Dispatch;
    loading: boolean;
    conditionCardState: boolean;
}

export interface ChartShowState {
    conditionCardVisable: boolean;
    classCardVisable: boolean;
    standCardVisable: boolean;
    trendCardVisable: boolean;
    fundcodeList: TextValue[];
    isUpdate: boolean;
    isShowNum: boolean;
    queryParams: QueryParas;
    queryData: AnalysisData;
}

//每種屏幕佈局分割比例
const splitProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 3,
    style: { marginBottom: 2 },
};

const splitRateDataProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 6,
    style: { marginBottom: 2 },
};

const splitTrendDataProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    style: { marginBottom: 2 },
};

const splitConditionProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 4,
    style: { marginBottom: 2 },
};

const { Panel } = Collapse;

class ChartShow extends Component<ChartShowProps> {

    //定義組件加載狀態
    state: ChartShowState = {
        conditionCardVisable: true,
        classCardVisable: false,
        standCardVisable: false,
        trendCardVisable: false,
        fundcodeList: [],
        isUpdate: false,
        isShowNum: false,
        queryParams:
        {
            industry: '',
            fundcode: '',
            startDate: '',
            endDate: '',
        },
        queryData: {
            realTimeData: [],
            srateData: [],
            amountTopData: [],
            classTypeData: [],
            classIncomeData: [],
            varianceData: [],
            holdData: [],
            priceTrendData: [],
            incomeTrendData: [],
            recentOperateData: [],
            industryListData: [],
            lastDateData: [],
            monthDetailsData: [],
            lastDateFundcodeData: [],
            indexData: [],
            centerAnalysisData:
            {
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
        },
    };

    reqRef: number = 0;
    timeoutId: number = 0;

    //頁面初始化加載事件
    componentDidMount() {
        const { dispatch } = this.props;
        this.reqRef = requestAnimationFrame(() => {
            dispatch({
                type: 'FundAnalysis/fetch',
            });
        });
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'FundAnalysis/clear',
        });
        cancelAnimationFrame(this.reqRef);
        clearTimeout(this.timeoutId);
    }

    //獲得參數值
    getParamsValue = (flag: number, key, value) => {
        let { queryParams } = this.state;
        //獲取值的同時取得fundcodelist
        if (flag == 1) {
            let industry: string = value.value;
            queryParams.industry = industry;
            const fList = GetFundcodeList(industry);
            fList.then((item) => {
                this.setState(
                    {
                        fundcodeList: item,
                    }
                );
            })
        } else if (flag == 2) {
            queryParams.fundcode = value.value;
        } else if (flag == 3) {
            queryParams.startDate = value;
        } else {
            queryParams.endDate = value;
        }
        this.setState(
            {
                queryParams: queryParams,
            }
        )
    }

    //條件查詢數據
    queryDataByCondition(params: QueryParas) {
        const data = GetRealTimeData(params);
        data.then((item) => {
            this.setState(
                {
                    queryData: item,
                    isUpdate: true,
                }
            );
        })
    }


    //後續有空將所有漢字標題都國際化
    render() {
        //頁面各個數據初始化
        const { FundAnalysis } = this.props;
        const { queryData, fundcodeList } = this.state;
        const isUpdate = this.state.isUpdate;
        let {
            realTimeData,
            srateData,
            amountTopData,
            classTypeData,
            classIncomeData,
            varianceData,
            holdData,
            priceTrendData,
            incomeTrendData,
            recentOperateData,
            industryListData,
            lastDateData,
            monthDetailsData,
            lastDateFundcodeData,
            indexData,
            centerAnalysisData,
        } = isUpdate ? queryData : FundAnalysis;

        //定義子組件的的顯示狀態
        //控制中心菜單
        const menu = (
            <Menu>
                <Menu.Item key="0">條件過濾
                <Switch checkedChildren="开" unCheckedChildren="关" size="small"
                        defaultChecked={!this.state.conditionCardVisable}
                        onChange={() => this.setState({ conditionCardVisable: !this.state.conditionCardVisable })} />
                </Menu.Item>
                <Menu.Item key="4">佔比分類分析
                <Switch checkedChildren="开" unCheckedChildren="关" size="small"
                        defaultChecked={!this.state.classCardVisable}
                        onChange={() => this.setState({ classCardVisable: !this.state.classCardVisable })} />
                </Menu.Item>
                <Menu.Item key="5">持有以及穩定性分析
                <Switch checkedChildren="开" unCheckedChildren="关" size="small"
                        defaultChecked={!this.state.standCardVisable}
                        onChange={() => this.setState({ standCardVisable: !this.state.standCardVisable })} />
                </Menu.Item>
                <Menu.Item key="6">趨勢分析
                <Switch checkedChildren="开" unCheckedChildren="关" size="small"
                        defaultChecked={!this.state.trendCardVisable}
                        onChange={() => this.setState({ trendCardVisable: !this.state.trendCardVisable })} />
                </Menu.Item>
            </Menu>
        );

        //對部分數據簡單處理
        let allCost: number = 0;
        let allIncome: number = 0;
        srateData.forEach((item) => {
            allCost += item.value;
        })
        classTypeData.forEach((item) => {
            allIncome += item.value;
        })
        let value1: string = '¥ ' + recentOperateData[1].value;
        let value2: string = '¥ ' + recentOperateData[0].value;
        let value3: string = round(allIncome / allCost * 100, 2) + '%';
        let value4: string = '¥ ' + round((allCost + allIncome), 2);
        let value5: string = '¥ ' + allCost;
        let value6: string = '¥ ' + allIncome;
        let isShowNum: boolean = this.state.isShowNum;
        if (!isShowNum) {
            value1 = value2 = value4 = value5 = value6 = "¥ ******";
            value3 = "**** %";
        }
        
        //定義顯示數據顯示隱藏組件控制函數
        const showNumFun = (flag: boolean) => {
            if (flag) {
                return (
                    <EyeOutlined
                        style={{ fontSize: '20px', color: '#10239e' }}
                        onClick={() => this.setState({ isShowNum: !this.state.isShowNum })}
                    />
                );
            } else {
                return (
                    <EyeInvisibleOutlined
                        style={{ fontSize: '20px', color: '#10239e' }}
                        onClick={() => this.setState({ isShowNum: !this.state.isShowNum })}
                    />
                );
            }
        }

        //定義各個組件高度常量

        //跑馬燈滾動組件的高度
        const TextRadioHeight: number = 180;
        const GaugeTickHeight: number = 147;

        return (
            <GridContent>
                <React.Fragment>
                    <h1 style={{ textAlign: 'right' }}>
                        {
                            showNumFun(this.state.isShowNum)
                        } &nbsp; &nbsp;
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <AppstoreOutlined /> 控制中心 <DownOutlined />
                            </a>
                        </Dropdown>
                    </h1>
                    <Suspense fallback={<PageLoading />}>
                        {/*條件過濾卡片*/}
                        <Card hidden={this.state.conditionCardVisable}>
                            <h1 style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold', color: '#10239e' }}><MinusCircleOutlined onClick={() => this.setState({ conditionCardVisable: true })} /></h1>
                            <Row gutter={24} style={{ marginTop: 2 }}>
                                <Col {...splitConditionProps}>
                                    <span>行業: </span>
                                    <Select style={{ width: 200 }}
                                        onChange={(key, value) => { this.getParamsValue(1, key, value) }}
                                    >
                                        <Select.Option value={''} key={'all'}>
                                            {'全部'}
                                        </Select.Option>
                                        {
                                            industryListData.map(obj => (
                                                <Select.Option value={obj.value} key={obj.value}>
                                                    {obj.value}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                                <Col {...splitConditionProps}>
                                    <span>代碼: </span>
                                    <Select style={{ width: 200 }}
                                        onChange={(key, value) => { this.getParamsValue(2, key, value) }}
                                    >
                                        <Select.Option value={''} key={'all'}>
                                            {'全部'}
                                        </Select.Option>
                                        {
                                            fundcodeList.map(obj => (
                                                <Select.Option value={obj.value} key={obj.value}>
                                                    {obj.text}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                                <Col {...splitConditionProps}>
                                    <span>起始日期: <DatePicker
                                        placeholder="請選擇開始日期"
                                        format="YYYY/MM/DD"
                                        style={{ width: 200 }}
                                        onChange={(date, dateString) => { this.getParamsValue(3, date, dateString) }}
                                    />
                                    </span>
                                </Col>
                                <Col {...splitConditionProps}>
                                    <span>結束日期: <DatePicker
                                        placeholder="請選擇結束日期"
                                        format="YYYY/MM/DD"
                                        style={{ width: 200 }}
                                        onChange={(date, dateString) => { this.getParamsValue(4, date, dateString) }}
                                    />
                                    </span>
                                </Col>
                                <Col {...splitConditionProps}>
                                    <span><Button>重置條件</Button>    <Button type="primary" onClick={() => this.queryDataByCondition(this.state.queryParams)}>更新圖表</Button></span>
                                </Col>
                            </Row>
                        </Card>

                        {/*折疊面板，總情況預覽卡片*/}
                        <Collapse style={{ marginTop: 10 }} bordered={false} accordion={true}>
                            <Panel header={
                                <div style={{ float: 'left', fontWeight: 'bold' }}>完成度  <Progress percent={round(allIncome / allCost * 100)} steps={20} strokeWidth={10} strokeColor="#52c41a" /></div>
                            } key="1" forceRender={true} style={{ backgroundColor: '#FFFFFF' }}
                            >
                                <Row gutter={24} style={{ marginTop: 2 }}>
                                    <Col {...splitRateDataProps} >
                                        <TextCard
                                            fundcode={recentOperateData[1].fundcode}
                                            rdate={recentOperateData[1].rdate}
                                            value={value1}
                                            text={'最近買入'}
                                            avator={0}
                                            dataIncome={classTypeData}
                                        />
                                    </Col>
                                    <Col {...splitRateDataProps}>
                                        <TextCard
                                            fundcode={recentOperateData[0].fundcode}
                                            rdate={recentOperateData[0].rdate}
                                            value={value2}
                                            text={'最近買出'}
                                            avator={1}
                                            dataIncome={classTypeData}
                                        />
                                    </Col>
                                    <Col {...splitRateDataProps}>
                                        <TextCard
                                            fundcode={'總收益率'}
                                            value={value3}
                                            rdate={'當前'}
                                            text={'總收益率為'}
                                            avator={2}
                                            dataIncome={classTypeData}
                                        />
                                    </Col>
                                    <Col {...splitRateDataProps}>
                                        <TextCard
                                            fundcode={'總資產'}
                                            value={value4}
                                            rdate={'當前'}
                                            text={'總資產為'}
                                            avator={3}
                                            dataIncome={classTypeData}
                                        />
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>

                        {/*滾動顯示*/}
                        <Carousel autoplay>
                            <div>
                                <Card style={{ marginTop: 10, backgroundColor: '#0a23c93d' }}>
                                    <Row gutter={24} style={{ marginTop: 2 }}>
                                        <Col {...splitProps}>
                                            <GaugeTick
                                                data={realTimeData[0]}
                                                conTitle={'持有量最多的項目跌漲幅為:'}
                                                assTitle={'單位淨值'}
                                                height={GaugeTickHeight}
                                                dataPriceDetail={lastDateData}
                                            />
                                        </Col>
                                        <Col {...splitProps}>
                                            <GaugeTick
                                                data={realTimeData[1]}
                                                conTitle={'當日漲幅最高的項目為:'}
                                                assTitle={'單位淨值'}
                                                height={GaugeTickHeight}
                                                dataPriceDetail={lastDateData}
                                            />
                                        </Col>
                                        <Col {...splitProps}>
                                            <GaugeTick
                                                data={realTimeData[2]}
                                                conTitle={'當日跌幅最高的項目為:'}
                                                assTitle={'單位淨值'}
                                                height={GaugeTickHeight}
                                                dataPriceDetail={lastDateData}
                                            />
                                        </Col>
                                        <Col {...splitProps}>
                                            <GaugeTick
                                                data={realTimeData[3]}
                                                conTitle={'當日跌漲幅中位數項目為:'}
                                                assTitle={'單位淨值'}
                                                height={GaugeTickHeight}
                                                dataPriceDetail={lastDateData}
                                            />
                                        </Col>
                                        <Col {...splitProps}>
                                            <WaterWave
                                                data={realTimeData[6]}
                                                conTitle={'年進度天數'}
                                                unit={' 天'}
                                                assTitle={'年度周數'}
                                                conUnit={' 周'}
                                                height={GaugeTickHeight}
                                                dataIncomeDetail={lastDateFundcodeData}
                                            />
                                        </Col>
                                        <Col {...splitProps}>
                                            <WaterWave
                                                data={realTimeData[4]}
                                                conTitle={'月未操作剩餘工作日'}
                                                unit={' 天'}
                                                assTitle={'月度第'}
                                                conUnit={' 天'}
                                                height={GaugeTickHeight}
                                                dataIncomeDetail={lastDateFundcodeData}
                                            />
                                        </Col>

                                        <Col {...splitProps}>

                                            <WaterWave
                                                data={realTimeData[5]}
                                                conTitle={'月剩餘操作額'}
                                                unit={'¥ '}
                                                assTitle={'本月已投資'}
                                                conUnit={' '}
                                                height={GaugeTickHeight}
                                                dataIncomeDetail={lastDateFundcodeData}
                                            />
                                        </Col>
                                        <Col {...splitProps}>
                                            <WaterWave
                                                data={realTimeData[7]}
                                                conTitle={'日收益增長額'}
                                                unit={'¥ '}
                                                assTitle={'日增長率'}
                                                conUnit={'%'}
                                                height={GaugeTickHeight}
                                                dataIncomeDetail={lastDateFundcodeData}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div>
                                <Card style={{ marginTop: 10, backgroundColor: '#0a23c93d' }}>
                                    <Row gutter={24} style={{ marginTop: 2 }}>
                                        {
                                            indexData.map(obj => (
                                                <Col {...splitConditionProps}>
                                                    <TextRadio
                                                        data={obj}
                                                        height={TextRadioHeight}
                                                    />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Card>
                            </div>
                        </Carousel>

                        {/*總體佔比情況分析*/}
                        <Card style={{ marginTop: 10 }} hidden={this.state.classCardVisable}>
                            <h1 style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold', color: '#10239e' }}><MinusCircleOutlined onClick={() => this.setState({ classCardVisable: true })} /></h1>
                            <Row gutter={24} style={{ marginTop: 2 }}>
                                <Col {...splitRateDataProps}>
                                    <Radialbar
                                        data={srateData}
                                        conTitle={'各項投資額度'}
                                        allTotal={value5}
                                    />
                                    <Donut
                                        data={classTypeData}
                                        conTitle={'投資收益額度'}
                                        allTotal={value6}
                                        dataEachMonth={monthDetailsData}
                                    />
                                </Col>
                                <Col {...splitTrendDataProps}>
                                    <CenterBoard
                                        data={centerAnalysisData}
                                        height={630}
                                    />
                                </Col>
                                <Col {...splitRateDataProps}>
                                    <Polarstackcolumn
                                        data={amountTopData}
                                        conTitle={'各投資經理任期回報倍數'}
                                        maxvalue={3}
                                    />
                                    <Radar
                                        data={classIncomeData}
                                        conTitle={'投資各行業評級指數'}
                                        maxvalue={5}
                                    />
                                </Col>
                            </Row>
                        </Card>

                        {/*各項關鍵指標分析*/}
                        <Card style={{ marginTop: 10 }} hidden={this.state.standCardVisable}>
                            <h1 style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold', color: '#10239e' }}><MinusCircleOutlined onClick={() => this.setState({ standCardVisable: true })} /></h1>
                            <Row gutter={24} style={{ marginTop: 2 }}>
                                <Col {...splitTrendDataProps}>
                                    <Basiccolumn
                                        data={holdData}
                                        tickInterval={2000}
                                        conTitle={'各項現持有份額數'}
                                        unit={'份'}
                                    />
                                </Col>
                                <Col {...splitTrendDataProps}>
                                    <Basiccolumn
                                        data={varianceData}
                                        tickInterval={10}
                                        conTitle={'各項價值波動指數'}
                                        unit={'*-M'}
                                    />
                                </Col>
                            </Row>
                        </Card>

                        {/*各項走勢分析*/}
                        <Card style={{ marginTop: 10 }} hidden={this.state.trendCardVisable}>
                            <h1 style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold', color: '#10239e' }}><MinusCircleOutlined onClick={() => this.setState({ trendCardVisable: true })} /></h1>
                            <Row gutter={24} style={{ marginTop: 2 }}>
                                <Col {...splitTrendDataProps}>
                                    <Curved
                                        data={incomeTrendData}
                                        unit={'元'}
                                        conTitle={'總資產波動趨勢'}
                                        height={250}
                                    />
                                </Col>
                                <Col {...splitTrendDataProps}>
                                    <Curved
                                        data={priceTrendData}
                                        unit={'%'}
                                        conTitle={'行業各項價格波動趨勢'}
                                        height={250}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Suspense>
                </React.Fragment>
            </GridContent >
        );
    }
}

export default connect(
    ({
        FundAnalysis,
        loading,
    }: {
        FundAnalysis: any;
        loading: {
            effects: { [key: string]: boolean };
        };
    }) => ({
        FundAnalysis,
        loading: loading.effects['FundAnalysis/fetch'],
    }),
)(ChartShow);
