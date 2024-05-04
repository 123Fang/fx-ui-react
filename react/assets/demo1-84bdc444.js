const t=`import React from "react";
import { Space, Button, Input } from '../../../packages';

export default function Demo() {
  return (
    <Space>
      <Button icon="fx-icon-edit">编辑</Button>
      <Button type="primary" icon="fx-icon-shangchuan" round />
      <Input placeholder="输入框" style={{ width: '264px' }} />
    </Space>
  )
}
`;export{t as default};
