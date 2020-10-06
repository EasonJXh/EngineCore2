import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.less';

export interface MiniProgressProps {
  target: number;
  targetLabel?: string;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
}

const MiniProgress: React.FC<MiniProgressProps> = ({
  targetLabel,
  target,
  color = 'gold',
  strokeWidth,
  percent,
}) => (
  <div className={styles.miniProgress} style={{backgroundColor:'rgb(31, 183, 218,0.4)'}}>
    <Tooltip title={targetLabel}>
      <div className={styles.target} style={{ left: target ? `${target}%` : undefined }}>
        <span style={{ backgroundColor: color || undefined }} />
        <span style={{ backgroundColor: color || undefined }} />
      </div>
    </Tooltip>
    <div className={styles.progressWrap} style={{backgroundColor:'rgb(31, 183, 218,0.05 )'}}>
      <div
        className={styles.progress}
        style={{
          backgroundColor: color || undefined,
          width: percent ? `${percent}%` : undefined,
          height: strokeWidth || undefined,
        }}
      />
    </div>
  </div>
);

export default MiniProgress;
