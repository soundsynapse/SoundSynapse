import styled from "styled-components";
import "../../../style.css";

export type Data = {
  id: string;
  name: string;
};

type SearchResultProps = {
  searchResults: Data[];
  onClick: (selectedMusic: Data) => void;
};

export const SearchResult = ({ searchResults, onClick }: SearchResultProps) => {
  return (
    <div className="search-results">
      {searchResults.map((result) => (
        <Text className="result-text" onClick={() => onClick(result)}>
          {result.name}
        </Text>
      ))}
    </div>
  );
};

const Text = styled.div`
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
