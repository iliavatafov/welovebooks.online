import { useEffect, useState } from "react";

import { imagesData } from "../Home/imagesData";

import "../Home/Slider.css";

export const Slider = () => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentState === 4) {
        setCurrentState(0);
      } else {
        setCurrentState(currentState + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentState]);

  const bgImageStyle = {
    backgroundImage: `url(${imagesData[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    maxHeight: "800px",
  };

  const goToNext = (currentState) => {
    setCurrentState(currentState);
  };

  return (
    <div className="slider-container">
      <div className="image-background" style={bgImageStyle}>
        <div className="transperant-background"></div>
        <div className="description">
          <div>
            <h1>{imagesData[currentState].title}</h1>
            <p>{imagesData[currentState].body}</p>
          </div>
          <div className="carousel-boullt">
            {imagesData.map((imagesData, currentState) => (
              <span
                key={currentState}
                onClick={() => goToNext(currentState)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
