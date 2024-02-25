import styled from "styled-components";
import { Button } from "../../parts/button";
import humanIcon from "../../../image/humanIcon.png";
import { Modal } from "../../parts/modal";
import { Data } from "../../parts/searchResult";

type StartLayoutProps = {
  user: Data | null;
  onClickAuthButton: () => void;
  onClickNextButton: (user: Data) => void;
  onClickCancelButton: () => void;
};

export const StartLayout = ({
  user,
  onClickAuthButton,
  onClickNextButton,
  onClickCancelButton,
}: StartLayoutProps) => {
  return (
    <Wrapper>
      <Icon src={humanIcon} alt="イヤホンをした人のイラスト" />
      <Button color="blue" text="Xでログイン" onClick={onClickAuthButton} />
      {user && (
        <Modal
          text={`${user.name}でログインします、よろしいでしょうか`}
          nextButtonText="ログインする"
          onClickNextButton={() => onClickNextButton(user)}
          onClickBackButton={onClickCancelButton}
        />
      )}
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
