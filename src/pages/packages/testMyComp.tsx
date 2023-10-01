
/*
  @name:"TestMyComp 测试组件"
  @group:"通用"
*/
import React from 'react';
import Title from '../../components/title';
import InstanceView from '../../layout/instanceView';
import Demo1 from '../../demo/testMyComp/demo1';


export default function ButtonPage() {
  return (
    <>
      <Title title="TestMyComp" notes="测试组件" desc="组件描述..." />
      <InstanceView
        subtitle="基本使用"
        subnotes=""
        demo={<Demo1 />}
        subdesc="TestMyComp 测试组件的基本使用."
        path="button/demo1"
      />
    </>
  );
}
