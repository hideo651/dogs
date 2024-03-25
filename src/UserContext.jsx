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
  const [photos, setPhotos] = React.useState(null);
  const [photoData, setPhotoData] = React.useState(null);
  const [loadingModal, setLoadingModal] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);

    localStorage.removeItem("token");
  }, []);

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
      localStorage.setItem("username", response.data.user_nicename);
      console.log(response.data.user_nicename);
      const token = response.data.token;

      await getUser(token);
      // navigate("/conta");
    } catch (err) {
      setError("Usuário inválido");
      setLoading(false);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function userCreate(data) {
    try {
      // setLoading(true);
      setLoading(true);
      const response = await api.post(`/api/user`, data);

      userLogin({ username: data.username, password: data.password });
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function postPhoto(data) {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      api.defaults.headers.authorization = `Bearer ${token}`;
      const response = await api.post(`/api/photo`, data);
      console.log(response);
      navigate("/conta");
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function getPhotos(page, total, user) {
    try {
      setLoading(true);
      api.defaults.headers = {
        "Cache-Control": "no-cache",
      };
      const response = await api.get(
        `/api/photo/?_page=${page}&_total=${total}&_user=${user}`
      );
      setPhotos(response.data);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function photoGet(id) {
    try {
      setLoadingModal(true);
      const response = await api.get(`/api/photo/${id}`);
      setPhotoData(response.data);
    } catch (err) {
      setError(err.response.data.message);
      setLoadingModal(false);
      console.log(err.response.data.message);
    } finally {
      setLoadingModal(false);
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
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        getUser,
        data,
        userLogout,
        error,
        loading,
        login,
        userCreate,
        postPhoto,
        getPhotos,
        photos,
        photoGet,
        photoData,
        setPhotoData,
        loadingModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
