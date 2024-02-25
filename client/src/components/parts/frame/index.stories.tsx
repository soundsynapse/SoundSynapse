import { ComponentStory } from "@storybook/react";

import { Frame } from "./index";

export default {
  title: "parts/Frame",
  component: Frame,
};

const Template: ComponentStory<typeof Frame> = (args) => <Frame {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: <p>children</p>,
  iconURL:
    "https://pbs.twimg.com/profile_images/1503251035007033346/DaBdOZE8_normal.jpg",
};
