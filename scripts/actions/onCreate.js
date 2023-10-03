/* eslint-disable no-case-declarations */
import inquirer from 'inquirer'
import { red } from 'kolorist'
import { genComponent, genDocRoute, genLibEntry } from './jobs/index.js'

// create type 支持项
const CREATE_TYPES = ['component', 'lib-entry', 'doc-route']
// 文档分类
const DOCS_CATEGORIES = ['常规', '通用', '数据', '交互', '反馈','其他']

const DOCS_ROUTER = ['需要', '不需要']

export async function onCreate(cmd = {}) {
  let { type } = cmd
  console.log('-----', cmd)

  // 如果没有在命令参数里带入 type 那么就询问一次
  if (!type) {
    const result = await inquirer.prompt([
      {
        // 用于获取后的属性名
        name: 'type',
        // 交互方式为列表单选
        type: 'list',
        // 提示信息
        message: '（必填）请选择创建类型：',
        // 选项列表
        choices: CREATE_TYPES,
        // 默认值，这里是索引下标
        default: 0
      }
    ])
    // 赋值 type
    type = result.type
  }

  // 如果获取的类型不在我们支持范围内，那么输出错误提示并重新选择
  if (CREATE_TYPES.every(t => type !== t)) {
    console.log(
      red(
        `当前类型仅支持：${CREATE_TYPES.join(', ')}，收到不在支持范围内的 "${type}"，请重新选择！`
      )
    )
    return onCreate()
  }

  try {
    switch (type) {
      case 'component':
        // 如果是组件，我们还需要收集一些信息
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '（必填）请输入组件 name（英文名称） ，将用作目录及文件名：',
            validate: value => {
              if (value.trim() === '') {
                return '组件 name 是必填项！'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '（必填）请输入组件中文名称，将用作文档列表显示：',
            validate: value => {
              if (value.trim() === '') {
                return '组件名称是必填项！'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '（必填）请选择组件分类，将用作文档列表分类：',
            choices: DOCS_CATEGORIES,
            default: 0
          }
        ])
        await genComponent(info.name)

        const entryInfo = await inquirer.prompt([
          {
            name: 'category',
            type: 'list',
            message: '此组件是否需要自动引入到组件的 entry 文件中',
            choices: DOCS_ROUTER,
            default: 0
          }
        ])
        if (entryInfo.category === '需要') {
          genLibEntry()
        }

        const routerPageInfo = await inquirer.prompt([
          {
            name: 'category',
            type: 'list',
            message: '是否需要在文档项目生成此组件的路由页面',
            choices: DOCS_ROUTER,
            default: 0
          }
        ])
        if (routerPageInfo.category === '需要') {
          genDocRoute(info)
        }
        break
      case 'lib-entry':
        genLibEntry()
        break
      case 'doc-route':
        const routeInfo = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '（必填）请输入组件 name（英文名称） ，将用作文档路由路径：',
            validate: value => {
              if (value.trim() === '') {
                return '组件 name 是必填项！'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '（必填）请输入组件中文名称，将用作文档列表显示：',
            validate: value => {
              if (value.trim() === '') {
                return '组件名称是必填项！'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '（必填）请选择组件分类，将用作文档列表分类：',
            choices: DOCS_CATEGORIES,
            default: 0
          }
        ])
        genDocRoute(routeInfo)
        break
      default:
        break
    }
  } catch (e) {
    console.log(red('✖') + e.toString())
    process.exit(1)
  }
}
