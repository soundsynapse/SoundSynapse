import { ComponentStory } from "@storybook/react";

import { Example } from "./index";

export default {
  title: "atoms/Example",
  component: Example,
};

const Template: ComponentStory<typeof Example> = () => <Example />;

export const Basic = Template.bind({});
Basic.args = {};
