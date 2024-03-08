/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { api } from "./Service/service";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token) {
    try {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const response = await api.get(`/api/user`);
      setData(response.data);
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function userLogin(data) {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post(`/jwt-auth/v1/token`, data);
      localStorage.setItem("token", response.data.token);
      const token = response.data.token;

      await getUser(token);
      navigate("/conta");
    } catch (error) {
      setError("Usuário inválido");
      setLoading(false);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          api.defaults.headers.authorization = `Bearer ${token}`;
          const response = await api.post("/jwt-auth/v1/token/validate");
          await getUser(token);
        } catch (error) {
          console.log(error);
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, getUser, data, userLogout, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
