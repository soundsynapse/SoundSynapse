import { useRef, useState } from "react";
import { Input } from "../../parts/input";
import { Button } from "../../parts/button";
import styled from "styled-components";
import { Modal } from "../../parts/modal";

type EventRegisterProps = {
  onClickRegisterButton: (name: string) => void;
  onClickBackButton: () => void;
};

export const EventRegisterLayout = ({
  onClickBackButton,
  onClickRegisterButton,
}: EventRegisterProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState<"confirm" | "error" | null>(null);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Input type="event" ref={ref} />
      </div>
      <ButtonWrapper>
        <Button text="戻る" color="blue" onClick={onClickBackButton} />
        <Button
          text="登録"
          color="pink"
          onClick={() =>
            ref.current?.value ? setModal("confirm") : setModal("error")
          }
        />
      </ButtonWrapper>
      {modal && (
        <Modal
          text={
            modal === "confirm"
              ? `${ref.current?.value || ""}を登録します、よろしいでしょうか`
              : "イベントを入力してください"
          }
          onClickBackButton={() => setModal(null)}
          onClickNextButton={
            modal === "confirm"
              ? () => onClickRegisterButton(ref.current?.value || "")
              : undefined
          }
        />
      )}
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  @media screen and (max-width: 750px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 10px;
  }
`;
