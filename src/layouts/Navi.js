import React from "react";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed = "top" size="large">
        <Container>
          <Menu.Item as={NavLink} to="/" name="home" />
          <Menu.Item name="messages" />

          <Menu.Menu position="right">
            <Dropdown item text="Language">
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item>
              <Button as={NavLink} to="/SignUp" secondary>Sign Up</Button>
            </Menu.Item>
            <Menu.Item>
              <Button as={NavLink} to="/Homepage" primary>Sign In</Button>     
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
