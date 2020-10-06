import React, { Component } from "react";
import autoHeight from '../autoHeight';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
    Label
} from "bizcharts";
import { InfoCircleOutlined } from '@ant-design/icons';
import {Tooltip as Tooltip1} from 'antd';

export interface DonutProps {
    data: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height?: number;
    forceFit?: boolean;
    tickInterval: number;
    conTitle?: string;
    unit?: string;
}

class Basiccolumn extends Component<DonutProps> {
    render() {
        const {
            data,
            forceFit = true,
            tickInterval,
            conTitle,
            unit,
        } = this.props;
        const cols = {
            value: {
                tickInterval: tickInterval
            }
        };
        let conColor: string = '';
        if (conTitle == "各項現持有份額數" || conTitle=="每月投入以及收益") {
            conColor = "#10239e";
        }
        else {
            conColor = "#30C05A";
        }
        return (
            <div>
                <Chart height={250} data={data} scale={cols} padding={[20,60,60,60]} forceFit={forceFit}>{/*forceFit用來實現自適應效果*/}
                    <h1 style={{ textAlign: 'right', color: '#8c8c8c' }}>
                        <Tooltip1 title={conTitle}>
                            <InfoCircleOutlined />
                        </Tooltip1>
                    </h1>
                    <Axis name="fundcode" />
                    <Axis name="value"
                        label={{
                            formatter: val => `${val}` + unit
                        }} />
                        <Axis name="assist"
                        label={{
                            formatter: val => `${val}`
                        }} />
                    <Legend />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="interval" position="fundcode*value" color={conColor}>
                        <Label content="value" offset={7} />
                    </Geom>
                    <Geom
                        type="line"
                        position="fundcode*assist"
                        size={2}
                        color={conColor}
                        shape={"smooth"}
                    />
                </Chart>
            </div>
        );
    }
}

export default autoHeight()(Basiccolumn);