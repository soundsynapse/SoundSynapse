import { useNavigate } from "react-router-dom";
import { EventRegisterLayout } from "./layout";
import { Frame } from "../../parts/frame";
import { UserContext } from "../../../App";
import { useContext } from "react";

export const EventRegister = () => {
  const { iconURL } = useContext(UserContext);
  const navigate = useNavigate();
  const registerEvent = async (name: string) => {
    await fetch(
      `https://soundsynapse-316201ce96e2.herokuapp.com/event/create_event/${name}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    navigate("/event-list");
  };

  return (
    <Frame iconURL={iconURL} isStart={false}>
      <EventRegisterLayout
        onClickBackButton={() => navigate("/event-list")}
        onClickRegisterButton={(name) => registerEvent(name)}
      />
    </Frame>
  );
};
