import styled from "styled-components";

type ModalProps = {
  text: string;
  onClickBackButton: () => void;
  onClickNextButton?: () => void;
};

export const Modal = ({
  text,
  onClickBackButton,
  onClickNextButton,
}: ModalProps) => {
  return (
    <BackGround>
      <Wrapper>
        <Text>{text}</Text>
        <ButtonWrapper twoButton={onClickNextButton ? true : false}>
          <StyledButton color="blue" onClick={onClickBackButton}>
            {onClickNextButton ? "キャンセル" : "戻る"}
          </StyledButton>
          {onClickNextButton && (
            <StyledButton color="pink" onClick={onClickNextButton}>
              登録する
            </StyledButton>
          )}
        </ButtonWrapper>
      </Wrapper>
    </BackGround>
  );
};

const StyledButton = styled.button<{ color: "pink" | "blue" }>`
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: none;
  background-color: ${({ color }) =>
    color === "pink" ? "#ff13d3" : "#8002db"};
  padding: 10px 20px;
  border-radius: 50px;
  min-width: 150px;
  cursor: pointer;
`;
const Wrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px 30px;
  width: 500px;
`;
const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonWrapper = styled.div<{ twoButton: boolean }>`
  display: flex;
  justify-content: ${({ twoButton }) =>
    twoButton ? "space-between" : "center"};
`;
const Text = styled.p`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;
