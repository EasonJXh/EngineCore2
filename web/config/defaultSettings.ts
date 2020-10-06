import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 深海蓝（geekblue-7）
  primaryColor: '#1d39c4',
  layout: 'topmenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Engine Core',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
