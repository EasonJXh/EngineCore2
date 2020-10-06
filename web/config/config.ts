// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: '注册页',
          icon: 'smile',
          path: '/user/userregister',
          component: './UserRegister',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/user/login',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'bank',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/analysis',
              name: 'analysis',
              icon: 'PieChart',
              routes:[
                {
                  name: 'example',
                  icon: 'BarChart',
                  path: '/analysis/example',
                  component: './Analysis',
                },
                {
                  name: 'fundanalysis',
                  icon: 'Rise',
                  path: '/analysis/fundanalysis',
                  component: './FundAnalysis',
                },
              ],
            },
            //同菜單多路由配置樣例（切記在配置多級路由時一定要配置父路由路徑）
            {
              path: '/list',
              name: 'list',
              icon: 'table',
              routes: [
                {
                  name: 'datacollect',
                  icon: 'send',
                  path: '/list/datacollect',
                  component: './DataCollect',
                },
                {
                  name: 'ListTableList',
                  icon: 'Dollar',
                  path: '/list/list',
                  component: './ListTableList',
                },
                {
                  name: 'report',
                  icon: 'smile',
                  path: '/list/report',
                  component: './report',
                },
              ],
            }, 
            {
              path: '/platform',
              name: 'platform',
              icon: 'control',
              routes: [
                {
                  name: 'manager',
                  icon: 'key',
                  path: '/platform/manager',
                  component: './Manager',
                },
              ],
            },
            {
              path: '/set',
              name: 'set',
              icon: 'Setting',
              routes: [
                {
                  name: 'sysSet',
                  icon: 'key',
                  path: '/set/sysSet',
                  component: './SysSet',
                },
              ],
            },           
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
