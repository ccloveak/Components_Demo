"use strict";

import React from "react";
import ReactDOM from "react-dom";
import logo from "./images/logos.png";
import "./search.less";

const Search = () => {
  return (
    <div className="search-text">
      Search Text 。。！！
      <img src={logo} />
    </div>
  );
};

ReactDOM.render(<Search />, document.getElementById("root"));

export default Search;
