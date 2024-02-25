import { useNavigate } from "react-router-dom";
import { EventRegisterLayout } from "./layout";

export const EventRegister = () => {
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
    <EventRegisterLayout
      onClickBackButton={() => navigate("/event-list")}
      onClickRegisterButton={(name) => registerEvent(name)}
    />
  );
};
