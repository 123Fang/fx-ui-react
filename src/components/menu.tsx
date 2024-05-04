import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export type MenuProps = {
  showMenu?: boolean;
};
function Menu(props: MenuProps): JSX.Element {
  const { showMenu } = props;
  const navigate = useNavigate()
  const [menulist] = useState<any>([
    { name: '首页', link: '/' },
    { name: '组件', link: '/docs/index' },
    { name: '更新日志', link: '/docs/updateLog' },
    { name: '问题反馈', link: 'https://github.com/123Fang/fx-ui-react/issues' },
  ])
  // const [menuIndex, setMenuIndex] = useState<number>(1);
  const [menuIndex, setMenuIndex] = useState<number>(sessionStorage.getItem('mIndex') ? Number(sessionStorage.getItem('mIndex')) : 1);
  const menuClick = (index: number, link: string) => {
    const arr = {
      0: '',
      1: '0-0',
      2: '0-2',
    }
    if (index !== 3) {
      setMenuIndex(index);
      navigate(link)
      sessionStorage.setItem('menuIndex', arr[index])
      sessionStorage.setItem('mIndex', index.toString())
    } else {
      window.open(link)
    }
  }
  useEffect(() => {
    setMenuIndex(sessionStorage.getItem('mIndex') ? Number(sessionStorage.getItem('mIndex')) : 1)
  }, [location.pathname])

  return (
    <div>
      {showMenu ? (
        <div className="MenuBoxInner">
          <div className="menuinnerBox">
            <div className="leftMenuLogo">
              <div className="logo"  onClick={() => navigate('/')} />
              <span className="version">V0.1.5</span>
            </div>
            <div className="menuitemBox">
              {
                menulist.map((item: any, index: number) => (
                  <li key={index} className={menuIndex === index ? 'active' : ''} onClick={ () => menuClick(index, item.link) }>{item.name}</li>
                ))
              }
            </div>
            <div className="linsArea1">
              <span className="github" onClick={() => window.open('https://github.com/123Fang/fx-ui-react')} />
              <span className="npm" onClick={() => console.log('还为发布npm包')} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
Menu.defaultProps = {
  showMenu: true,
};
export default React.memo(Menu);
