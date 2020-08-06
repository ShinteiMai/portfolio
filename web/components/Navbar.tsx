import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import Hamburger from "./Hamburger";

type Props = {};

type NavProps = {
  isHidden: boolean;
};

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

const NavbarComponent = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 4.5rem;

  @media only screen and (max-width: 700px) {
    padding: 1rem 2rem;
  }
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  align-items: end;
  margin-right: 3rem;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;

const NavItem = styled.li`
  &:not(:last-child) {
    margin-right: 4rem;

    @media only screen and (max-width: 700px) {
      margin-right: 0;
    }
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: end;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 45px;
  height: 45px;
`;

const Navbar: React.FC<Props> = () => {
  const [isNavHidden, setIsNavHidden] = useState(false);

  const [scrollDirection, setScrollDirection] = useState("");

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

      // set previous scroll
      setPreviousScroll(nextScrollRef.current);
    };
  }, []);

  const detectDirection = (lastScrollTop: number, nextScrollTop: number) => {
    if (lastScrollTop < nextScrollTop && lastScrollTop > 80) {
      setScrollDirection("down");
      scrollDirectionRef.current = "down";
      return;
    }
    setScrollDirection("up");
    scrollDirectionRef.current = "up";
  };

  return (
    <Nav isHidden={scrollDirection === "down"}>
      <NavbarComponent>
        <Logo>
          <LogoImage src="/static/logo.png" />
        </Logo>
        <Hamburger
          maxWidth={700}
          clickHandler={() => {
            setIsNavHidden(!isNavHidden);
          }}
        />
        {isNavHidden ? null : (
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
        )}
      </NavbarComponent>
    </Nav>
  );
};

export default Navbar;
