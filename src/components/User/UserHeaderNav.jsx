/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Feed from "../../Assets/feed.svg?react";
import Estatistica from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import style from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          className={`${style.mobileButton} ${
            mobileMenu && style.mobileButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? style.navMobile : style.nav} ${
          mobileMenu && style.navMobileActive
        }`}
      >
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
    </>
  );
};

export default UserHeaderNav;
