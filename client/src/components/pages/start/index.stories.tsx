import { ComponentStory } from "@storybook/react";

import { StartLayout } from "./layout";
import { Frame } from "../../parts/frame";

export default {
  title: "pages/Start",
  component: StartLayout,
};

const Template: ComponentStory<typeof StartLayout> = (args) => (
  <Frame>
    <StartLayout {...args} />
  </Frame>
);

export const Basic = Template.bind({});
Basic.args = {
  onClickStartButton: () => alert("登録画面に遷移"),
};
