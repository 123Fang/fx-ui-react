import React, { useState } from "react";
import Title from '../../components/title';

export default function UpdateLog() {
  const [updateLogList] = useState<any>([
    {
      version: '0.0.0',
      time: '2023-09-25',
      log: [
        {
          title: '创建fx-ui-react',
          content: ['first commit 提交READMD.MD文档'],
        }
      ]
    },
    {
      version: '0.0.1',
      time: '2023-09-25',
      log: [
        {
          title: '初始化项目的目录结构',
          content: ['用vite创建react项目作为组件库文档,', '创建packgaes目录作为组件库目录', '新增Button组件模版'],
        }
      ]
    },
    {
      version: '0.0.2',
      time: '2023-09-25',
      log: [
        {
          title: '优化',
          content: ['完善组件文档组件编写', '文档目录结构调整', 'eslint配置调优', 'Button组件编写'],
        }
      ],
    },
    {
      version: '0.0.3',
      time: '2023-09-26',
      log: [
        {
          title: '优化',
          content: ['完善组件文档首页部分', 'Button组件编写'],
        },
        {
          title: '新增',
          content: ['动态导入组件', '图片资源', '.d.ts类型声明文件']
        }
      ],
    }
  ])
  return (
    <div>
      <Title title="更新日志" desc="记录 fx-ui-react 组件库的更新日志及重大版本更新节点。" />
      {
        updateLogList.reverse().map((item: any, index: number) => (
          <div className="updatelogInner" key={index}>
            <p className="verisonInfo">版本： <span className="version">v{item.version}</span> <span className="time">{item.time}</span></p>
            {
              item.log.map((v: any, i: number) => (
                <div className="updateContent" key={i}>
                  <p>{v.title}：</p>
                  <div className="linedeiv">
                    {
                      v.content.map((c: any, j: number) => (
                        <li key={j}>{j + 1}、{c}</li>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }

      <div className="updatelogInner">
        <p className="verisonInfo">版本： <span className="version">v0.0.1</span> <span className="time">日期：</span></p>
        <div className="updateContent">
          初始化组件库项目框架，技术选型，加油!
        </div>
      </div>
    </div>
  )
}