import { StartLayout } from "./layout";
import { useNavigate } from "react-router-dom";

export const Start = () => {
  const navigate = useNavigate();

  return <StartLayout onClickStartButton={() => navigate("/event-list")} />;
};
