import React from "react";

import { Navbar, Main } from "./index";

const Home = () => {
  return (
    <div className="grid grid-cols-12 text-textColor2 w-screen h-screen">
      <div className="col-start-1 col-end-3 bg-seconday ">
        <Navbar />
      </div>

      <div className="col-start-3 col-end-13 bg-seconday2  ">
        <Main />
      </div>
    </div>
  );
};

export default Home;
