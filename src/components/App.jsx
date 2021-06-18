import React from "react";

import Header from "./Header";
import ContentList from "./ContentList";
import FetchMoreButton from "./FetchMoreButton";

import { useFetchContent } from "../hooks/useFetchContent";

import "./App.css";

const App = () => {
  const [content, fetch, fetchMore] = useFetchContent();

  return (
    <div className="App">
      <Header onSearch={fetch} />
      <h1>Simple content list</h1>
      <ContentList content={content}/>
      <FetchMoreButton fetchMore={fetchMore} text="Show more"/>
    </div>
  );
};

export default App;
