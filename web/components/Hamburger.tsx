import React from "react";
import styled from "styled-components";

interface Props {
  clickHandler(): void;
  maxWidth: number;
}

interface HamburgerProps {
  maxWidth: number;
}

const Button = styled.label`
  display: none;
  @media only screen and (max-width: ${({ maxWidth }: HamburgerProps) =>
      maxWidth}px) {
    background-color: black;
    height: 7rem;
    width: 7rem;
    display: inline-block;
    position: fixed;
    top: 6rem;
    right: 6rem;
    border-radius: 50%;
    z-index: 2000;
    text-align: center;
    cursor: pointer;
  }
`;

const Ham = styled.span`
 position: relative;
 margin-top: 3.5rem;

 &::before {
   position: absolute;
   top: -1rem;
 }

 &::after {
   position: absolute;
   top: 1rem;
 }

  &,
  &::before,
  &::after {
    display: inline-block;
    width: 3rem;
    height: 2px;
    background-color: #fff;
    content: '';
  }

  &::before,
  &::after {
    content: '',
    position: absolute;
    left: 0;
    transition: all 0.2s;
  }
`;

const Hamburger: React.FC<Props> = (props) => {
  return (
    <Button onClick={props.clickHandler} maxWidth={props.maxWidth}>
      <Ham />
    </Button>
  );
};

export default Hamburger;
