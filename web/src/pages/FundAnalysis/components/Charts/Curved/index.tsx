import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
    Guide,
} from "bizcharts";
import autoHeight from '../autoHeight';
import { InfoCircleOutlined } from '@ant-design/icons';
import {Tooltip as Tooltip1} from 'antd';

export interface CurvedProps {
    data: {
        fundcode: string,
        rdate: string;
        value: number;
        assist: number;
    }[];
    unit?: string;
    height: number;
    forceFit?: boolean;
    conTitle?: string;
}

const { DataMarker } = Guide;

class Curved extends Component<CurvedProps> {

    render() {
        const {
            data,
            unit,
            forceFit = true,
            conTitle,
            height,
        } = this.props;

        const cols = {
            rdate: {
                range: [0, 1],
            }
        };

        let signPoint: {
            fundcode: string,
            rdate: string,
            value: number,
        }[] = [];        
        data.forEach((item)=>{
            if(item.assist==1)
            {
                signPoint.push(item);
            }
        })
        return (
            <div>
                <Chart height={height} data={data} scale={cols} padding={[20,60,60,60]} forceFit={forceFit}>
                    <div style={{ textAlign: 'right', color: '#8c8c8c',fontSize:15}}>
                        <Tooltip1 title={conTitle}>
                            <InfoCircleOutlined />
                        </Tooltip1>
                    </div>
                    <Legend name="fundcode" position="bottom" />
                    <Axis name="rdate" />
                    <Axis
                        name="value"
                        label={{
                            formatter: val => `${val}` + unit
                        }}
                    />
                    <Tooltip
                    />
                    <Geom
                        type="line"
                        position="rdate*value"
                        size={2}
                        color={"fundcode"}
                        shape={"smooth"}
                    />
                    <Geom
                        type="area"
                        position="rdate*value"
                        //size={2}
                        color={"fundcode"}
                    />
                    <Guide>
                        {                            
                            signPoint.map((obj, idx) => {
                                return (
                                    <DataMarker
                                        top={false}
                                        position={[obj.rdate, obj.value]}
                                        content={'T'}
                                        style={{
                                            text: {
                                                textAlign: 'left',
                                            },
                                        }}
                                    />
                                );
                            })                            
                        }
                    </Guide>
                </Chart>
            </div>
        );
    }
}

export default autoHeight()(Curved);
