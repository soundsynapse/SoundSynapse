import { ReactNode } from "react";
import styled from "styled-components";

type FrameProps = {
  children: ReactNode;
  iconURL?: string;
};

export const Frame = ({ children, iconURL }: FrameProps) => {
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TitleText className="title-text">
          お気に入りの音楽で
          <br />
          新しい出会いを
        </TitleText>
        {iconURL && <StyledIcon src={iconURL} />}
      </div>
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
  @media screen and (max-width: 900px) {
    font-size: 32px;
  }
  @media screen and (max-width: 480px) {
    width: 160px;
  }
`;
const StyledIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;
