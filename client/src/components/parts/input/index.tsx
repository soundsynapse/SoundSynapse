import { forwardRef } from "react";
import styled from "styled-components";

type InputProps = {
  type: "event" | "music";
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type }, ref) => {
    return (
      <StyledInput
        type="text"
        className="input-text"
        placeholder={
          type === "event"
            ? "イベントを登録しよう♪"
            : "好きなアーティストで検索しよう♪"
        }
        ref={ref}
      />
    );
  }
);

const StyledInput = styled.input`
  border: none;
  border-radius: 50px;
  background-color: white;
  padding: 10px 20px;
  text-align: center;
  height: 30px;
  width: 440px;
  font-size: 24px;
  font-weight: 700;

  &::placeholder {
    color: gray;
    font-size: 18px;
  }

  &:focus-visible {
    outline: none;
  }
`;
