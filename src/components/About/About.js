import "../About/About.css";

export const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="title">
          "I have never known any distress that an hour's reading did not
          relieve."
        </h1>
        <p className="subtitle">Montesquieu</p>
      </header>
      <main className="about-main">
        <article className="about-main-article">
          <h1 className="title">Why We Love Books?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem
            maiores quibusdam eius veritatis animi accusantium hic deserunt
            error, velit quod consequuntur ipsam aliquid rem repudiandae
            officiis tenetur temporibus nulla?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            illum illo minus. Iure, commodi facere.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus,
            debitis vero reiciendis cupiditate aliquid architecto sequi dolorem
            qui animi saepe labore possimus dolores ipsum aut veritatis
            voluptatibus, atque rem iste!
          </p>
        </article>
        <article className="images-flex-box">
          <div className="img-container">
            <img src="https://i.postimg.cc/1Xq4jTR4/slider-3.jpg" alt="book" />
          </div>
          <div className="img-container">
            <img
              src="https://i.postimg.cc/8PkhZRqG/chris-liu-rao-Gue01-P-I-unsplash.jpg"
              alt="book"
            />
          </div>
          <div className="img-container">
            <img
              src="https://i.postimg.cc/wj7Dp6qb/mariia-zakatiura-t7z-YZz-O-CX0-unsplash.jpg"
              alt="book"
            />
          </div>
          <div className="img-container">
            <img
              src="https://i.postimg.cc/GhMvVBCy/sincerely-media-hjiem5-Tq-I-unsplash.jpg"
              alt="book"
            />
          </div>
        </article>
        <article className="about-main-article">
          <h1 className="title">Who are we?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem
            maiores quibusdam eius veritatis animi accusantium hic deserunt
            error, velit quod consequuntur ipsam aliquid rem repudiandae
            officiis tenetur temporibus nulla? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Ducimus, debitis vero reiciendis
            cupiditate aliquid architecto sequi dolorem qui animi saepe labore
            possimus dolores ipsum aut veritatis voluptatibus, atque rem iste!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            illum illo minus. Iure, commodi facere. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Ducimus, debitis vero reiciendis
            cupiditate aliquid architecto sequi dolorem qui animi saepe labore
            possimus dolores ipsum aut veritatis voluptatibus, atque rem iste!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus,
            debitis vero reiciendis cupiditate aliquid architecto sequi dolorem
            qui animi saepe labore possimus dolores ipsum aut veritatis
            voluptatibus, atque rem iste!
          </p>
        </article>
      </main>
    </div>
  );
};
