import { ComponentStory } from "@storybook/react";

import { RegisterLayout } from "./layout";
import { Frame } from "../../parts/frame";
import { useState } from "react";
import { MusicData } from "../../parts/searchResult";

export default {
  title: "pages/Register",
  component: RegisterLayout,
};

export const Template = () => {
  const [searchResult, setSearchResult] = useState<MusicData[]>([]);
  return (
    <Frame>
      <RegisterLayout
        onClickNextButton={(userName, selectedMusic) =>
          alert(
            `ユーザー名 : ${userName}, 楽曲 : ${JSON.stringify(selectedMusic)}`
          )
        }
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
          ]);
        }}
        searchResult={searchResult}
      />
    </Frame>
  );
};
