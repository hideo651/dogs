/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Feed from "../../Assets/feed.svg?react";
import Estatistica from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import style from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(null);
  const { userLogout } = React.useContext(UserContext);

  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  return (
    <nav className={style.nav}>
      <NavLink to="/conta" end>
        <Feed /> {mobile && "Minhas Fotos"}
      </NavLink>
      <NavLink to="/conta/estatistica">
        <Estatistica /> {mobile && "Estatisticas"}
      </NavLink>
      <NavLink to="/conta/postar">
        <AdicionarFoto /> {mobile && "Adicionar fotos"}
      </NavLink>
      <button onClick={handleLogout}>
        <Sair /> {mobile && "Sair"}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
