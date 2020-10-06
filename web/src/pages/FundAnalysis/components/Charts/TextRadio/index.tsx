import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Coord,
    Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";
import autoHeight from '../autoHeight';
import { PriceTrendModel } from '../../../data.d';
import { GetIndexDataDetail } from '../../../service';
import Curved from '../Curved';
import { round } from "lodash";
import { Drawer } from "antd";

const { Text } = Guide;

export interface TextRadioProps {
    data: PriceTrendModel;
    height: number;
    forceFit?: boolean;
}

export interface TextRadioState {
    indexList: PriceTrendModel[];
    visible: boolean;
}

class TextRadio extends Component<TextRadioProps> {
    //初始化組件狀態
    state: TextRadioState = {
        indexList: [],
        visible: false,
    };
    //獲得數據
    getIndexList(params: string, isShow: boolean) {
        const data = GetIndexDataDetail(params);
        data.then((item) => {
            this.setState({
                indexList: item,
                visible: isShow,
            });
        })
    }
    //關閉抽屜數據展示
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    //組件加載事件
    componentDidMount() {
        this.getIndexList('sh000001', false);
    }
    //開始渲染
    render() {

        const {
            data,
            height,
            forceFit = true,
        } = this.props;
        const { DataView } = DataSet;
        let dataList: PriceTrendModel[] = [];
        dataList.push(data);
        dataList.push(
            {
                fundcode: data.fundcode + "I",
                value: round(data.value * 0.1, 1),
                assist: data.assist,
                rdate: data.rdate,
            }
        );
        const dv = new DataView();
        dv.source(dataList).transform({
            type: "percent",
            field: "value",
            dimension: "fundcode",
            as: "percent"
        });
        return (
            <>
                <Chart
                    height={height}
                    data={dv}
                    padding={[0, 0, 0, 0]}
                    forceFit={forceFit}
                    onPlotClick={()=>{this.getIndexList(data.fundcode,true)}}
                >
                    <Coord type={"theta"} radius={0.8} innerRadius={0.95} />
                    <Axis name="percent" />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color={['fundcode', '#1D39C4-#E7EAED']}
                    >
                    </Geom>
                    <Guide>
                        <Text
                            position={["50%", "30%"]}
                            content={data.rdate}
                            style={{
                                textAlign: "center",
                                fontSize: 13,
                                fill: "red",
                            }}
                        />
                        <Text
                            position={["50%", "45%"]}
                            content={data.fundcode}
                            style={{
                                textAlign: "center",
                                fontSize: 24,
                                fill: "#353535"
                            }}
                        />

                        <Text
                            position={["50%", "60%"]}
                            content={data.value.toString()}
                            style={{
                                textAlign: "center",
                                fontSize: 23,
                                fill: "#353535"
                            }}
                        />
                        <Text
                            position={["50%", "70%"]}
                            content={data.assist.toString() + "%"}
                            style={{
                                textAlign: "center",
                                fontSize: 13,
                                fill: "blue",
                            }}
                        />
                    </Guide>
                </Chart>
                {/*抽屜頁展示數據*/}
                <Drawer
                    title={data.fundcode+"波動趨勢"}
                    placement="top"
                    height={350}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Curved 
                    data={this.state.indexList}
                    unit={' '}
                    conTitle={'指數波動趨勢'}
                    height={250}
                    />
                </Drawer>
            </>
        );
    }
}

export default autoHeight()(TextRadio);
