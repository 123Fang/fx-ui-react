import React from 'react';
import { Space, Button } from '../../../packages';

export default function Demo() {
  return (
    <Space>
      <Button icon="fx-icon-edit">编辑</Button>
      <Button type="primary" icon="fx-icon-copy">复制</Button>
      <Button icon="fx-icon-search" round>搜索</Button>
      <Button type="primary" icon="fx-icon-scanning" round>扫描</Button>
      <Button>设置<span className="fx-icon-setting" /></Button>
      <Button type="primary">添加<span className="fx-icon-add" /></Button>
      <Button icon="fx-icon-edit" />
      <Button type="primary" icon="fx-icon-copy" />
      <Button icon="fx-icon-search" round />
      <Button type="primary" icon="fx-icon-scanning" round />
    </Space>
  )
}
