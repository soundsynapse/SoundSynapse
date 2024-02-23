import styled from "styled-components";
import { Button } from "../../parts/button";
import { Modal } from "../../parts/modal";
import { Data } from "../../parts/searchResult";

type LoginLayoutProps = {
  user: Data | null;
  onClickBackButton: () => void;
  onClickAuthButton: () => void;
  onClickNextButton: (user: Data) => void;
  onClickCancelButton: () => void;
};

export const LoginLayout = ({
  user,
  onClickAuthButton,
  onClickBackButton,
  onClickNextButton,
  onClickCancelButton,
}: LoginLayoutProps) => {
  return (
    <>
      <ButtonWrapper>
        <Button text="Xでログイン" color="pink" onClick={onClickAuthButton} />
        <Button text="戻る" color="blue" onClick={onClickBackButton} />
      </ButtonWrapper>
      {user && (
        <Modal
          text={`${user.name}でログインします、よろしいでしょうか`}
          nextButtonText="ログインする"
          onClickNextButton={() => onClickNextButton(user)}
          onClickBackButton={onClickCancelButton}
        />
      )}
    </>
  );
};

const ButtonWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 50px;
`;
