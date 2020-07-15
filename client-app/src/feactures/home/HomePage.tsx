import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootstoreContext } from "../../app/store/rootStore";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const HomePage = () => {
  const rootStore = useContext(RootstoreContext);
  const { user, isLoggedin } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedin ? (
          <Fragment>
          {user && 
            <Header as="h2" inverted content={`Welcome back ${user.displayName} !`} />}
            <Button content="Go to Activities" as={Link} to={"/activities"}/>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button onClick={()=>openModal(<LoginForm/>)} size="huge" inverted>
            Login
          </Button>
          <Button onClick={()=>openModal(<RegisterForm/>)} size="huge" inverted>
            Register
          </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
