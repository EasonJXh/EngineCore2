import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip as Tooltip1, Drawer } from 'antd';
import autoHeight from '../autoHeight';
import ManagerInfo from '../ManagerInfo';
import { ManagerInfoData } from '../../../data.d';
import { GetManagerChartInfo } from '../../../service';

export interface PolarstackcolumnrProps {
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

export interface PolarstackcolumnStates {
    managerData: ManagerInfoData;
    drawerVisible: boolean;
}

class Polarstackcolumn extends Component<PolarstackcolumnrProps> {
    state: PolarstackcolumnStates = {
        managerData: {
            manager: '',
            returnRate: 1.23,
            managerFund: [],
        },
        drawerVisible: false,
    }

    //獲得Manager接口數據
    getManagerInfo(name?: string, isVisable?: boolean) {
        const data = GetManagerChartInfo(name);
        data.then((item) => {
            this.setState({
                managerData: item,
                drawerVisible: isVisable,
            });
        })
    }

    //組件加載事件
    componentDidMount() {
        this.getManagerInfo('蕭楠', false);
    }

    //Drawer關閉事件
    onClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };
    render() {
        const {
            data,
            forceFit = true,
            conTitle,
        } = this.props;        

        const { DataView } = DataSet;
        const dv = new DataView();
        dv.source(data).transform({
            type: "fold",
            fields: ["assist", "value"],
            key: "manager",
            value: "count",
            retains: ["fundcode"],
        });
        return (
            <div>
                <Chart height={280} padding={[0, 0, 0, 100]} data={dv} forceFit={forceFit}
                    onPlotClick={
                        ev => {
                            const clickData = ev.data;
                            if (data) {
                                const name = clickData._origin['fundcode'];
                                this.getManagerInfo(name, true);
                            }
                        }
                    }>
                    <h1 style={{ textAlign: 'right', color: '#8c8c8c' }}>
                        <Tooltip1 title={conTitle}>
                            <InfoCircleOutlined />
                        </Tooltip1>
                    </h1>
                    <Coord type="polar" radius={0.8} innerRadius={0.2} />
                    <Legend name="manager" position="left" />
                    <Axis name="fundcode" />
                    <Axis name="count" />
                    <Tooltip />
                    <Geom
                        type="intervalStack"
                        position="fundcode*count"
                        color={'manager'}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    />
                </Chart>
                {/*抽屜頁展示數據*/}
                <Drawer
                    title={'經理介紹'}
                    placement="right"
                    width={550}
                    onClose={this.onClose}
                    visible={this.state.drawerVisible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <ManagerInfo
                        data={this.state.managerData}
                        height={120}
                        width={90}
                    />
                </Drawer>
            </div>
        );
    }
}

export default autoHeight()(Polarstackcolumn);
