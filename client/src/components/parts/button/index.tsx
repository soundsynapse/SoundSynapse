import styled from "styled-components";

type ButtonProps = {
  text: string;
  color: "blue" | "pink";
  onClick: () => void;
};

export const Button = ({ text, color, onClick }: ButtonProps) => {
  return (
    <Wrapper color={color} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

const Wrapper = styled.button<{ color: "blue" | "pink" }>`
  background-color: none;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 28px;
  padding: 10px 30px;
  min-width: 172px;
  color: ${({ color }) => (color === "blue" ? "#8002db" : "#ff13d3")};
  cursor: pointer;
  transition: ease 0.2s;
  @media screen and (max-width: 950px) {
    font-size: 20px;
  }

  &:hover {
    background-position: right center;
    background-size: 200% auto;
    -webkit-animation: pulse 2s infinite;
    animation: shad26 1.5s infinite;
    color: ${({ color }) => (color === "blue" ? "#8002db" : "#ff13d3")};
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
