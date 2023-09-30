import { useEffect, useState } from 'react';
import './style.scss';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom/client';

export type MessageProps = {
  open: boolean;
  content?: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading';
};

const el = document.createElement('div')
el.className = 'fx_message-container'
if (!document.querySelector('.fx_message-container')) {
  document.body.appendChild(el)
}

function MessageEle(props: MessageProps): JSX.Element {
  const { open, content, duration, type } = props;
  const [showMessage, setShowMessage] = useState(false);

  const spaceClass = classNames({
    'fx_message_item': true,
    [`fx_message_item_${type}`]: type,
  });

  const defaultIcon = classNames({
    'fx-icon-prompt-filling': type === 'info',
    'fx-icon-success-filling': type === 'success',
    'fx-icon-delete-filling': type === 'error',
    'fx-icon-warning-filling': type === 'warning',
  })

  useEffect(() => {
    setShowMessage(open);
    setTimeout(() => {
      setShowMessage(false)
      setTimeout(() => {
        const container = document.querySelector('.fx_message-container');
        container?.removeChild(document.querySelector('.fx_message') as Node);
      }, 500)
    }, duration ? duration * 1000 : 3000)
  }, [open])

  return (
    <div>
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <div className="fx_message_postion">
          <div className={spaceClass}>
            {
              type === 'loading' ? <i className="fx-icon-loading1 fx_publicRotateEle" /> : <i className={defaultIcon} />
            }
            <span>{content}</span>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

MessageEle.defaultProps = {
  content: '',
  duration: 3,
  type: 'info',
};

const Message = {
  Ele: null,
  info: (content: string, duration?: number) => {
    const Ele = document.createElement('div');
    Ele.className = 'fx_message';
    // 渲染DOM
    // vue中类似的操作：
    // const Vm = Vue.extend(Comp)   子类构造器
    // const el = new Vm({props}).$mount()  实例化，渲染成dom
    // (parent as HTMLElement).appenChild(el)  完成！
    ReactDOM.createRoot(Ele as HTMLElement).render(
      <MessageEle open content={content} duration={duration} type="info" />,
    );
    // 置入到指定节点下
    const container = document.querySelector('.fx_message-container');
    if (container) {
      container.appendChild(Ele);
    }
  },
  success: (content: string, duration?: number) => {
    const Ele = document.createElement('div');
    Ele.className = 'fx_message';
    // 渲染DOM
    ReactDOM.createRoot(Ele as HTMLElement).render(
      <MessageEle open content={content} duration={duration} type="success" />,
    );
    // 置入到指定节点下
    const container = document.querySelector('.fx_message-container');
    if (container) {
      container.appendChild(Ele);
    }
  }
}
export default Message

