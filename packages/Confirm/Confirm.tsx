
import React, { CSSProperties } from 'react';
import './style.scss';
import classNames from 'classnames';

export type ConfirmProps = {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>,
};

function Confirm(props: ConfirmProps): JSX.Element {
  const { style, className, children, onClick } = props;


  const confirmClass = classNames({
    'fx_confirm': true,
    [className || '']: !!className
  });
  
  return (<div className={confirmClass} style={style || undefined}></div>)
}

Confirm.defaultProps = {
  style: '',
  className: '',
  onClick: () => { },
};

export default Confirm;
