import { TransactionOutlined, PayCircleOutlined, AccountBookOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { RateModel } from '../../../data.d';
import styles from './index.less';
import { round } from 'lodash';
import { Drawer } from 'antd';
import SingleZH from '../SingleZH';

export interface TextCardProps {
    fundcode?: string;
    rdate?: string;
    text?: string;
    value: string;
    avator: number;
    dataIncome: RateModel[];
}

class TextCard extends Component<TextCardProps>{
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
            fundcode,
            rdate,
            value,
            text,
            avator,
            dataIncome,
        } = this.props;
        let data1: RateModel[] = [];
        dataIncome.forEach(obj => {
            data1.push(
                {
                    fundcode: obj.fundcode,
                    value: obj.value,
                    assist: round(obj.value / obj.assist * 100, 2),
                }
            );
        });
        const showIcon = (params: number) => {
            if (params == 0) {
                return (
                    <AccountBookOutlined
                        className={styles.avator}
                    />
                );
            } else if (params == 1) {
                return (
                    <AccountBookOutlined
                        className={styles.avator}
                    />
                );
            } else if (params == 2) {
                return (
                    <TransactionOutlined
                        className={styles.avator}
                        onClick={this.showDrawer}
                    />
                );
            } else {
                return (
                    <PayCircleOutlined
                        className={styles.avator}
                    />
                );
            }
        }
        return (
            <div className={styles.TextCard}>
                {showIcon(avator)}
                <div className={styles.title}>
                    {fundcode}
                </div>
                <div className={styles.content}>{rdate + "," + text + ": "}
                    <span className={styles.spanText}>{value}</span>
                </div>
                {/*抽屜頁展示數據*/}
                <Drawer
                    title="最新收益明細"
                    placement="top"
                    height={350}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <div>
                        <SingleZH
                            data={data1}
                            height={200}
                            tickInterval1={2000}
                            tickInterval2={0.5}
                            conColor={'#30C05A'}
                            conTitle1={'額度'}
                            conTitle2={'收益率'}
                            unit1={'元'}
                            unit2={'%'}
                        />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default TextCard;