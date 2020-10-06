import React, { Component } from "react";
import {Tooltip as Tooltip1} from 'antd';
import {
    Chart,
    Geom,
    Tooltip,
    Coord,
    Legend,
    Guide,
} from "bizcharts";
import autoHeight from '../autoHeight';
import { InfoCircleOutlined } from '@ant-design/icons';

export interface RadialbarProps {
    data: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height?: number;
    forceFit?: boolean;
    conTitle?: string;
    allTotal?:string;
}

class Radialbar extends Component<RadialbarProps> {
    render() {
        const { Text } = Guide;
        const {
            data,
            forceFit = true,
            conTitle,
            allTotal,
        } = this.props;
        const cols = {
            value: {
                min: 0,
                max: 20000,
                alias:'投入',
            },

        };
        return (
            <div>
                <Chart height={280} data={data} scale={cols} padding={[0, 0, 0, 100]} forceFit={forceFit}>
                    <h1 style={{ textAlign: 'right', color: '#8c8c8c' }}>
                        <Tooltip1 title={conTitle}>
                            <InfoCircleOutlined />
                        </Tooltip1>
                    </h1>
                    <Coord type="polar" radius={0.8} innerRadius={0.2} transpose />
                    <Tooltip  />
                    <Legend position="left" name="fundcode" marker="circle" />
                    <Geom
                        type="interval"
                        position="fundcode*value"
                        color={"fundcode"}
                        shape="line"
                        tooltip={[
                            "value",
                            val => {
                                return {
                                    name: "fundcode",
                                    value: val
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff",
                            color: '#3023AE',
                        }}
                    >
                    </Geom>
                    <Geom
                        type="point"
                        position="fundcode*value"
                        color="#10239e"
                        shape="circle"
                    />
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
            </div>
        );
    }
}

export default autoHeight()(Radialbar);