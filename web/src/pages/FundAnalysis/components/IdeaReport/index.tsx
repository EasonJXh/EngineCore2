import React, { Component } from 'react';
import { AnalysisDetailData, CenterData, IdeaReportTrendData } from '../../data.d';
import {
    Chart,
    Geom,
    Axis,
    Legend,
    Tooltip,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { Descriptions, Progress, Collapse, } from 'antd';
import Slider from 'bizcharts-plugin-slider';
import { format } from 'date-fns'

export interface IdeaReportProps {
    dataTrend: AnalysisDetailData,
    dataDetail: CenterData,
    height: number,
    width: number,
    forceFit?: boolean,
    title?: string,
}
//擴展策略報告數據模型
export interface KlineModel extends IdeaReportTrendData {
    range?: number[];
}

const { Panel } = Collapse;

const ds = new DataSet({
    state: {
        start: '2020-3-2',
        end: format(new Date(),'yyyy-MM-dd').toString(),        
    },
});

class IdeaReport extends Component<IdeaReportProps>{
    onChange(obj) {
        const { startText, endText } = obj;
        ds.setState("start", startText);
        ds.setState("end", endText);
      }
    render() {
        const {
            dataTrend,
            dataDetail,
            height,
            width,
            forceFit,
        } = this.props;
        /*對數據清洗處理*/
        let dataChart: KlineModel[] = [];
        dataTrend.analysisChartData.forEach(e => {
            let range: number[] = [];
            range.push(e.minRate);
            range.push(e.maxRate);
            dataChart.push({
                rdate: e.rdate,
                avgRate: e.avgRate,
                minRate: e.minRate,
                maxRate: e.maxRate,
                minMed: e.minMed,
                maxMed: e.maxMed,
                minAvg: e.minAvg,
                maxAvg: e.maxAvg,
                trend: e.trend,
                range: range,
            });
        });

        const dv = ds.createView();
        // const dv1 = ds.createView('origin').source(dataChart);        
        dv.source(dataChart).transform({
            type: 'filter',
            callback: obj => {
                const date = obj.rdate;
                return date >= ds.state.start && date <= ds.state.end;
            },
        })
        .transform({
            type: "map",
            callback: obj => {
                obj.stockRange = [obj.minMed, obj.maxMed, obj.minAvg, obj.maxAvg];
                return obj;
            }
        });
        const cols = {
            rdate: {
                type:'timeCat',
                nice: false,
                range: [0, 1],
                alias:'交易日',
            },
            range: {
                nice: false,
                alias:'峰值範圍',
            },
            avgRate: {
                min: -15,
                max: 15,
                nice: false,
                alias:'平均增長率',
            },
            stockRange: {
                min: -15,
                max: 15,
                nice: false,
                alias:'增長範圍',
            }
        };
        //console.log(format(new Date(),'yyyy-MM-dd').toString());
        return (
            <div>
                <div style={{ fontWeight: 'bold' }}>總體行情K線分析圖</div>
                <Chart height={height} data={dv} width={width} scale={cols} forceFit={forceFit}>
                    <Axis name="avgRate" visible={false} />
                    <Legend />
                    <Axis name="stockRange" visible={false} />
                    <Tooltip />
                    <Geom type="area" position="rdate*range" color="#64b5f6" />
                    <Geom
                        type="schema"
                        position="rdate*stockRange"
                        color={[
                            "trend",
                            val => {
                                if (val === "up") {
                                    return "#f04864";
                                } else {
                                    return "#2fc25b";
                                }
                            }
                        ]}
                        tooltip="minMed*maxMed*minAvg*maxAvg"
                        shape="candle"
                    />
                    <Geom type="line" position="rdate*avgRate" color="#FACC14" />
                </Chart>
                <Slider
                    data={dataChart}
                    padding={60}
                    xAxis="rdate"
                    yAxis="avgRate"
                    onChange={this.onChange.bind(this)}
                />
                <br/>
                <div>
                    <div style={{ fontWeight: 'bold' }}>分析評測結果</div>
                    <Descriptions>
                        <Descriptions.Item label="Market Environment">{dataDetail.rating}</Descriptions.Item>
                        <Descriptions.Item label="Hot Industry">{dataDetail.maxItem}</Descriptions.Item>
                        <Descriptions.Item label="Cold Industry">{dataDetail.minItem}</Descriptions.Item>
                        <Descriptions.Item label="Operation Adavice">{dataDetail.operation}</Descriptions.Item>
                        <Descriptions.Item label="Comprehensive Rating Index">
                            <Progress size={'small'} percent={Number(dataDetail.coeNum)} steps={20} strokeWidth={10} strokeColor="#52c41a" />
                        </Descriptions.Item>
                        <Descriptions.Item label="Market Increase Ratio">
                            <Progress size={'small'} percent={Number(dataDetail.market[0].value)} steps={20} strokeWidth={10} strokeColor="#52c41a" />
                        </Descriptions.Item>
                        <Descriptions.Item label="Fundcode Increase Ratio">
                            <Progress size={'small'} percent={Number(dataDetail.fun.value)} steps={20} strokeWidth={10} strokeColor="#52c41a" />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div>
                    <div style={{ fontWeight: 'bold' }}>具體操作明細</div>
                    <Collapse defaultActiveKey={['515050']} style={{ marginTop: 10 }} bordered={false} accordion>
                        {
                            dataTrend.analysisAdviceData.map(obj => (
                                <Panel header={
                                    <div style={{ float: 'left', fontWeight: 'bold' }}>{obj.shortName + "評估收益概率"}  <Progress percent={Number(obj.assist)} steps={20} strokeWidth={10} strokeColor="#52c41a" /></div>
                                } key={obj.fundcode} forceRender={true} style={{ backgroundColor: '#FFFFFF' }}
                                >
                                    <Descriptions>
                                        <Descriptions.Item label="Fundcode">{obj.fundcode}</Descriptions.Item>
                                        <Descriptions.Item label="shortName">{obj.shortName}</Descriptions.Item>
                                        <Descriptions.Item label="Industry">{obj.industry}</Descriptions.Item>
                                        <Descriptions.Item label="Should Buy-Amounts">{"¥ " + obj.value}</Descriptions.Item>
                                    </Descriptions>
                                </Panel>

                            ))
                        }
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default IdeaReport;