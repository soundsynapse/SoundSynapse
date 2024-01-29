import { ComponentStory } from "@storybook/react";

import { MusicCard } from "./index";
import { Frame } from "../frame";
import styled from "styled-components";

export default {
  title: "parts/MusicCard",
  component: MusicCard,
};

const Template: ComponentStory<typeof MusicCard> = (args) => (
  <Frame>
    <MusicCard {...args} />
  </Frame>
);

export const Basic = Template.bind({});
Basic.args = {
  id: "4LjIQmt1t6NjpM0tpttzjo",
};

const MultiTemplate: ComponentStory<typeof MusicCard> = () => (
  <Frame>
    <Wrapper>
      <MusicCard id={"4LjIQmt1t6NjpM0tpttzjo"} />
      <MusicCard id={"4LjIQmt1t6NjpM0tpttzjo"} />
      <MusicCard id={"4LjIQmt1t6NjpM0tpttzjo"} />
    </Wrapper>
  </Frame>
);

export const Multi = MultiTemplate.bind({});

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;
