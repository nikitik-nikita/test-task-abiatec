import React from "react";
import "./index.css";

const ContentList = ({ content }) => {
  return (
    <>
      <div className="content__container">
        <ul className="content__wrapper">
          {content.length
            ? content.map(elem => (
              <li className="content__item" key={elem.id}>
                <div className="item__img">
                  <img src={elem.image} alt={elem.name}/>
                </div>
                <p className="item__title">{elem.name}</p>
              </li>
            ))
            : null}
        </ul>
      </div>
    </>
  );
};

export default ContentList;
