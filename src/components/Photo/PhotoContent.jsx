/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import style from "./PhotoContent.module.css";
import PhotoComments from "./PhotoComments";
const PhotoContent = ({ data }) => {
  const { photo, comments } = data;
  return (
    <div className={style.photo}>
      <div className={style.img}>
        <img src={photo.src} alt={photo.title} />
      </div>
      <div className={style.details}>
        <div>
          <p className={style.author}>
            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            <span className={style.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={style.attributes}>
            <li>{photo.peso} kg</li>
            <li>
              {photo.idade === "1"
                ? `${photo.idade} ano`
                : `${photo.idade} anos`}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
