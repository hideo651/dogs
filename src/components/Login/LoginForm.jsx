/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { api } from "../../Service/service";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser();
    }
  }, []);

  async function getUser() {
    const token = localStorage.getItem("token");

    try {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const response = await api.get(`/api/user`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { username: username.value, password: password.value };

    if (username.validate() && password.validate()) {
      try {
        const response = await api.post(`/jwt-auth/v1/token`, data);
        localStorage.setItem("token", response.data.token);
        getUser();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
