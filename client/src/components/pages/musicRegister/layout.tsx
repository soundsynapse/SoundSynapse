import { useRef, useState } from "react";
import { Data, SearchResult } from "../../parts/searchResult";
import { Input } from "../../parts/input";
import { SearchButton } from "../../parts/searchButton";
import { Button } from "../../parts/button";
import { MusicCard } from "../../parts/musicCard";
import styled from "styled-components";
import { Pagination } from "../../parts/pagination";
import { Modal } from "../../parts/modal";

type MusicRegisterLayoutProps = {
  onClickSearchButton: (value: string) => void;
  searchResult: Data[];
  onClickNextButton: (selectedMusic: Data[]) => void;
};

export const MusicRegisterLayout = ({
  onClickNextButton,
  onClickSearchButton,
  searchResult,
}: MusicRegisterLayoutProps) => {
  const [displayResult, setDisplayResult] = useState<Data[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<Data[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [modal, setModal] = useState<
    "input" | "music" | "nonMusic" | "confirm" | null
  >(null);
  const ref = useRef<HTMLInputElement>(null);

  const updateResult = (page: number, searchResult: Data[]) => {
    const itemsPerPage = 10;

    // ページの開始インデックス
    const startIndex = (page - 1) * itemsPerPage;

    // ページの終了インデックス
    const endIndex = Math.min(startIndex + itemsPerPage, searchResult.length);

    // 指定されたページの要素を抽出してsetDisplayResultにセット
    setDisplayResult(searchResult.slice(startIndex, endIndex));
  };

  return (
    <Wrapper>
      <Text>
        お気に入りの曲を登録しよう♪
        <br />
        アーティスト名で検索してください♪
      </Text>
      <InputWrapper>
        <Input type="music" ref={ref} />
        <SearchButton
          onClick={() => {
            if (selectedMusic.length === 3) {
              setModal("music");
            } else {
              if (ref.current?.value) {
                setDisplayResult([]);
                setActivePage(1);
                onClickSearchButton(ref.current.value);
              } else {
                setModal("input");
              }
            }
          }}
        />
      </InputWrapper>
      <div>
        <SearchResult
          searchResults={
            displayResult.length === 0
              ? searchResult.slice(0, 10)
              : displayResult
          }
          onClick={(selected) =>
            selectedMusic.length === 3
              ? setModal("music")
              : setSelectedMusic((prevState) => [...prevState, selected])
          }
        />
        {searchResult.length > 10 && (
          <PaginationWrapper>
            <Pagination
              page={
                searchResult.length % 10 === 0
                  ? searchResult.length / 10
                  : Math.floor(searchResult.length / 10) + 1
              }
              onClick={(page) => {
                updateResult(page, searchResult);
                setActivePage(page);
              }}
              activePage={activePage}
            />
          </PaginationWrapper>
        )}
      </div>
      <CardWrapper>
        {selectedMusic.map((item, index) => (
          <MusicCard
            id={item.id}
            key={index}
            onClickCancel={() => {
              setSelectedMusic((prevSelectedMusic) =>
                prevSelectedMusic.filter((_, idx) => idx !== index)
              );
            }}
          />
        ))}
      </CardWrapper>
      <ButtonWrapper>
        <Button
          text={"次へ"}
          color={"pink"}
          onClick={() => {
            selectedMusic.length === 0
              ? setModal("nonMusic")
              : setModal("confirm");
          }}
        />
      </ButtonWrapper>
      {modal && (
        <Modal
          text={
            modal === "input"
              ? "アーティスト名を入力してください"
              : modal === "music"
              ? "登録できる楽曲は3曲までです"
              : modal === "nonMusic"
              ? "楽曲を登録してください"
              : `${selectedMusic.map(
                  (music) => `「${music.name}」`
                )}を登録します、よろしいでしょうか`
          }
          onClickBackButton={() => setModal(null)}
          onClickNextButton={
            modal === "confirm"
              ? () => onClickNextButton(selectedMusic)
              : undefined
          }
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  display: grid;
  justify-items: center;
  gap: 30px;
`;
const InputWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 70px;
`;
const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const ButtonWrapper = styled.div`
  margin-left: auto;
`;
const Text = styled.p`
  margin-bottom: -10px;
  font-size: 24px;
  color: white;
  font-weight: 400;
  text-align: center;
`;
const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
