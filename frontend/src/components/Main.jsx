import React from "react";

import { Header, Content } from "./index";

const Main = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar ">
      <Header />

      <Content />
    </div>
  );
};

export default Main;
