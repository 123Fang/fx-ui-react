// 路由配置
import IndexPage from '../../pages/index';
import HomePage from '../../pages/home';
import LayoutPage from '../../pages/layout';
import ButtonPage from '../../pages/packages/button';
import Nofound from '../../pages/404';
import InderInner from '../../pages/packages/index';

const BaseRouter: any = [
  {
    path: '/*',
    element: <HomePage />,
  },
  {
    path: '/docs*',
    element: <IndexPage />,
    children: [
      {
        path: '/index',
        element: <InderInner />,
        name: '贡献指南',
        group: '快速上手',
        router: '/docs/index',
      },
      {
        path: '/react/*',
        element: <LayoutPage />, // 二级路由
        children: [
          {
            path: '/button',
            element: <ButtonPage />,
            name: 'Button 按钮',
            group: '通用',
            router: '/docs/react/button',
          }
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Nofound />,
  },
];
export default BaseRouter;
