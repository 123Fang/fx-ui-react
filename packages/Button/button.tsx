import './style.scss';


function Button(props: ButtonProps): JSX.Element {
  const { title } = props;
  return (
    <div className='color'>
      <p>{title}</p>
    </div>
  );
}

export default Button;
