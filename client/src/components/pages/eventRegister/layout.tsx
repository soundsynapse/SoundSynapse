import { useRef } from "react";
import { Input } from "../../parts/input";
import { Button } from "../../parts/button";
import styled from "styled-components";

type EventRegisterProps = {
  onClickRegisterButton: (name: string) => void;
  onClickBackButton: () => void;
};

export const EventRegisterLayout = ({
  onClickBackButton,
  onClickRegisterButton,
}: EventRegisterProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Wrapper>
      <Input type="event" ref={ref} />
      <ButtonWrapper>
        <Button
          text="登録"
          color="pink"
          onClick={() =>
            ref.current?.value
              ? console.log("確認アラート")
              : console.log("エラー")
          }
        />
        <Button text="戻る" color="blue" onClick={onClickBackButton} />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ButtonWrapper = styled.div`
  display: flex;
`;
