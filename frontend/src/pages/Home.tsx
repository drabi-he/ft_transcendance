import React from "react";

import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="intro">
        <h1>pong</h1>
        <p>
          Pong is a table-tennis–themed twitch arcade sports video game
          featuring simple two-dimensional graphics, manufactured by Atari and
          originally released in 1972. It was one of the earliest arcade video
          games; it was created by Allan Alcorn as a training exercise assigned
          to him by Atari co-founder Nolan Bushnell, but Bushnell and Atari
          co-founder Ted Dabney were surprised by the quality of Alcorn's work
          and decided to manufacture the game. Bushnell based the game's concept
          on an electronic ping-pong game included in the Magnavox Odyssey.
        </p>
      </div>
      <div className="image">
        <img src="/assets/pong.jpeg" alt="first pong game" />
      </div>
    </div>
  );
};

export default Home;
