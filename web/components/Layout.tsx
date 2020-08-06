import React, { ReactNode, useState, useEffect, useRef } from "react";
import Head from "next/head";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  title?: string;
};

type NavProps = {
  isHidden: boolean;
};

const Container = styled.div``;

const Nav = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
  background: #173248;
  transform: ${({ isHidden }: NavProps) =>
    isHidden ? "translateY(-70px)" : "translateY(0)"};
  transition: all 0.4s;
  box-shadow: ${({ isHidden }: NavProps) =>
    isHidden ? "none" : "0 1rem 3rem rgba(0, 0, 0, 0.3)"};
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 4.5rem;
`;
const NavItems = styled.ul`
  list-style: none;
  display: flex;
  align-items: end;
  margin-right: 3rem;
`;

const NavItem = styled.li`
  &:not(:last-child) {
    margin-right: 4rem;
  }
`;
const NavLink = styled.a`
  text-decoration: none;
  opacity: 0.8;
`;
const Logo = styled.div`
  display: flex;
  align-items: end;
`;
const LogoImage = styled.img`
  width: 45px;
  height: 45px;
`;

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [scrollDirection, setScrollDirection] = useState("");

  // default -> show navbar
  // if scroll down -> hide navbar
  // if scroll up -> show navbar
  const [previousScroll, setPreviousScroll] = useState(0);
  const [nextScroll, setNextScroll] = useState(0);

  const scrollDirectionRef = useRef(scrollDirection);
  const previousScrollRef = useRef(previousScroll);
  const nextScrollRef = useRef(nextScroll);
  scrollDirectionRef.current = "";
  previousScrollRef.current = previousScroll;
  nextScrollRef.current = nextScroll;

  useEffect(() => {
    window.onscroll = () => {
      // set next scroll
      setNextScroll(window.scrollY);
      nextScrollRef.current = window.scrollY;

      // logic
      detectDirection(previousScrollRef.current, nextScrollRef.current);

      if (scrollDirectionRef.current === "down") {
        console.log("im going down");
        // hide navbar
      } else if (
        scrollDirectionRef.current === "up" ||
        scrollDirectionRef.current === ""
      ) {
        console.log("im going up");
        // show navbar
      }

      // set previous scroll
      setPreviousScroll(nextScrollRef.current);
    };
  }, []);

  const detectDirection = (lastScrollTop: number, nextScrollTop: number) => {
    if (lastScrollTop < nextScrollTop) {
      setScrollDirection("down");
      scrollDirectionRef.current = "down";
      return;
    }
    setScrollDirection("up");
    scrollDirectionRef.current = "up";
  };

  const navComponent = (
    <Nav isHidden={scrollDirection === "down"}>
      <Navbar>
        <Logo>
          <LogoImage src="/static/logo.png" />
        </Logo>
        <NavItems>
          <NavItem>
            <NavLink>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Projects</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Contact</NavLink>
          </NavItem>
        </NavItems>
      </Navbar>
    </Nav>
  );

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/static/logo.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>{navComponent}</header>
      <main>{children}</main>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </Container>
  );
};

export default Layout;
