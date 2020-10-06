import React, { Component } from 'react';
import { Chart, Axis, Coord, Geom, Guide, View } from 'bizcharts';
import autoHeight from '../autoHeight';
import DataSet from '@antv/data-set';
import { CenterData, AnalysisDetailData } from '@/pages/FundAnalysis/data';
import { Progress, Drawer } from 'antd';
import { getAnalysisDetailWay } from '../../../service';
import format from 'date-fns/format';
import IdeaReport from '../../IdeaReport';
//定義組件必須的參數
export interface CenterBoardProps {
    height: number;
    data: CenterData;
    conTitle?: string;
    forceFit?: boolean;
}
export interface CenterBoardStates {
    analysisDetailData: AnalysisDetailData;
    visible: boolean;
}

const { Text } = Guide;
const { DataView } = DataSet;

class CenterBoard extends Component<CenterBoardProps> {

    state: CenterBoardStates = {
        analysisDetailData: {
            analysisChartData: [],
            analysisAdviceData: [],
        },
        visible: false,
    }

    /*獲取接口策略報告數據*/
    getAnalysisWay(inDate?: string, flag?: boolean) {
        const wayData = getAnalysisDetailWay(inDate);
        wayData.then(item => {
            this.setState({
                analysisDetailData: item,
                visible: flag,
            });
        })
    }

    componentDidMount() {
        const today = new Date();
        this.getAnalysisWay(format(today, 'yyyy/MM/dd').toString(), false);
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        //構造數據
        //modelList定義    
        const {
            data,
            forceFit = true,
            height,
        } = this.props;


        const dv = new DataView();
        dv.source(data.market).transform({
            type: "percent",
            field: "value",
            dimension: "fundcode",
            as: "percent"
        });
        //根據數值變化顏色
        let conColor: string = '#10239e';

        const data1: { type: string; value: number; }[] = [];
        const data2: { type: string; value: number; }[] = [];
        //構造外刻度盤數據
        for (let i = 0; i <= 200; i++) {

            const item = {
                type: `${i}`,
                value: 3,
            };
            data1.push(item);
        }
        //構造當前刻度值數據
        for (let i = 0; i <= 200; i++) {
            const item = {
                type: `${i}`,
                value: 3,
            };
            if (i == data.fun.value * 2) {
                item.value = 6;
            }
            if (i > data.fun.value * 2) {
                item.value = 0;
            }
            data2.push(item);
        }
        const cols = {
            type: {
                range: [0, 1],
            },
            value: {
                sync: true,
            },
        };

        const colsView2 = {
            type: {
                tickCount: 3,
            },
        };
        //後續增加預測選擇時間來制定策略,當前先實現為當天
        let searchDate:string=format(new Date(),'yyyy/MM/dd').toString();
        return (
            <>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>評級準確度  <Progress percent={89} steps={20} strokeWidth={10} size={'small'} strokeColor="#52c41a" /></div>
                <Chart height={height} scale={cols} padding={[0, 0, 0, 0]} forceFit={forceFit} onPlotClick={()=>{this.getAnalysisWay(searchDate,true)}}>
                    <View data={data1}>
                        <Coord type="polar" radius={0.79} innerRadius={0.82} />
                        <Geom type="interval" position="type*value" color='rgba(0, 0, 0, 0.09)' size={6} />
                    </View>
                    <View data={data1} scale={colsView2}>
                        <Coord type="polar" radius={0.60} innerRadius={0.88} />
                        <Geom type="interval" position="type*value" color='rgba(0, 0, 0, 0.09)' size={3} />
                        <Axis
                            name="type"
                            grid={null}
                            line={null}
                            tickLine={null}
                            label={
                                {
                                    offset: -15,
                                    textStyle: {
                                        fontSize: 12,
                                        fill: '#CBCBCB',
                                        textAlign: 'center',
                                    },
                                }
                            }
                        />
                        <Axis name="value" visible={false} />
                    </View>
                    <View data={data2} >
                        <Coord type="polar" radius={0.79} innerRadius={0.82} />
                        <Geom type="interval" position="type*value" color={conColor} opacity={1} size={6} />
                        <Guide>
                            <Text
                                position={['50%', '35%']}
                                content={'Market ' + data.rating}
                                style={{
                                    fill: '#262626',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                }}
                            />
                            <Text
                                position={['50%', '48%']}
                                content={data.coeNum}
                                style={{
                                    fill: 'blue',
                                    fontSize: 88,
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                }}
                            />
                            <Text
                                position={['50%', '68%']}
                                content={'Hot ' + data.maxItem + ", Cold " + data.minItem}
                                style={{
                                    fill: '#262626',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                }}
                            />
                            <Text
                                position={['50%', '60%']}
                                content={'Action ' + data.operation}
                                style={{
                                    fill: '#262626',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                }}
                            />

                        </Guide>
                    </View>
                    <View data={dv}>
                        <Coord type={"theta"} radius={0.645} innerRadius={0.93} />
                        <Axis name="percent" />
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color={['fundcode', '#1D39C4-#E7EAED']}
                        >
                        </Geom>
                    </View>
                </Chart>
                {/*抽屜頁展示數據*/}
                <Drawer
                    title={<div style={{ fontWeight: 'bold',textAlign:'center' }}>詳細策略報告</div>}                    
                    placement="bottom"
                    height={900}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <IdeaReport 
                    dataTrend={this.state.analysisDetailData}
                    dataDetail={data}
                    height={300}
                    width={1850}
                    />
                </Drawer>
            </>
        );
    }
}

export default autoHeight()(CenterBoard);