import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { Data, SearchResult } from "../../parts/searchResult";
import { useState } from "react";
import { Pagination } from "../../parts/pagination";

type EventsListLayoutProps = {
  events: Data[];
  onClickEvent: (id: string) => void;
  onClickCreateButton: () => void;
};

export const EventsListLayout = ({
  events,
  onClickCreateButton,
  onClickEvent,
}: EventsListLayoutProps) => {
  const [displayResult, setDisplayResult] = useState<Data[]>([]);
  const [activePage, setActivePage] = useState(1);

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
    <>
      <HeaderWrapper>
        <MusicText className="music-text">参加するイベントを選ぼう♪</MusicText>
        <ButtonWrapper onClick={onClickCreateButton}>
          <FaPlus color="#ff13d3" size={20} />
          <ButtonText>イベント作成</ButtonText>
        </ButtonWrapper>
      </HeaderWrapper>
      <ResultWrapper>
        <SearchResult
          searchResults={
            displayResult.length === 0 ? events.slice(0, 10) : displayResult
          }
          onClick={(selected) => onClickEvent(selected.id)}
        />
        {events.length > 10 && (
          <PaginationWrapper>
            <Pagination
              page={
                events.length % 10 === 0
                  ? events.length / 10
                  : Math.floor(events.length / 10) + 1
              }
              onClick={(page) => {
                updateResult(page, events);
                setActivePage(page);
              }}
              activePage={activePage}
            />
          </PaginationWrapper>
        )}
      </ResultWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const MusicText = styled.p`
  margin: 30px 0;
  font-size: 24px;
  color: white;
  font-weight: 700;
  text-align: center;
`;
const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  background-color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 30px;
  min-width: 172px;
  cursor: pointer;
  transition: ease 0.2s;

  &:hover {
    background-position: right center;
    background-size: 200% auto;
    -webkit-animation: pulse 2s infinite;
    animation: shad26 1.5s infinite;
  }
  @keyframes shad26 {
    0% {
      box-shadow: 0 0 0 0 white;
    }
    70% {
      box-shadow: 0 0 0 10px rgb(39 172 217 / 0%);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(39 172 217 / 0%);
    }
  }
`;
const ButtonText = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #ff13d3;
`;
const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const ResultWrapper = styled.div`
  margin-top: 20px;
`;
