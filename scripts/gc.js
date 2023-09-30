/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const args = process.argv.slice(2);


const NAME = args[0]; // 组件名
const FILE_PATH = path.join(path.resolve(__dirname), '..', 'packages');

let NORMALIZED_NAME = NAME.slice(0, 1).toUpperCase() + NAME.slice(1)
let NORMALIZED_NAME_LOW = NAME.slice(0, 1).toLowerCase() + NAME.slice(1)

if (!args.length) {
  console.log('请填写组件名');
  console.log('Usage: button（单个） 或 dropDown（小驼峰式）')
  process.exit(1);
}
if (/-/.test(NAME)) {
  console.log('请重新输入小驼峰式的组件名，如 dropDown')
  process.exit(1);
}

const DIRNAME = path.join(FILE_PATH, NORMALIZED_NAME); // 组件目录

// 如果存在，给出提示，然后退出
if (fs.existsSync(DIRNAME)) {
  console.log(`${NAME} 组件已经存在，请更换组件名！`);
  process.exit(1);
}



// 创建组件目录
fs.mkdirSync(DIRNAME, { recursive: true });


// Button.tsx
const reactComponentContent = `
import React, { CSSProperties } from 'react';
import './style.scss';
import classNames from 'classnames';

export type ${NORMALIZED_NAME}Props = {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>,
};

function ${NORMALIZED_NAME}(props: ${NORMALIZED_NAME}Props): JSX.Element {
  const { style, className, children, onClick } = props;


  const ${NORMALIZED_NAME_LOW}Class = classNames({
    'fx_${NORMALIZED_NAME_LOW}': true,
    [className || '']: !!className
  });
  
  return (<div className={${NORMALIZED_NAME_LOW}Class} style={style || undefined}></div>)
}

${NORMALIZED_NAME}.defaultProps = {
  style: '',
  className: '',
  onClick: () => { },
};

export default ${NORMALIZED_NAME};
`
fs.writeFileSync(path.join(DIRNAME, `${NORMALIZED_NAME}.tsx`), reactComponentContent);


// index.ts
const INDEXTSName = NORMALIZED_NAME.slice(0,1).toUpperCase() + NORMALIZED_NAME.slice(1)
const indexTsContent = `
import ${INDEXTSName} from './${NAME}';

export type { ${NORMALIZED_NAME}Props } from './${NAME}';
export default ${INDEXTSName};
`
fs.writeFileSync(path.join(DIRNAME, 'index.ts'), indexTsContent);


// style.scss
const styleContent = `
.fx_${NAME} {

} 
`
fs.writeFileSync(path.join(DIRNAME, 'style.scss'), styleContent);



console.log(`创建组件${NORMALIZED_NAME}成功，模版已生成`)

