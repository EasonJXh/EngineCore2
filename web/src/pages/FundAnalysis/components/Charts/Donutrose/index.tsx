import React, { Component } from "react";
import {
    Chart,
    Geom,
    Tooltip,
    Coord,
    Legend,
} from "bizcharts";
import autoHeight from '../autoHeight';

export interface DonutroseProps{
    data:{
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height?:number;
    forceFit?: boolean;
}

class Donutrose extends Component<DonutroseProps> {
    render() {
        const{
            data,
            forceFit=true,
        }=this.props;        

        return (
            <div>
                <Chart height={400} data={data}  forceFit={forceFit}>
                    <Coord type="polar" innerRadius={0.2} />
                    <Tooltip />
                    <Legend
                        position="right-center"
                    />
                    <Geom
                        type="interval"
                        color="fundcode"
                        position="fundcode*value"
                        style={{
                            lineWidth: 0,
                            stroke: "#fff"
                        }}
                    />
                </Chart>
            </div>
        );
    }
}

export default autoHeight()(Donutrose);