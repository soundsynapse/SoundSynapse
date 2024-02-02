import { ComponentStory } from "@storybook/react";

import { Pagination } from "./index";
import { Frame } from "../frame";

export default {
  title: "parts/Pagination",
  component: Pagination,
};

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Frame>
    <Pagination {...args} />
  </Frame>
);

export const Basic = Template.bind({});
Basic.args = {
  onClick: (page) => alert(page),
};
