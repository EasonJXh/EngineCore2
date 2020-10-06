import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, } from 'bizcharts';
import autoHeight from '../autoHeight';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip as Tooltip1 } from 'antd';
import DataSet from "@antv/data-set";

export interface RadarProps {
    data: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height?: number;
    forceFit?: boolean;
    conTitle?: string;
    maxvalue?: number;
}

class Radar extends Component<RadarProps> {
    render() {
        const {
            data,
            forceFit = true,
            conTitle,
            maxvalue,
        } = this.props;

        const { DataView } = DataSet;
        const dv = new DataView().source(data);
        dv.transform({
            type: "fold",
            fields: ["value", "assist"],
            // 展开字段集
            key: "user",
            // key字段
            value: "score" // value字段
        });

        const cols = {
            value: {
                min: 0,
                max: maxvalue,
            },
        };

        return (
            <div>
                <Chart
                    data={dv}
                    scale={cols}
                    height={280}
                    padding={[0, 0, 0, 100]}
                    forceFit={forceFit}
                >
                    <h1 style={{ textAlign: 'right', color: '#8c8c8c' }}>
                        <Tooltip1 title={conTitle}>
                            <InfoCircleOutlined />
                        </Tooltip1>
                    </h1>
                    <Coord type="polar" radius={0.8} />
                    <Axis
                        name="fundcode"
                        line={{ fill: '#fff' }}                        
                        grid={{
                            hideFirstLine: true,
                        }}
                    />
                    <Axis
                        name="score"
                        line={null}
                        tickLine={null}
                        grid={{
                            type: "polygon",
                            alternateColor: "rgba(0, 0, 0, 0.04)"
                        }}
                    />
                    <Tooltip />
                    <Legend position={'left'}/>
                    <Geom type="area" position="fundcode*score" color="user" />                    
                    <Geom
                        type="point"
                        position="fundcode*score"
                        color="user"
                        shape="circle"
                        size={4}
                        style={{
                            stroke: '#fff',
                            lineWidth: 1,
                            fillOpacity: 1,
                        }}
                    />
                </Chart>
            </div>
        );
    }
}

export default autoHeight()(Radar);