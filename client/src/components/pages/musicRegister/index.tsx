import { useContext, useState } from "react";
import { MusicRegisterLayout } from "./layout";
import { Data } from "../../parts/searchResult";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

export const MusicRegister = () => {
  const [searchResult, setSearchResult] = useState<Data[]>([]);
  const { userId, eventId } = useContext(UserContext);
  const navigate = useNavigate();

  const getMusic = async (searchWord: string) => {
    const res = await fetch(
      `https://soundsynapse-316201ce96e2.herokuapp.com/music/artist/${searchWord}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const result = await res.json();
    const resultItems: any = result;
    return resultItems;
  };

  const onSearch = async (searchWord: string) => {
    const searchResult = await getMusic(searchWord);
    if (!searchResult) return;
    setSearchResult(searchResult);
  };

  const registerMusic = async (selectedMusic: Data[]) => {
    const postData = {
      userid: userId,
      eventid: eventId,
      music: selectedMusic.map((music) => music.id),
    };
    await fetch(
      `https://soundsynapse-316201ce96e2.herokuapp.com/music/return_music/`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    navigate("/result");
  };

  return (
    <MusicRegisterLayout
      onClickNextButton={async (selectedMusic) => {
        await registerMusic(selectedMusic);
      }}
      onClickSearchButton={async (value) => await onSearch(value)}
      searchResult={searchResult}
    />
  );
};
