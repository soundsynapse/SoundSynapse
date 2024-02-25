import { ComponentStory } from "@storybook/react";

import { StartLayout } from "./layout";
import { Frame } from "../../parts/frame";
import { useState } from "react";
import { Data } from "../../parts/searchResult";

export default {
  title: "pages/Start",
  component: StartLayout,
};

export const Template = () => {
  const [user, setUser] = useState<Data | null>(null);
  return (
    <Frame>
      <StartLayout
        user={user}
        onClickAuthButton={() => {
          alert(
            "認証APIを叩き、ユーザー名などをDBに格納後ユーザー名とユーザーidを取得する"
          );
          setUser({
            name: "ゲストユーザー",
            id: "1111",
          });
        }}
        onClickNextButton={(user) =>
          alert(
            `${JSON.stringify(user)}をGlobalStateに格納し、楽曲登録画面に遷移`
          )
        }
        onClickCancelButton={() => setUser(null)}
      />
    </Frame>
  );
};
