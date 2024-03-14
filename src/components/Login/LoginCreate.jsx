import React from "react";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { UserContext } from "../../UserContext";
import Error from "../../Helper/Error";

const LoginCreate = () => {
  const username = useForm();
  const password = useForm();
  const email = useForm("email");

  const { userCreate, loading, error } = React.useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    if (username.validate() && password.validate() && email.validate()) {
      userCreate(data);
    }
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
