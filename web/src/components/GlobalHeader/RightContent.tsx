import { Tooltip, Tag, Badge } from 'antd';
import { BellOutlined, MessageOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  theme?: SiderTheme | 'realDark';
  layout: 'sidemenu' | 'topmenu';
}

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="Ant Design"
        options={[
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          { label: <a href="http://10.244.186.111:8000/list/datacollect/">操作記錄錄入</a>, value: '操作記錄錄入' },
          {
            label: <a href="http://10.244.186.111:8000/list/list/">表單示例</a>,
            value: '表單示例',
          },
          {
            label: <a href="http://10.244.186.111:8000/list/report/">高級表單</a>,
            value: '高級表單',
          },
          {
            label: <a href="http://10.244.186.111:8000/analysis/example">示例圖表</a>,
            value: '示例圖表',
          },
          {
            label: <a href="http://10.244.186.111:8000/analysis/fundanalysis/">核心數據分析</a>,
            value: '示例圖表',
          },
        ]}
      // onSearch={value => {
      //   //console.log('input', value);
      // }}
      />
      <Tooltip title="系統提醒">
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <BellOutlined />
        </a>
      </Tooltip>
      <Tooltip title="TimChat">
        <a
          target="_blank"
          href="http://10.244.186.111:8899"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Badge dot>
            <MessageOutlined />
          </Badge>
        </a>
      </Tooltip>
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
