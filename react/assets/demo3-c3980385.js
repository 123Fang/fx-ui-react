const e=`import React from 'react';
import { Space, Input } from '../../../packages';

export default function Demo() {
  return (
    <Space>
      <Input
        style={{ width: '264px' }}
        prefix="fx-icon-search"
        placeholder="前置图标"
      />
      <Input
        style={{ width: '264px' }}
        suffix="fx-icon-search"
        placeholder="后置图标"
      />
    </Space>

  )
}
`;export{e as default};
