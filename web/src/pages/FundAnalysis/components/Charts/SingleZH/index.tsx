import React, { Component } from "react";
import autoHeight from '../autoHeight';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Label
} from "bizcharts";
import { Row, Col } from 'antd';

export interface DonutProps {
    data: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height: number;
    forceFit?: boolean;
    tickInterval1: number;
    tickInterval2: number;
    conTitle1?: string;
    conTitle2?: string;
    unit1?: string;
    unit2?: string;
    conColor?:string;
}

const splitTrendDataProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    style: { marginBottom: 2 },
};

class SingleZH extends Component<DonutProps> {
    render() {
        const {
            data,
            forceFit = true,
            tickInterval1,
            tickInterval2,
            conTitle1,
            conTitle2,
            conColor,
            unit1,
            unit2,
            height,
        } = this.props;
        const cols1 = {
            value: {
                tickInterval: tickInterval1
            }
        };
        const cols2 = {
            value: {
                tickInterval: tickInterval2
            }
        };
        return (
            <div>
                <Row gutter={24} style={{ marginTop: 2 }}>
                    <Col {...splitTrendDataProps}>
                        <Chart height={height} data={data} scale={cols1} padding={[20, 60, 60, 60]} forceFit={forceFit}>
                            <div style={{ textAlign: 'left', color: '#8c8c8c',fontSize:15,fontWeight:'bold' }}>
                                {conTitle1}
                            </div>
                            <Axis name="fundcode" />
                            <Axis name="value"
                                label={{
                                    formatter: val => `${val}` + unit1
                                }} />
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="fundcode*value" color={conColor}>
                                <Label content="value" offset={7} />
                            </Geom>
                        </Chart>
                    </Col>
                    <Col {...splitTrendDataProps}>
                        <Chart height={height} data={data} scale={cols2} padding={[20, 60, 60, 60]} forceFit={forceFit}>
                            <div style={{ textAlign: 'left', color: '#8c8c8c',fontSize:15,fontWeight:'bold' }}>
                                {conTitle2}
                            </div>
                            <Axis name="fundcode" />
                            <Axis name="assist"
                                label={{
                                    formatter: val => `${val}` + unit2
                                }} />
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom
                                type="line"
                                position="fundcode*assist"
                                size={2}
                                color={conColor}
                                shape={"smooth"}
                            >
                                <Label content="assist" offset={7} />
                            </Geom>
                            <Geom
                                type="point"
                                position="fundcode*assist"
                                size={4}
                                color={conColor}
                            />
                        </Chart>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default autoHeight()(SingleZH);