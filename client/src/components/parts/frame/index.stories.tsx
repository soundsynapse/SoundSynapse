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
};
