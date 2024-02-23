import { ComponentStory } from "@storybook/react";

import { EventsListLayout } from "./layout";
import { Frame } from "../../parts/frame";

export default {
  title: "pages/EventsList",
  component: EventsListLayout,
};

export const Template = () => {
  return (
    <Frame>
      <EventsListLayout
        onClickCreateButton={() => alert("イベント作成画面に遷移")}
        onClickEvent={(id) =>
          alert(`${id}をGlobalStateに格納し、ログイン画面に遷移`)
        }
        events={[
          {
            name: "技育博",
            id: "1",
          },
          {
            name: "技育博2",
            id: "2",
          },
          {
            name: "技育博3",
            id: "3",
          },
          {
            name: "技育博4",
            id: "4",
          },
          {
            name: "技育博5",
            id: "5",
          },
          {
            name: "技育博6",
            id: "6",
          },
          {
            name: "技育博7",
            id: "7",
          },
          {
            name: "技育博8",
            id: "8",
          },
          {
            name: "技育博9",
            id: "9",
          },
          {
            name: "技育博10",
            id: "10",
          },
          {
            name: "技育博11",
            id: "11",
          },
          {
            name: "技育博12",
            id: "12",
          },
          {
            name: "技育博13",
            id: "13",
          },
          {
            name: "技育博14",
            id: "14",
          },
          {
            name: "技育博15",
            id: "15",
          },
          {
            name: "技育博16",
            id: "16",
          },
          {
            name: "技育博17",
            id: "17",
          },
          {
            name: "技育博18",
            id: "18",
          },
          {
            name: "技育博19",
            id: "19",
          },
          {
            name: "技育博20",
            id: "20",
          },
          {
            name: "技育博21",
            id: "21",
          },
          {
            name: "技育博22",
            id: "22",
          },
        ]}
      />
    </Frame>
  );
};
