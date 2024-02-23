import { ComponentStory } from "@storybook/react";

import { EventRegisterLayout } from "./layout";
import { Frame } from "../../parts/frame";

export default {
  title: "pages/EventsRegister",
  component: EventRegisterLayout,
};

export const Template = () => {
  return (
    <Frame>
      <EventRegisterLayout
        onClickBackButton={() => alert("イベント一覧画面に遷移")}
        onClickRegisterButton={(name) => alert(`${name}を登録`)}
      />
    </Frame>
  );
};
