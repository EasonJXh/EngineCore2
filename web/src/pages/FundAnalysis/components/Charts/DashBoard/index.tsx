import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Drawer} from 'antd';
import React, { Component } from 'react';
import { Chart, Axis, Coord, Geom, Guide, View } from 'bizcharts';
import autoHeight from '../autoHeight';
import SingleZH from '../SingleZH';
//定義組件必須的參數
export interface GaugeProps {
  height: number;
  data: {
    fundcode: string;
    maxvalue: number;
    nowvalue: number;
    assist: number;
  };
  dataPriceDetail: {
    fundcode: string,
    value: number;
    assist: number;
  }[];
  conTitle?: string;
  forceFit?: boolean;
  assTitle?: string;
}

const { Text } = Guide;
class GaugeTick extends Component<GaugeProps> {
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
    //構造數據
    //modelList定義    
    const {
      data,
      forceFit = true,
      conTitle,
      assTitle,
      height,
      dataPriceDetail,
    } = this.props;

    //根據數值變化顏色
    let conColor: string = '';
    if (data.nowvalue < 0) {
      conColor = '#4FC973';
    } else {
      conColor = '#10239e';
    }

    const data1: { type: string; value: number; }[] = [];
    const data2: { type: string; value: number; }[] = [];
    //構造外刻度盤數據
    for (let i = -10; i <= data.maxvalue;) {

      const item = {
        type: `${i}`,
        value: 7,
      };
      data1.push(item);
      i += 0.5;
    }
    //構造當前刻度值數據
    for (let i = -10; i <= data.maxvalue;) {
      const item = {
        type: `${i}`,
        value: 6,
      };
      if (i == data.nowvalue) {
        item.value = 10;
      }
      if (i > data.nowvalue) {
        item.value = 0;
      }
      data2.push(item);
      i += 0.5;
    }
    const cols = {
      type: {
        range: [0, 1],
      },
      value: {
        sync: true,
      },
    };

    const colsView2 = {
      type: {
        tickCount: 3,
      },
    };
    //顯示內容
    const content = data.nowvalue + "%";
    return (
      <>
        <Chart height={height} scale={cols} padding={[0, 0, 0, 0]} forceFit={forceFit} onPlotClick={this.showDrawer}>
          <h1 style={{ textAlign: 'right', color: '#8c8c8c' }}>
            <Tooltip title={conTitle + data.fundcode}>
              <InfoCircleOutlined />
            </Tooltip>
          </h1>
          <div style={{ float: 'left', marginTop: '-25px' }}>{assTitle + ":" + data.assist}</div>
          <View data={data1}>
            <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.8} innerRadius={0.75} />
            <Geom type="interval" position="type*value" color='rgba(0, 0, 0, 0.09)' size={3} />
          </View>
          <View data={data1} scale={colsView2}>
            <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.6} innerRadius={0.95} />
            <Geom type="interval" position="type*value" color='rgba(0, 0, 0, 0.09)' size={3} />
            <Axis
              name="type"
              grid={null}
              line={null}
              tickLine={null}
              label={{
                offset: -5,
                textStyle: {
                  fontSize: 12,
                  fill: '#CBCBCB',
                  textAlign: 'center',
                },
              }}
            />
            <Axis name="value" visible={false} />
          </View>
          <View data={data2} >
            <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.8} innerRadius={0.75} />
            <Geom type="interval" position="type*value" color={conColor} opacity={1} size={3} />
            <Guide>
              <Text
                position={['50%', '65%']}
                content={content}
                style={{
                  fill: '#262626',
                  fontSize: 25,
                  textAlign: 'center',
                  textBaseline: 'middle',
                }}
              />
            </Guide>
          </View>
        </Chart>

        {/*抽屜頁展示數據*/}
        <Drawer
          title="各項波動明細"          
          placement="top"
          height={350}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}          
        >
          <div>
          <SingleZH 
          data={dataPriceDetail}
          height={200}
          tickInterval1={1}
          tickInterval2={0.5}
          conColor={'#30C05A'}
          conTitle1={'價格'}   
          conTitle2={'增長率'}
          unit1={'元'}
          unit2={'%'}       
          />
          </div>
        </Drawer>
      </>
    );
  }
}

export default autoHeight()(GaugeTick);