import { Data } from "../../parts/searchResult";
import loadingIcon from "../../../image/loading.gif";
import styled from "styled-components";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MusicCard } from "../../parts/musicCard";
import { Button } from "../../parts/button";

type ResultLayoutProps = {
  name: string;
  likeMusic: Data[];
  isLoading: boolean;
  onClickBackButton: () => void;
};

export const ResultLayout = ({
  name,
  likeMusic,
  isLoading,
  onClickBackButton,
}: ResultLayoutProps) => {
  return (
    <>
      {isLoading ? (
        <ImageWrapper>
          <StyledImage src={loadingIcon} alt="ローディングアイコン" />
        </ImageWrapper>
      ) : (
        <>
          <ImageWrapper>
            <HiOutlineUserCircle color="white" size={"250px"} />
          </ImageWrapper>
          <Text>
            {name}さんと
            <br />
            マッチングしました♪
          </Text>
          <MusicText className="music-text">{name}さんの好きな曲</MusicText>
          <MusicWrapper>
            {likeMusic.map((item, index) => (
              <MusicCard id={item.id} key={index} />
            ))}
          </MusicWrapper>
          <Text>{name}さんと会話を始めましょう♪</Text>
          <ButtonWrapper>
            <a href="https://twitter.com/geek_pjt">
              <Button
                text={`${name}さんをフォローする`}
                color="pink"
                onClick={() => console.log("")}
              />
            </a>
            <Button
              text={"もう一度やり直す"}
              color="blue"
              onClick={onClickBackButton}
            />
          </ButtonWrapper>
        </>
      )}
    </>
  );
};

const StyledImage = styled.img`
  scale: calc(0.5);
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -100px;
`;
const Text = styled.h2`
  margin: 0;
  font-size: 36px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;
const MusicText = styled.p`
  margin: 30px 0;
  font-size: 24px;
  color: white;
  font-weight: 700;
  text-align: center;
`;
const MusicWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
`;
const ButtonWrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 30px;
`;
