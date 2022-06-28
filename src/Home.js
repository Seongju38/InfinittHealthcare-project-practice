import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/map">
        <h1>카카오맵</h1>
      </Link>
    </div>
  );
}

export default Home;
