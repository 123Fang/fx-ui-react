
/*
  @name:"Confirm 消息确认"
  @group:"交互"
*/
import React from 'react';
import Title from '../../components/title';
import InstanceView from '../../layout/instanceView';
import Demo1 from '../../demo/confirm/demo1';


export default function ButtonPage() {
  return (
    <>
      <Title title="Confirm" notes="消息确认" desc="组件描述..." />
      <InstanceView
        subtitle="基本使用"
        subnotes=""
        demo={<Demo1 />}
        subdesc="Confirm 消息确认的基本使用."
        path="confirm/demo1"
      />
    </>
  );
}
