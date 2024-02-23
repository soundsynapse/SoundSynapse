import { useContext, useState } from "react";
import { MusicRegisterLayout } from "./layout";
import { Data } from "../../parts/searchResult";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

const sampleData = [
  {
    id: "4LjIQmt1t6NjpM0tpttzjo",
    name: "勇者",
  },
  {
    id: "1hAloWiinXLPQUJxrJReb1",
    name: "アイドル",
  },
  {
    id: "1zd35Y44Blc1CwwVbW3Qnk",
    name: "群青",
  },
  {
    id: "6MCjmGYlw6mQVWRFVgBRvB",
    name: "夜に駆ける",
  },
  {
    id: "1VoTe7qVyqyMNLgZpQeugO",
    name: "祝福",
  },
  {
    id: "4LjIQmt1t6NjpM0tpttzjo",
    name: "勇者2",
  },
  {
    id: "1hAloWiinXLPQUJxrJReb1",
    name: "アイドル2",
  },
  {
    id: "1zd35Y44Blc1CwwVbW3Qnk",
    name: "群青2",
  },
  {
    id: "6MCjmGYlw6mQVWRFVgBRvB",
    name: "夜に駆ける2",
  },
  {
    id: "1VoTe7qVyqyMNLgZpQeugO",
    name: "祝福2",
  },
  {
    id: "4LjIQmt1t6NjpM0tpttzjo",
    name: "勇者3",
  },
  {
    id: "1hAloWiinXLPQUJxrJReb1",
    name: "アイドル3",
  },
  {
    id: "1zd35Y44Blc1CwwVbW3Qnk",
    name: "群青3",
  },
  {
    id: "6MCjmGYlw6mQVWRFVgBRvB",
    name: "夜に駆ける3",
  },
  {
    id: "1VoTe7qVyqyMNLgZpQeugO",
    name: "祝福3",
  },
  {
    id: "4LjIQmt1t6NjpM0tpttzjo",
    name: "勇者4",
  },
  {
    id: "1hAloWiinXLPQUJxrJReb1",
    name: "アイドル4",
  },
  {
    id: "1zd35Y44Blc1CwwVbW3Qnk",
    name: "群青4",
  },
  {
    id: "6MCjmGYlw6mQVWRFVgBRvB",
    name: "夜に駆ける4",
  },
  {
    id: "1VoTe7qVyqyMNLgZpQeugO",
    name: "祝福4",
  },
  {
    id: "4LjIQmt1t6NjpM0tpttzjo",
    name: "勇者5",
  },
  {
    id: "1hAloWiinXLPQUJxrJReb1",
    name: "アイドル5",
  },
  {
    id: "1zd35Y44Blc1CwwVbW3Qnk",
    name: "群青5",
  },
  {
    id: "6MCjmGYlw6mQVWRFVgBRvB",
    name: "夜に駆ける5",
  },
  {
    id: "1VoTe7qVyqyMNLgZpQeugO",
    name: "祝福5",
  },
];

export const MusicRegister = () => {
  const [searchResult, setSearchResult] = useState<Data[]>([]);
  const { userId, eventId } = useContext(UserContext);
  const navigate = useNavigate();

  const getMusic = async (searchWord: string) => {
    // const res = await fetch(
    //   `https://soundsynapse.onrender.com/artist/${searchWord}`,
    //   {
    //     method: "GET",
    //     mode: "cors",
    //   }
    // );
    // const result = await res.json();
    // const resultItems: any = result;
    alert(`${searchWord}で検索`);
    return sampleData;
  };

  const onSearch = async (searchWord: string) => {
    const searchResult = await getMusic(searchWord);
    if (!searchResult) return;
    // setSearchResult(searchResult);
    setSearchResult(searchResult);
  };

  const registerMusic = async (selectedMusic: Data[]) => {
    // await fetch(`https://soundsynapse.onrender.com/hogehoge`, {
    //   method: "POST",
    //   mode: "cors",
    // });
    alert(
      `「楽曲 : ${JSON.stringify(
        selectedMusic
      )}」「ユーザーid : ${userId}」「イベントid : ${eventId}」をユーザーAPIに投げる`
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
