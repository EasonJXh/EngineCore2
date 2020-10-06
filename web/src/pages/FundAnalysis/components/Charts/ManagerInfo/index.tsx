import React, { Component } from "react";
import { ManagerInfoData } from '../../../data.d';
import { Descriptions, Progress } from "antd";
import { round } from "lodash";
import xiaonan from '../../ManagerImg/xiaonan.jpg';
import panming from '../../ManagerImg/panming.jpg';
import lijun from '../../ManagerImg/lijun.jpg';
import qianjing from '../../ManagerImg/qianjing.jpg';
import wanglele from '../../ManagerImg/wanglele.jpg';
import liugesong from '../../ManagerImg/liugesong.jpg';
import fenmingyuan from '../../ManagerImg/fenmingyuan.jpg';
import fangyuhan from '../../ManagerImg/fangyuhan.jpg';
import guikai from '../../ManagerImg/guikai.jpg';
import caisongsong from '../../ManagerImg/caisongsong.jpg';

export interface ManagerInfoProps {
    data: ManagerInfoData,
    title?: string,
    height?: number;
    width?: number;
}

class ManagerInfo extends Component<ManagerInfoProps>{
    render() {
        const {
            data,
            height,
            width,
        } = this.props;
        const getManagerIcon = (flag?: string) => {
            if (flag == 'xiaonan.jpg') {
                return (
                    <img src={xiaonan} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            } else if (flag == "panming.jpg") {
                return (
                    <img src={panming} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else if (flag == "lijun.jpg") {
                return (
                    <img src={lijun} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else if (flag == "qianjing.jpg") {
                return (
                    <img src={qianjing} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else if (flag == "wanglele.jpg") {
                return (
                    <img src={wanglele} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else if (flag == "liugesong.jpg") {
                return (
                    <img src={liugesong} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else if (flag == "fenmingyuan.jpg") {
                return (
                    <img src={fenmingyuan} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else if (flag == "fangyuhan.jpg") {
                return (
                    <img src={fangyuhan} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else if (flag == "guikai.jpg") {
                return (
                    <img src={guikai} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
            else {
                return (
                    <img src={caisongsong} width={width} height={height} style={{ borderRadius: '5px' }} />
                );
            }
        };
        return (
            <div >

                <Descriptions>
                    <div style={{ float: 'left' }}>
                        <a href={'http://fund.eastmoney.com/manager/'} target={'_blank'}>
                            {getManagerIcon(data.imgPath)}
                        </a>
                    </div>
                    <Descriptions.Item label="經理">{data.manager}</Descriptions.Item>
                    <Descriptions.Item label="國籍">{data.country}</Descriptions.Item>
                    <Descriptions.Item label="性別">{data.sex}</Descriptions.Item>
                    <Descriptions.Item label="學歷">{data.education}</Descriptions.Item>
                    <Descriptions.Item label="從業時間">{data.workdate}</Descriptions.Item>
                    <Descriptions.Item label="管理額度">{data.amount + '億'}</Descriptions.Item>
                    <Descriptions.Item label="最高回報率">{round(data.returnRate * 100) + '%'}</Descriptions.Item>
                    <Descriptions.Item label="策略">{data.memo}</Descriptions.Item>
                </Descriptions>
                {
                    data.managerFund.map(obj => (
                        <div>
                            <div>{obj.fundcode}</div>
                            <div>
                                <Progress size={'small'} percent={obj.value} steps={30} strokeWidth={10} strokeColor="#52c41a" />
                            </div>
                        </div>

                    ))
                }
            </div>
        );
    }
}

export default ManagerInfo;