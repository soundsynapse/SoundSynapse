import { createContext, useState } from "react";
import { MusicRegister } from "./components/pages/musicRegister";
import { Result } from "./components/pages/result";
import { Start } from "./components/pages/start";
import { Frame } from "./components/parts/frame";
import { Routes, Route } from "react-router-dom";
import { EventList } from "./components/pages/eventsList";
import { EventRegister } from "./components/pages/eventRegister";
import { LoginView } from "./components/pages/login";

type UserDataType = {
  eventId: string;
  userId: string;
  iconURL: string;
};

export const UserContext = createContext({
  eventId: "",
  userId: "",
  iconURL: "",
  updateValue: (newValue: UserDataType) => {},
});

function App() {
  const [userData, setUserData] = useState({
    eventId: "",
    userId: "",
    iconURL: "",
  });

  const updateValue = (newValue: UserDataType) => {
    setUserData(newValue);
  };

  return (
    <UserContext.Provider
      value={{
        eventId: userData.eventId,
        userId: userData.userId,
        iconURL: userData.iconURL,
        updateValue: updateValue,
      }}
    >
      <Frame
        iconURL={userData.iconURL}
        isStart={window.location.href === "https://sound-synapse.vercel.app/"}
      >
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/event-list" element={<EventList />} />
          <Route path="/event-register" element={<EventRegister />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/music-register" element={<MusicRegister />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Frame>
    </UserContext.Provider>
  );
}

export default App;
