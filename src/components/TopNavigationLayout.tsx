import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, Outlet } from 'react-router-dom';
import MetaMaskBtn from "./MetaMaskBtn";

export const TopNavigationLayout = () => {
  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/" className="brand">SkyRocket</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">

            <div className="d-flex ">
              <Nav className="me-auto">

                <div className={'p-2'}>
                  <Nav.Link href="/">Home</Nav.Link>
                </div>

                <div className={'p-2'}>
                  <Nav.Link href="/AppGame">App</Nav.Link>
                </div>

                <div className={'p-2'}>
                  <MetaMaskBtn/>
                </div>

              </Nav>
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet/>
    </>
  )
};
