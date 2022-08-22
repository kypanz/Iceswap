import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link'

// Moralis login button here
import LoginMoralisButton from './LoginMoralisButton';

export default function Menu() {
  return (
    <Navbar  expand="lg" style={{background:'#1F1933'}}>
      <Container>
        <Navbar.Brand href="#home" style={{marginLeft:'80px',background:'orange'}}></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link href="/">
          <img style={{
            cursor:'pointer',
            position: 'absolute', 
            top: 20, left: 50, 
            right: 0, 
            bottom: 0, 
            justifyContent: 'center', 
            alignItems: 'center'
            }} src={'/iceSwap.png'} alt="logo" />
          </Link>           
            <NavDropdown title={
                <span className="text-light">Token 🔒</span>
            } id="basic-nav-dropdown">
              
              <Link href="token">
                <NavDropdown.Item href="/token">Token 🔒</NavDropdown.Item>
              </Link>
              
              <Link href="list-new-token">
              <NavDropdown.Item href="/list-new-token">
                List new Token 🔒
              </NavDropdown.Item>
              </Link>

              <Link href="whitelisted-page">
              <NavDropdown.Item href="whitelisted-page">Whitelisted Tokens</NavDropdown.Item>
              </Link>

              <NavDropdown.Divider />
              
              <Link href="earn">
                <NavDropdown.Item href="#action/3.4">
                  Earn 🔒
                </NavDropdown.Item>
              </Link>
              
              <Link href="report">
              <NavDropdown.Item href="#action/3.4">
                Report 🔒
              </NavDropdown.Item>
              </Link>

            </NavDropdown>
          
            <NavDropdown title={
                <span className="text-light">Exchange</span>
            } id="basic-nav-dropdown">

              <Link href="exchange">
              <NavDropdown.Item href="#exchange">Exchange</NavDropdown.Item>
              </Link>

              <Link href="liquidity">
              <NavDropdown.Item href="#liquidity">
                Liquidity 🔒
              </NavDropdown.Item>
              </Link>
            
            </NavDropdown>

            <NavDropdown title={
                <span className="text-light">Bridge</span>
            } id="basic-nav-dropdown">

              <Link href="bridge-page">
              <NavDropdown.Item href="#bridge">Bridge</NavDropdown.Item>
              </Link>

              <Link href="policies">
              <NavDropdown.Item href="#policies">
                Policies 🔒
              </NavDropdown.Item>
              </Link>
            
            </NavDropdown>

            <NavDropdown title={
                <span className="text-light">Withdraw</span>
            } id="basic-nav-dropdown">
              
              <Link href="revolut-page">
              <NavDropdown.Item href="#withdraw">Withdraw</NavDropdown.Item>
              </Link>

              <Link href="history">
              <NavDropdown.Item href="#history">
                History 🔒
              </NavDropdown.Item>
              </Link>

            </NavDropdown>

            <NavDropdown title={
                <span className="text-light">Buy Crypto</span>
            } id="basic-nav-dropdown">
              <Link href="buy-crypto">
              <NavDropdown.Item href="#withdraw"> Easy Buy </NavDropdown.Item>
              </Link>
            </NavDropdown>

          </Nav>
          <LoginMoralisButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
