import React, { CSSProperties } from 'react';
import './style.scss';
import classNames from 'classnames';

export type inputProps = {
  style?: CSSProperties;
  className?: string;
  clearable?: boolean;
  clearableFn?: () => void;
  focus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  blur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string | number;
  type?: string;
  status?: 'error' | 'warning'
};
function Input(props: inputProps): JSX.Element {
  const { style, className, clearable, clearableFn, focus, blur, onChange, placeholder, value, type, status } = props;
  const [inputValue, setInputValue] = React.useState(value || '');
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
  
  return (
    <span className={innerClass} style={style || inputStyle}>
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
        clearable && inputValue !== '' && type !== 'password' ? (
          <i className="fx-icon-error fx_input_suffix fx_input_clearable" onClick={handlerClearClick} />
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
};
export default React.memo(Input);
