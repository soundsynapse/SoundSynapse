import { useNavigate } from "react-router-dom";
import { EventRegisterLayout } from "./layout";

export const EventRegister = () => {
  const navigate = useNavigate();
  const registerEvent = async (name: string) => {
    // await fetch(`https://soundsynapse.onrender.com/hogehoge`, {
    //   method: "POST",
    //   mode: "cors",
    // });
    alert(`${name}をイベントAPIに投げる`);
    navigate("/event-list");
  };

  return (
    <EventRegisterLayout
      onClickBackButton={() => navigate("/event-list")}
      onClickRegisterButton={(name) => registerEvent(name)}
    />
  );
};
