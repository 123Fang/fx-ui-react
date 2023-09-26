import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'


export default function Index() {
  const navigate = useNavigate();
  const [menulist] = useState([
    { name: "首页", path: "/" },
    { name: "组件", path: "/docs/index" },
    { name: "更新日志", path: "/" },
    { name: "问题反馈", path: "/" },
  ])
  const [menuIndex, setMenuIndex] = useState(0)
  sessionStorage.removeItem('menuIndex')
  return (
    <div className="fx-ui-react-home-inner">
      <div className="homeBoxinner">
        <div className="homeHeader">
          <div className="homeHaderInner">
            <div className="logoArea">
              <span className="logoImg" />
              <span className="nameSpan">fx-ui-react</span>
            </div>
            <div className="menuArea">
              {
                menulist.map((item, index) => (
                  <li key={index} className={menuIndex === index ? 'active' : ''} onClick={() => { setMenuIndex(index); navigate(item.path) }}>{item.name}</li>
                ))
              }
            </div>
            <div className="linsArea">
              <span className="github" onClick={() => window.open('https://github.com/123Fang/fx-ui-react')} />
              <span className="npm" onClick={() => console.log('即将推到npm...') } />
            </div>
          </div>
        </div>
        <div className="imgLogo">
          <span />
        </div>
        <h3>目标：轻量级UI组件库，完美支持React18+TS+Vite</h3>
        <p className="tiBox">React18+TS+Vite，更小，更快，拓展性更强，正在coding中，欢迎一起共建！ </p>
        <div className="contentBoxInnerHome">
          <div className="homeBtnGroup">
            <button onClick={() => navigate('/docs/index')}>快速开始</button>
            <button onClick={() => navigate('/docs/index')}>Github</button>
          </div>
          <div className="compentsdescBoxInner">
            <div className="compentsdescBoxItemInner">
              <div className="itemInner">
                <div className="itemIcon descicon1" />
                <div className="itemDesc">
                  <p>更小的体积</p>
                  <div className="itemdescContent">目标就是 更小体积</div>
                </div>
              </div>
              <div className="itemInner">
                <div className="itemIcon descicon2" />
                <div className="itemDesc">
                  <p>快速响应</p>
                  <div className="itemdescContent">目标就是 快速响应</div>
                </div>
              </div>
              <div className="itemInner">
                <div className="itemIcon descicon3" />
                <div className="itemDesc">
                  <p>更强的拓展性</p>
                  <div className="itemdescContent">目标就是 更强的拓展性</div>
                </div>
              </div>
              <div className="itemInner">
                <div className="itemIcon descicon4" />
                <div className="itemDesc">
                  <p>Typescript支持</p>
                  <div className="itemdescContent">React+Typescript+vite</div>
                </div>
              </div>
              <div className="itemInner">
                <div className="itemIcon descicon5" />
                <div className="itemDesc">
                  <p>渲染更快</p>
                  <div className="itemdescContent">目标就是 渲染更快</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footerInner">
        Copyright © 2023. All Rights Reserved
      </div>
    </div >
  )
}
