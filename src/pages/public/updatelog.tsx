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
    },
    {
      version: '0.0.4',
      time: '2023-09-26',
      log: [
        {
          title: '优化',
          content: ['完善组件文档首页部分', 'Button组件编写完善'],
        },
        {
          title: '修复',
          content: ['解决ts报错问题']
        }
      ],
    },
    {
      version: '0.0.5',
      time: '2023-09-27',
      log: [
        {
          title: '优化',
          content: ['Button组件编写完善']
        }
      ]
    },
    {
      version: '0.0.6',
      time: '2023-09-27',
      log: [
        {
          title: '新增',
          content: ['tag,message,input 组件']
        }
      ]
    },
    {
      version: '0.0.7',
      time: '2023-09-27',
      log: [
        {
          title: '完善 & 新增',
          content: ['完善input组件','新增 swiper,textArea 组件']
        }
      ]
    },
    {
      version: '0.0.8',
      time: '2023-09-30',
      log: [
        {
          title: '修复',
          content: ['修复文档生产打包bug']
        }
      ]
    },
    {
      version: '0.0.9',
      time: '2023-09-30',
      log: [
        {
          title: '新增',
          content: ['集成script命令，自动生成组件模版,入口文件，组件库文档demo页面']
        }
      ]
    },
    {
      version: '0.1.0',
      time: '2023-09-30',
      log: [
        {
          title: '新增',
          content: ['使用 pnpm new 创建 confirm 组件']
        }
      ]
    },
    {
      version: '0.1.1',
      time: '2023-10-01',
      log: [
        {
          title: '优化',
          content: ['优化 script/gc.js ']
        }
      ]
    },
    {
      version: '0.1.2',
      time: '2023-10-03',
      log: [
        {
          title: '完善',
          content: ['loading, message, confirm, input 添加到组件文档 demo 中']
        },
        {
          title: '修复',
          content: ['在生成组件文档脚本中，添加“反馈”组件分类']
        }
      ]
    },
    {
      version: '0.1.3',
      time: '2023-10-06',
      log: [
        {
          title: '新增',
          content: ['新增 table,empty 组件']
        },
        {
          title: '完善',
          content: ['完整组件库文档 table, empty 的 demo展示']
        }
      ]
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
