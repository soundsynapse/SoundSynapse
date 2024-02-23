import { Input } from "./index";
import { Frame } from "../frame";
import { useRef } from "react";

export default {
  title: "parts/Input",
  component: Input,
};

export const Template = () => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Frame>
      <Input type={"event"} ref={ref} />
      <button onClick={() => alert(ref.current?.value)}>送信</button>
    </Frame>
  );
};
