import { useLocation, useNavigate } from "react-router-dom";
import { EventsListLayout } from "./layout";
import { UserContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { Data } from "../../parts/searchResult";
import { Frame } from "../../parts/frame";

export const EventList = () => {
  const navigate = useNavigate();
  const { eventId, userId, iconURL, updateValue } = useContext(UserContext);
  const [event, setEvent] = useState<Data[]>([]);

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const getEvent = async () => {
    const res = await fetch(
      `https://soundsynapse-316201ce96e2.herokuapp.com/event/get_event`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const result = await res.json();
    const resultItems: any = await result;
    await setEvent(resultItems);
  };

  useEffect(() => {
    getEvent();
    if (query.get("icon_url") == undefined) return;
    updateValue({
      eventId: eventId,
      userId: query.get("userid") || "",
      iconURL: decodeURIComponent(query.get("icon_url") || ""),
    });
  }, []);

  return (
    <Frame
      iconURL={decodeURIComponent(query.get("icon_url") || "")}
      isStart={false}
    >
      <EventsListLayout
        events={event}
        onClickEvent={(id) => {
          updateValue({
            eventId: id,
            userId: query.get("userid") ? query.get("userid") || "" : userId,
            iconURL: query.get("icon_url")
              ? decodeURIComponent(query.get("icon_url") || "")
              : iconURL,
          });
          navigate("/music-register");
        }}
        onClickCreateButton={() => navigate("/event-register")}
      />
    </Frame>
  );
};
