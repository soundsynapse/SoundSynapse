import { ComponentStory } from "@storybook/react";

import { SearchButton } from "./index";
import { Frame } from "../frame";

export default {
  title: "parts/SearchButton",
  component: SearchButton,
};

const Template: ComponentStory<typeof SearchButton> = (args) => (
  <Frame>
    <SearchButton {...args} />
  </Frame>
);

export const Basic = Template.bind({});
Basic.args = {
  onClick: () => alert("click"),
};
