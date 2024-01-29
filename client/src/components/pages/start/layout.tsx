import styled from "styled-components";
import { Button } from "../../parts/button";
import humanIcon from "../../../../public/humanIcon.png";

type StartLayoutProps = {
  onClickStartButton: () => void;
};

export const StartLayout = ({ onClickStartButton }: StartLayoutProps) => {
  return (
    <Wrapper>
      <Icon src={humanIcon} alt="イヤホンをした人のイラスト" />
      <Button color="blue" text="はじめる" onClick={onClickStartButton} />
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
`;
