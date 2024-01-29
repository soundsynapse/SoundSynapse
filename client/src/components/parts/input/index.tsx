import { forwardRef } from "react";
import styled from "styled-components";

type InputProps = {
  type: "user" | "music";
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type }, ref) => {
    return (
      <StyledInput
        type="text"
        placeholder={`${
          type === "user" ? "ユーザー名" : "好きな曲"
        }を登録しよう♪`}
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
  width: 400px;
  font-size: 24px;

  &::placeholder {
    color: gray;
    font-size: 18px;
  }

  &:focus-visible {
    outline: none;
  }
`;
