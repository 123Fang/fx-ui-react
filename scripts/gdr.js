import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const [, , name_En, name_Zh, category] = process.argv
const name_En_Up = name_En.slice(0, 1).toUpperCase() + name_En.slice(1)
const name_En_Low = name_En.slice(0, 1).toLowerCase() + name_En.slice(1)


const demoCompDir =  path.join(__dirname, '../src/demo', name_En_Low)
// 如果demo目录存在，直接退出，给出提示
if (fs.existsSync(demoCompDir)) {
  console.log(`${name_En_Low} 组件在文档demo中已存在！`);
  process.exit(1);
}

// 创建demo组件目录
fs.mkdirSync(demoCompDir, { recursive: true });

// 生成demo
const demoTemplate = `
import React from 'react';
import { ${name_En_Up} } from '../../../packages';

export default function Demo() {

  return (<div><${name_En_Up}>${name_Zh}</${name_En_Up}></div>)
}
`
fs.writeFileSync(path.join(demoCompDir,'demo1.tsx'), demoTemplate)



const pageCompFilePath = path.join(__dirname, '../src/pages/packages', `${name_En_Low}.tsx`)
// page组件是否存在
if (fs.existsSync(pageCompFilePath)) {
  console.log(`${name_En_Low} 组件在文档pages中已存在！`);
  process.exit(1);
}
const pageCompTemplate = `
/*
  @name:"${name_En_Up} ${name_Zh}"
  @group:"${category}"
*/
import React from 'react';
import Title from '../../components/title';
import InstanceView from '../../layout/instanceView';
import Demo1 from '../../demo/${name_En_Low}/demo1';


export default function ButtonPage() {
  return (
    <>
      <Title title="${name_En_Up}" notes="${name_Zh}" desc="组件描述..." />
      <InstanceView
        subtitle="基本使用"
        subnotes=""
        demo={<Demo1 />}
        subdesc="${name_En_Up} ${name_Zh}的基本使用."
        path="${name_En_Low}/demo1"
      />
    </>
  );
}
`
fs.writeFileSync(pageCompFilePath, pageCompTemplate)


// 生成文档路由文件
console.log('生成组件文档路由配置成功')

