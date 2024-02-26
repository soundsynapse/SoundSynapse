import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

type SearchButtonProps = {
  onClick: () => void;
};

export const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <Wrapper onClick={onClick}>
      <IoIosSearch color="#ff13d3" size={40} />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: white;
  border: none;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  padding-top: 5px;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    margin-left: auto;
  }
`;
