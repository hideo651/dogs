/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import Dog from "../Assets/dogs.svg?react";

const Header = () => {
  return (
    <header className={style.header}>
      <nav className={`${style.nav} container`}>
        <Link className={style.logo} to="/" aria-label="Dogs - Home">
          <Dog />
        </Link>
        <Link className={style.login} to="/login">
          Login / Criar
        </Link>
      </nav>
    </header>
  );
};

export default Header;
