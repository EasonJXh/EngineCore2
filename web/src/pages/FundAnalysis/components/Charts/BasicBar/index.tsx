import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
} from "bizcharts";
import DataSet from "@antv/data-set";
import autoHeight from '../autoHeight';

export interface BasicBarProps {
    data: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height?: number;
    forceFit?: boolean;
    conTitle?: string;
}

class BasicBar extends Component<BasicBarProps> {
    render() {
        const {
            data,
            forceFit = true,
            conTitle,
        } = this.props;
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.source(data).transform({
            type: "sort",
        });

        return (
            <div>
                <Chart height={300} data={dv} forceFit={forceFit}>
                    <h1 style={{ textAlign: 'left', color: '#8c8c8c' }}>{conTitle}</h1>
                    <Coord transpose />
                    <Axis
                        name="fundcode"
                        label={{
                            offset: 1
                        }}
                    />
                    <Axis name="value"
                        label={{
                            formatter: val => `${val}`+'元'
                        }} />
                    <Tooltip />
                    <Geom type="interval" position="fundcode*value" color='#3492EF' >
                        <Label content="value" offset={5} />
                    </Geom>
                    
                </Chart>
            </div>
        );
    }
}

export default autoHeight()(BasicBar);