/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const name_En = process.argv[2] // 组件名

if (!name_En) {
  console.log('请填写组件名 --- Usage: button（单个） 或 dropDown（小驼峰式）')
  process.exit(1);
}
if (/-/.test(name_En)) {
  console.log('请重新输入小驼峰式的组件名，如 dropDown')
  process.exit(1);
}

const name_En_Up = name_En.slice(0, 1).toUpperCase() + name_En.slice(1)
const name_En_Low = name_En.slice(0, 1).toLowerCase() + name_En.slice(1)

const PACKAGES_DIR_PATH = path.join(path.resolve(__dirname), '..', 'packages'); // packages目录
const COMP_DIR_PATH = path.join(PACKAGES_DIR_PATH, name_En_Up); // 组件目录

// 如果存在，给出提示，然后退出
if (fs.existsSync(COMP_DIR_PATH)) {
  console.log(`${name_En_Low} 组件已经存在，请更换组件名！`);
  process.exit(1);
}

// 创建组件目录
fs.mkdirSync(COMP_DIR_PATH, { recursive: true });

// Component.tsx 文件模版
const reactComponentContent = `
import React, { CSSProperties } from 'react';
import './style.scss';
import classNames from 'classnames';

export type ${name_En_Up}Props = {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>,
};

function ${name_En_Up}(props: ${name_En_Up}Props): JSX.Element {
  const { style, className, children, onClick } = props;


  const ${name_En_Low}Class = classNames({
    'fx_${name_En_Low}': true,
    [className || '']: !!className
  });
  
  return (<div className={${name_En_Low}Class} style={style || undefined}></div>)
}

${name_En_Up}.defaultProps = {
  style: '',
  className: '',
  onClick: () => { },
};

export default ${name_En_Up};
`
fs.writeFileSync(path.join(COMP_DIR_PATH, `${name_En_Low}.tsx`), reactComponentContent);



// index.ts 文件模版
const indexTsContent = `
import ${name_En_Up} from './${name_En_Low}';

export type { ${name_En_Up}Props } from './${name_En_Low}';
export default ${name_En_Up};
`
fs.writeFileSync(path.join(COMP_DIR_PATH, 'index.ts'), indexTsContent);



// style.scss 文件模版
const styleContent = `
.fx_${name_En_Low} {

} 
`
fs.writeFileSync(path.join(COMP_DIR_PATH, 'style.scss'), styleContent);

console.log(`创建组件${name_En_Up}成功，模版已生成`)

