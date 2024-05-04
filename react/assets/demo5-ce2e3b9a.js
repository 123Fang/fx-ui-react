const e=`import React from 'react';
import { Space, Input } from '../../../packages';

export default function Demo() {
  return (
    <Space>
      <Input placeholder="基本输入框" status="error" />
      <Input placeholder="可清空的输入框" value="测试内容" clearable status="warning" />
      <Input prefix="fx-icon-search" placeholder="前置图标" status="error" />
      <Input suffix="fx-icon-search" placeholder="后置图标" status="warning" />
    </Space>

  )
}
`;export{e as default};
