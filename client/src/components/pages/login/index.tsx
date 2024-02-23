import { useNavigate } from "react-router-dom";
import { Data } from "../../parts/searchResult";
import { LoginLayout } from "./layout";
import { useContext, useState } from "react";
import { UserContext } from "../../../App";

export const LoginView = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Data | null>(null);
  const { eventId, updateValue } = useContext(UserContext);

  const onAuth = async () => {
    // 認証し、完了後ユーザー名とユーザーidを格納
    const res = await fetch(`https://soundsynapse.onrender.com/hogehoge`, {
      method: "GET",
      mode: "cors",
    });
    const result = await res.json();

    // setUser(result)
    setUser({
      name: "ユーザーA",
      id: "1111",
    });
  };

  return (
    <LoginLayout
      user={user}
      onClickBackButton={() => navigate("/event-list")}
      onClickAuthButton={() => onAuth()}
      onClickNextButton={(user) => {
        updateValue({
          userId: user.id,
          eventId: eventId,
        });
        navigate("/music-register");
      }}
      onClickCancelButton={() => setUser(null)}
    />
  );
};
