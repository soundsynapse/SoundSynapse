import { ComponentStory } from "@storybook/react";

import { ResultLayout } from "./layout";
import { Frame } from "../../parts/frame";
import { useEffect, useState } from "react";

export default {
  title: "pages/Result",
  component: ResultLayout,
};

export const Template = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Frame>
      <ResultLayout
        name={"【公式】技育プロジェクト"}
        likeMusic={[
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
        ]}
        isLoading={isLoading}
        onClickBackButton={() => alert("楽曲登録画面に遷移")}
        xId="geek_pjt"
        image="https://pbs.twimg.com/profile_images/1504992081210916865/4JyOAQLx_400x400.jpg"
      />
    </Frame>
  );
};
