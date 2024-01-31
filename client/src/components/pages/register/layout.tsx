import { useRef, useState } from "react";
import { MusicData, SearchResult } from "../../parts/searchResult";
import { Input } from "../../parts/input";
import { SearchButton } from "../../parts/searchButton";
import { Button } from "../../parts/button";
import { MusicCard } from "../../parts/musicCard";
import styled from "styled-components";

type RegisterLayoutProps = {
  onClickSearchButton: (value: string) => void;
  searchResult: MusicData[];
  onClickNextButton: (userName: string, selectedMusic: MusicData[]) => void;
};

export const RegisterLayout = ({
  onClickNextButton,
  onClickSearchButton,
  searchResult,
}: RegisterLayoutProps) => {
  const [page, setPage] = useState<"user" | "music">("user");
  const [userName, setUserName] = useState("");
  const [selectedMusic, setSelectedMusic] = useState<MusicData[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <InputWrapper isMargin={page === "music"}>
        <Input type={page} ref={ref} />
        {page === "music" && (
          <SearchButton
            onClick={() => {
              if (selectedMusic.length === 3) {
                alert("選択できる楽曲は3曲までです");
              } else {
                ref.current?.value
                  ? onClickSearchButton(ref.current.value)
                  : alert("楽曲を入力してください");
              }
            }}
          />
        )}
      </InputWrapper>
      <div>
        <SearchResult
          searchResults={searchResult}
          onClick={(selected) =>
            selectedMusic.length === 3
              ? alert("選択できる楽曲は3曲までです")
              : setSelectedMusic((prevState) => [...prevState, selected])
          }
        />
      </div>
      <CardWrapper>
        {selectedMusic.map((item, index) => (
          <MusicCard id={item.id} key={index} />
        ))}
      </CardWrapper>
      <ButtonWrapper>
        <Button
          text={"次へ"}
          color={"pink"}
          onClick={() => {
            if (page === "user") {
              if (ref.current?.value) {
                setUserName(ref.current.value);
                ref.current.value = "";
                setPage("music");
              } else {
                alert("ユーザー名を入力してください");
              }
            } else {
              selectedMusic.length === 0
                ? alert("楽曲を登録してください")
                : onClickNextButton(userName, selectedMusic);
            }
          }}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  display: grid;
  justify-items: center;
  gap: 30px;
`;
const InputWrapper = styled.div<{ isMargin: boolean }>`
  display: flex;
  gap: 20px;
  ${({ isMargin }) => isMargin && "margin-left: 70px"}
`;
const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const ButtonWrapper = styled.div`
  margin-left: auto;
`;
