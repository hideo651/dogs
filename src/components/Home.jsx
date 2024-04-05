import Feed from "./Feed/Feed";
import Head from "./Helper/Head";

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Fotos" desciption="Home do site dogs, com feed de fotos" />
      <Feed />
    </section>
  );
};

export default Home;
