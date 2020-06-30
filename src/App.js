import React from 'react';
import Header from "./components/Header";
import Content from "./components/Content";
import "./Styles/main.scss";

function App() {
  return (
    <div className="root">
      <Header />
      <Content />
    </div>
  );
}

export default App;
