/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import style from "./FeedModal.module.css";
import { UserContext } from "../../UserContext";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { photoData, setPhotoData, error, loadingModal, photoGet } =
    React.useContext(UserContext);

  console.log(loadingModal);

  React.useEffect(() => {
    photoGet(photo.id);
  }, [photo]);

  function handleClick(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(false);
      setPhotoData(null);
    }
  }

  return (
    <div className={style.modal} onClick={handleClick}>
      {error && <Error error={error} />}
      {loadingModal && <Loading />}
      {photoData && <PhotoContent data={photoData} />}
    </div>
  );
};

export default FeedModal;
