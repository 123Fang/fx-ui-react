import React, { CSSProperties } from 'react';
import './style.scss';
import classNames from 'classnames';

export type inputProps = {
  style?: CSSProperties;
  className?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  clearable?: boolean;
  clearableFn?: () => void;
  focus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  blur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string | number;
  type?: string;
  showPassword?: boolean;
  status?: 'error' | 'warning'
};
function Input(props: inputProps): JSX.Element {
  const { style, className, clearable, clearableFn, focus, blur, onChange, placeholder, value, type, status, prefix, suffix, showPassword} = props;
  const [inputValue, setInputValue] = React.useState(value || '');
  const [pwdIcon, setPwdIcon] = React.useState('fx-icon-hide');
  const [pwdShow, setPwdShow] = React.useState(showPassword);
  const [inputType, setInputType] = React.useState(type);
  const innerClass = classNames({
    'fx_input_inner': true,
    [`fx_input_inner_${status}`]: true,
  })
  const inputClass = classNames({
    'fx_input': true,
    [className || '']: !!className,
  });
  const inputStyle = {
    ...style,
  }
  React.useEffect(() => {
    setInputValue(value as string);
  }, [value])
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  }
  const inputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setInputValue(e.target.value);
      onChange && onChange(e);
    }
  }
  const handlerClearClick = () => {
    setInputValue('');
    clearableFn && clearableFn();
  }

  const toggleIcon = () => {
    setPwdShow(!pwdShow);
    if (pwdShow) {
      setInputType(type);
      setPwdIcon('fx-icon-hide');
    } else {
      setInputType('text');
      setPwdIcon('fx-icon-browse');
    }
  }
  React.useEffect(() => {
    if (!showPassword) {
      setInputType(type);
      setPwdIcon('fx-icon-hide');
    } else {
      setInputType('text');
      setPwdIcon('fx-icon-browse');
    }

  }, [showPassword])
  

  return (
    <span className={innerClass} style={style || inputStyle}>
       {
        prefix && prefix !== '' && (typeof prefix) === 'string' ? <i className={[prefix, 'fx_input_prefix'].join(' ')} /> : prefix && prefix !== '' && (typeof prefix) === 'object' ? <span className="fx_input_prefix" >{prefix}</span> : null
      }
      <input
        type={inputType}
        placeholder={placeholder}
        className={inputClass}
        onChange={inputChange}
        onKeyDown={inputEnter}
        value={inputValue}
        onFocus={(e) => focus && focus(e)}
        onBlur={() => blur && blur()}
      />
      {
        suffix && suffix !== '' && (typeof suffix) === 'string' && !clearable ? <i className={[suffix, 'fx_input_suffix'].join(' ')} /> : suffix && suffix !== '' && (typeof suffix) === 'object' ? <span className="fx_input_suffix" >{suffix}</span> : null
      }
      {
        clearable && inputValue !== '' && type !== 'password' ? (
          <i className="fx-icon-error fx_input_suffix fx_input_clearable" onClick={handlerClearClick} />
        ) : null
      }
       {
        type === 'password' ? (
          <i className={[pwdIcon, 'fx_input_suffix', 'fx_input_password'].join(' ')} onClick={toggleIcon} />
        ) : null
      }
    </span>
  );
}
Input.defaultProps = {
  style: '',
  className: '',
  clearable: false,
  clearableFn: () => { },
  focus: () => { },
  blur: () => { },
  onChange: () => { },
  placeholder: '',
  value: '',
  type: 'text',
  status: '',
  prefix: '',
  suffix: '',
  showPassword: false,
};
export default React.memo(Input);
