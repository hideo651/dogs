/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import style from "./Button.module.css";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={style.button}>
      {children}
    </button>
  );
};

export default Button;
