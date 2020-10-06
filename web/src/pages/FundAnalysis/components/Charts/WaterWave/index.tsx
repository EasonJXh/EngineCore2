import React, { Component } from 'react';
import { Chart, Geom, Guide } from 'bizcharts';
import autoHeight from '../autoHeight';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Drawer } from 'antd';
import SingleZH from '../SingleZH';

//組件參數定義
export interface WaterWaveProps {
    data: {
        fundcode: string;
        maxvalue: number;
        nowvalue: number;
        assist: number;
    };
    dataIncomeDetail: {
        fundcode: string,
        value: number;
        assist: number;
    }[];
    height: number;
    forceFit?: boolean;
    conTitle?: string;
    unit: string;
    assTitle?: string;
    conUnit?: string;
}

const { Text } = Guide;

class WaterWave extends Component<WaterWaveProps> {

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
        const {
            forceFit = true,
            data,
            conTitle,
            unit,
            assTitle,
            conUnit,
            height,
            dataIncomeDetail,
        } = this.props;

        //轉換格式
        const dataList: {
            gender: string;
            value: number;
        }[] = [
                {
                    gender: data.fundcode,
                    value: (data.nowvalue / data.maxvalue) * 100,
                }
            ];

        const scale = {
            value: {
                min: 0,
                max: 100,
            },
        };
        let content: string = '';
        if (data.fundcode == "days" || data.fundcode == "allamouonts") {
            content = data.nowvalue + unit;
        } else {
            content = unit + data.nowvalue
        }

        //根據數值變化顏色
        let conColor: string = '';
        if (data.nowvalue < 0) {
            conColor = '#f5222d';
        } else {
            conColor = '#10239e';
        }

        return (
            <>
                <Chart data={dataList} height={height} padding={[0, 0, -3, 0]} scale={scale} forceFit={forceFit} onPlotClick={this.showDrawer}>
                    <h1 style={{ textAlign: 'right', fontFamily: 'Verdana', color: '#8c8c8c' }}>
                        <Tooltip title={conTitle}>
                            <InfoCircleOutlined />
                        </Tooltip>
                    </h1>
                    <div style={{ float: 'left', marginTop: '-25px' }}>{assTitle + ":" + data.assist + conUnit}</div>
                    <Geom
                        type="interval"
                        position="gender*value"
                        color={conColor}
                        shape="liquid-fill-gauge"
                        style={{
                            lineWidth: 2,
                            fillOpacity: 0.2,
                        }}
                    />
                    <Guide>
                        {
                            dataList.map(
                                row => (<Text
                                    content={content}
                                    top
                                    position={{
                                        gender: row.gender,
                                        value: 50,
                                    }}
                                    style={{
                                        opacity: 1,
                                        fontSize: 23,
                                        fill: '#262626',
                                        textAlign: 'center',
                                    }}
                                />))
                        }
                    </Guide>
                </Chart>
                {/*抽屜頁展示數據*/}
                <Drawer
                    title="各項收益明細"
                    placement="top"
                    height={350}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <div>
                        <SingleZH
                            data={dataIncomeDetail}
                            height={200}
                            tickInterval1={100}
                            tickInterval2={0.5}
                            conColor={'#30C05A'}
                            conTitle1={'收益'}
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

export default autoHeight()(WaterWave);