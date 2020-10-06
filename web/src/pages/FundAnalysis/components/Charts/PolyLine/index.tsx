import React, { Component } from 'react';
import autoHeight from '../autoHeight';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
// import moment from 'moment';

export interface PolyLineProps{
    data:{
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height?:number;
    forceFit?: boolean;
}

//折線圖示例
// const data = [
//     { "date": '20200228', "value": "60" },
//     { "date": '20200229', "value": "80" },
//     { "date": '20200301', "value": "99" },
//     { "date": '20200302', "value": "89" },
//     { "date": '20200303', "value": "79" },
//     { "date": '20200304', "value": "89" },
//     { "date": '20200305', "value": "49" },
//     { "date": '20200306', "value": "79" },
//     { "date": '20200307', "value": "69" },
// ];

const scale = {
    // date: {type: 'cat'},
    value: {
        type: "linear",
        formatter: (val: string) => {
            return "¥"+val;
        },
        tickCount: 5,
    }
};

class PolyLine extends Component<PolyLineProps> {
    render() {
        const {
            data,
            forceFit=true,
        }=this.props;
        return (
            <Chart height={280}  data={data.map(item => {
                const fundcode = item.fundcode;
                return Object.assign({ fundcode }, item);
            })} scale={scale} forceFit={forceFit}>
                <Axis name="fundcode" />
                <Axis name="value" />
                <Tooltip />
                <Geom type="line" position="fundcode*value" shape='smooth' color='#3023AE' />
            </Chart>
        );
    }
}

export default autoHeight()(PolyLine);