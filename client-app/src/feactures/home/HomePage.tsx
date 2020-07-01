import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container styles={{ marginTop: "7rem" }}>
      <h1>Home page </h1>
      <h4>
        Go to <Link to="/activities">activities</Link>{" "}
      </h4>
    </Container>
  );
};

export default HomePage;
