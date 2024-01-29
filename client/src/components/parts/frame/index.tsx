import { ReactNode } from "react";
import styled from "styled-components";

type FrameProps = {
  children: ReactNode;
};

export const Frame = ({ children }: FrameProps) => {
  return (
    <Wrapper>
      <TitleText className="title-text">
        お気に入りの音楽で
        <br />
        新しい出会いを
      </TitleText>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 16px;
  padding: 48px 32px;
  border-radius: 12px;
  background-image: linear-gradient(to right, #8002db, #ff13d3);
`;
const TitleText = styled.div`
  font-weight: 700;
  font-size: 46px;
  margin: 0;
  color: white;
  margin-bottom: 100px;
`;
