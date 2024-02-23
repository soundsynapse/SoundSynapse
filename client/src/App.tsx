import { createContext, useState } from "react";
import { MusicRegister } from "./components/pages/musicRegister";
import { Result } from "./components/pages/result";
import { Start } from "./components/pages/start";
import { Frame } from "./components/parts/frame";
import { Routes, Route } from "react-router-dom";

type UserDataType = {
  eventId: string;
  userId: string;
};

export const UserContext = createContext({
  eventId: "",
  userId: "",
  updateValue: (newValue: UserDataType) => {},
});

function App() {
  const [userData, setUserData] = useState({
    eventId: "",
    userId: "",
  });

  const updateValue = (newValue: UserDataType) => {
    setUserData(newValue);
  };

  return (
    <UserContext.Provider
      value={{
        eventId: userData.eventId,
        userId: userData.userId,
        updateValue: updateValue,
      }}
    >
      <Frame>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/register" element={<MusicRegister />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Frame>
    </UserContext.Provider>
  );
}

export default App;
