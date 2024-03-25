/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import { UserContext } from "../../UserContext";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import style from "./FeedPhotos.module.css";

const FeedPhotos = ({ setModalPhoto }) => {
  const { getPhotos, error, loading, photos } = React.useContext(UserContext);

  React.useEffect(() => {
    getPhotos(1, 6, 0);
  }, []);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (photos)
    return (
      <ul className={`${style.feed} animeLeft`}>
        {photos.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
};

export default FeedPhotos;
