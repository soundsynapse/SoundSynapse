import styled from "styled-components";
import { Button } from "../../parts/button";

type StartLayoutProps = {
  onClickStartButton: () => void;
};

export const StartLayout = ({ onClickStartButton }: StartLayoutProps) => {
  return (
    <Wrapper>
      <Button color="blue" text="はじめる" onClick={onClickStartButton} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
