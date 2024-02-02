import { useState } from "react";
import { RegisterLayout } from "./layout";
import { MusicData } from "../../parts/searchResult";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [searchResult, setSearchResult] = useState<MusicData[]>([]);
  const navigate = useNavigate();

  return (
    <RegisterLayout
      onClickNextButton={(userName, selectedMusic) => {
        alert(
          `ユーザー名 : ${userName}, 楽曲 : ${JSON.stringify(selectedMusic)}`
        );
        navigate("/result");
      }}
      onClickSearchButton={(value) => {
        alert(`検索ワード「${value}」で検索する`);
        setSearchResult([
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
        ]);
      }}
      searchResult={searchResult}
    />
  );
};
