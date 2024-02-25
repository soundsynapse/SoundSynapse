import styled from "styled-components";
import { Button } from "../../parts/button";
import humanIcon from "../../../image/humanIcon.png";

export const StartLayout = () => {
  return (
    <Wrapper>
      <Icon src={humanIcon} alt="イヤホンをした人のイラスト" />
      <a href="https://soundsynapse-316201ce96e2.herokuapp.com/auth/twitter_login">
        <Button color="blue" text="Xでログイン" onClick={() => console.log(" ")} />
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: -100px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
`;

const ButtonWrapper = styled.div`
  @media screen and (max-width: 950px) {
    margin-top: 200px;
  }
`;
const Icon = styled.img`
  scale: 0.8;
  margin-left: auto;
  margin-right: 10%;
  margin-top: -250px;
  @media screen and (max-width: 950px) {
    display: none;
  }
`;
