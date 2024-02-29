import styled from "styled-components";
import { Button } from "../../parts/button";
import humanIcon from "../../../image/humanIcon.png";

export const StartLayout = () => {
  return (
    <Wrapper>
      <Icon src={humanIcon} alt="イヤホンをした人のイラスト" />
      <div style={{ marginTop: "200px" }}>
        <Button
          color="blue"
          text="Xでログイン"
          onClick={() =>
            (window.location.href =
              "https://soundsynapse-316201ce96e2.herokuapp.com/auth/twitter_login")
          }
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: -100px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
`;

const Icon = styled.img`
  scale: 0.8;
  margin-left: auto;
  margin-right: 10%;
  margin-top: -250px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
