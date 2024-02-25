import { Data } from "../../parts/searchResult";
import loadingIcon from "../../../image/loading.gif";
import styled from "styled-components";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MusicCard } from "../../parts/musicCard";
import { Button } from "../../parts/button";
import { Timeline } from "react-twitter-widgets";

type ResultLayoutProps = {
  name: string;
  image: string;
  likeMusic: Data[];
  isLoading: boolean;
  xId: string;
  onClickBackButton: () => void;
};

export const ResultLayout = ({
  name,
  image,
  likeMusic,
  isLoading,
  xId,
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
            {image === "" ? (
              <HiOutlineUserCircle color="white" size={"250px"} />
            ) : (
              <StyledIcon src={image} />
            )}
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
          <Timeline
            dataSource={{
              sourceType: "profile",
              screenName: xId, // アカウント名
            }}
            options={{
              height: "800",
            }}
          />
          <ButtonWrapper>
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
  margin-top: 20px;
  @media screen and (max-width: 950px) {
    font-size: 27px;
  }
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
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
  justify-content: center;
`;
const ButtonWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;
const StyledIcon = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
`;
