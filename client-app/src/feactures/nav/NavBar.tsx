import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RootstoreContext } from "../../app/store/rootStore";

const NavBar = () => {
  const rootStore = useContext(RootstoreContext);
  const {user, logOut} = rootStore.userStore;
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />

        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
        {user && 
                <Menu.Item position='right'>
                  <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                  <Dropdown pointing='top left' text={user.displayName}>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                      <Dropdown.Item onClick={logOut}  text='Logout' icon='power' />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>}
      </Container>
    </Menu>
  );
};

export default NavBar;
