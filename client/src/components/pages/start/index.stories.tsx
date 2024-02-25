import { ComponentStory } from "@storybook/react";

import { StartLayout } from "./layout";
import { Frame } from "../../parts/frame";

export default {
  title: "pages/Start",
  component: StartLayout,
};

export const Template = () => {
  return (
    <Frame>
      <StartLayout />
    </Frame>
  );
};
