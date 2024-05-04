const o=`import React from 'react';
import { Button, Notification } from '../../../packages';

function Demo() {
  console.log(Notification.useNotification)
  const [api, contextHolder] = Notification.useNotification();
  const openNotification = () => {
    api.info({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      onClose: () => {
        console.log('Notification Closed!');
      },
    });
  };
  return (
    <>
      <div>{contextHolder}</div>
      <Button type="primary" onClick={openNotification}>
        Open the notification box
      </Button>
    </>
  );
}

export default Demo;
`;export{o as default};
