import { useContext } from "react";
import { UserContext } from "../../../App";
import { StartLayout } from "./layout";
import { Frame } from "../../parts/frame";

export const Start = () => {
  const { iconURL } = useContext(UserContext);
  return (
    <Frame iconURL={iconURL} isStart={true}>
      <StartLayout />
    </Frame>
  );
};
