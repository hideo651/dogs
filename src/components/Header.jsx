/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import Dog from "../Assets/dogs.svg?react";
import React from "react";
import { UserContext } from "../UserContext";

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
    userLogout();
  };

  return (
    <header className={style.header}>
      <nav className={`${style.nav} container`}>
        <Link className={style.logo} to="/" aria-label="Dogs - Home">
          <Dog />
        </Link>
        {data ? (
          <>
            {" "}
            <div>
              <Link className={style.login} to="/conta">
                {data.nome}
              </Link>
              <button onClick={handleClick}>Sair</button>
            </div>
          </>
        ) : (
          <Link className={style.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
