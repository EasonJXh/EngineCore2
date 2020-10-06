import React, { Component } from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';

export interface TimeLineProps {
  data: {
      fundcode: string,
      value: number;
      assist: number;
  }[];
  height?: number;
  forceFit?: boolean;
}

const ds = new DataSet({
  state: {
    start: 0,
    end: 1,
  },
});
class TimeLine extends Component<TimeLineProps> {  
  handleSliderChange = e => {
    console.log(e);
    const { startRadio, endRadio } = e;
    ds.setState('start', startRadio);
    ds.setState('end', endRadio);
  };
  render() {
    const {
      data,
      forceFit=true,
    }=this.props;
    const cols = {
      value: {
        tickInterval: 20,
      },
    };
    const dv = ds.createView('origin').source(data);
    dv.transform({
      type: 'filter',
      callback(item, idx) {
        const radio = idx / data.length;
        return radio >= ds.state.start && radio <= ds.state.end;
      },
    });
    return (
      <div>
        <Chart height={400} padding='auto' data={dv} scale={cols} forceFit={forceFit}>
          <Axis name="fundcode" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="fundcode*value" />
        </Chart>
        <Slider
          data={data}
          padding={60}
          xAxis="fundcode"
          yAxis="value"
          onChange={this.handleSliderChange}
        />
      </div>
    );
  }
}

export default autoHeight()(TimeLine);
