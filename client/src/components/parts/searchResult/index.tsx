import styled from "styled-components";
import "../../../style.css";

export type MusicData = {
  id: string;
  name: string;
};

type SearchResultProps = {
  searchResults: MusicData[];
  onClick: (selectedMusic: MusicData) => void;
};

export const SearchResult = ({ searchResults, onClick }: SearchResultProps) => {
  return (
    <>
      {searchResults.map((result) => (
        <Text
          className="result-text"
          onClick={() => onClick(result)}
          number={searchResults.length + 1}
        >
          {result.name}
        </Text>
      ))}
    </>
  );
};

const Text = styled.div<{ number: number }>`
  padding: 10px 20px;
  font-size: 24px;
  background-color: white;
  cursor: pointer;
  width: 440px;
  font-weight: 700;

  &:last-child {
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }

  &:nth-child(1) {
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
  }

  &:hover {
    background-color: #ecd4ff;
  }
`;