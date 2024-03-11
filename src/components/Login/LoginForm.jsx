/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../../Helper/Error";
import style from "./LoginForm.module.css";
import styleBrn from "../Forms/Button.module.css";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { username: username.value, password: password.value };

    if (username.validate() && password.validate()) {
      userLogin(data);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {<Error error={error} />}
      </form>
      <Link className={style.perdeu} to="/login/perdeu">
        Perdeu a senha ?
      </Link>
      <div className={style.cadastro}>
        <h2 className={style.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta ? Cadastre-se no site</p>
        <Link className={styleBrn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
