import { ComponentStory } from "@storybook/react";

import { SearchResult } from "./index";
import { Frame } from "../frame";

export default {
  title: "parts/SearchResult",
  component: SearchResult,
};

const Template: ComponentStory<typeof SearchResult> = (args) => (
  <Frame>
    <SearchResult {...args} />
  </Frame>
);

export const Basic = Template.bind({});
Basic.args = {
  searchResults: [
    {
      id: "1",
      name: "勇者",
    },
    {
      id: "2",
      name: "アイドル",
    },
    {
      id: "3",
      name: "群青",
    },
    {
      id: "4",
      name: "夜に駆ける",
    },
    {
      id: "5",
      name: "あの夢をなぞってあの夢をなぞってあの夢をなぞって",
    },
  ],
  onClick: (selectedMusic) => alert(JSON.stringify(selectedMusic)),
};

export const One = Template.bind({});
One.args = {
  searchResults: [
    {
      id: "1",
      name: "勇者",
    },
  ],
  onClick: (selectedMusic) => alert(JSON.stringify(selectedMusic)),
};

export const Two = Template.bind({});
Two.args = {
  searchResults: [
    {
      id: "1",
      name: "勇者",
    },
    {
      id: "2",
      name: "アイドル",
    },
  ],
  onClick: (selectedMusic) => alert(JSON.stringify(selectedMusic)),
};
