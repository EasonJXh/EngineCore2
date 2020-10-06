import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Coord,
    Label,
    Legend,
    Guide,
} from "bizcharts";
import autoHeight from '../autoHeight';
import SingleZH from '../SingleZH';
import DataSet from "@antv/data-set";
import { round } from "lodash";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Drawer } from 'antd';

export interface DonutProps {
    data: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    dataEachMonth: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height?: number;
    forceFit?: boolean;
    conTitle: string;
    allTotal?: string;
}

const { Text } = Guide;

class Donut extends Component<DonutProps> {

    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { DataView } = DataSet;
        const {
            data,
            forceFit = true,
            conTitle,
            allTotal,
            dataEachMonth,
        } = this.props;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "value",
            dimension: "fundcode",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = round(val * 100, 0) + "%";
                    return val;
                }
            }
        };
        return (
            <>
                <Chart
                    height={280}
                    data={dv}
                    scale={cols}
                    forceFit={forceFit}
                    padding={[0, 0, 0, 100]}
                    onPlotClick={this.showDrawer}
                >
                    <h1 style={{ textAlign: 'right', color: '#8c8c8c' }}>
                        <Tooltip title={conTitle}>
                            <InfoCircleOutlined />
                        </Tooltip>
                    </h1>
                    <Coord type={"theta"} radius={0.8} innerRadius={0.85} />
                    <Axis name="percent" />
                    <Legend position="left" name="fundcode" marker="circle" />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color={"fundcode"}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val) => {
                                return val;
                            }}
                        />
                    </Geom>
                    <Guide>
                        <Text
                            position={["50%", "50%"]}
                            content={allTotal}
                            style={{
                                textAlign: "center",
                                fontSize: 24,
                                fill: "#353535"
                            }}
                        />
                    </Guide>
                </Chart>
                {/*抽屜頁展示數據*/}
                <Drawer
                    title="每月投入收益"
                    placement="top"
                    height={350}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <div>
                        <SingleZH
                            data={dataEachMonth}
                            height={200}
                            tickInterval1={2000}
                            tickInterval2={1000}
                            conColor={'#30C05A'}
                            conTitle1={'收益'}
                            conTitle2={'投入'}
                            unit1={'元'}
                            unit2={'元'}
                        />
                    </div>
                </Drawer>
            </>
        );
    }
}

export default autoHeight()(Donut);
