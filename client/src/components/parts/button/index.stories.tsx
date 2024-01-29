import { ComponentStory } from "@storybook/react";

import { Button } from "./index";
import { Frame } from "../frame";

export default {
  title: "parts/Button",
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args) => (
  <Frame>
    <Button {...args} />
  </Frame>
);

export const Basic = Template.bind({});
Basic.args = {
  text: "テキスト",
  color: "blue",
  onClick: () => alert("click"),
};
