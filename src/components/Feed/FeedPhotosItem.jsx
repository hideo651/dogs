/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import style from "./FeedPhotosItem.module.css";
const FeedPhotosItem = ({ photo }) => {
  return (
    <li className={style.photo}>
      <img src={photo.src} alt={photo.title} />
      <span className={style.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
