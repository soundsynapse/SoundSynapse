import { useContext, useEffect, useState } from "react";
import { ResultLayout } from "./layout";
import { useNavigate } from "react-router-dom";
import { Data } from "../../parts/searchResult";
import { UserContext } from "../../../App";
import { Frame } from "../../parts/frame";

type DataType = {
  name: string;
  likeMusic: Data[];
  xId: string;
  image: string;
};

export const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userId, eventId, iconURL } = useContext(UserContext);
  const [data, setData] = useState<DataType>({
    name: "",
    likeMusic: [],
    xId: "",
    image: "",
  });
  const navigate = useNavigate();

  const getResult = async () => {
    const res = await fetch(
      `https://soundsynapse-316201ce96e2.herokuapp.com/music/return_music/`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const result = await res.json();
    console.log(result);
    await setData({
      name: result.user_id,
      likeMusic: [
        {
          id: result.music_id1,
          name: "勇者",
        },
        {
          id: result.music_id2,
          name: "アイドル",
        },
        {
          id: result.music_id3,
          name: "群青",
        },
      ],
      xId: result.user_id,
      image:
        "https://pbs.twimg.com/profile_images/1504992081210916865/4JyOAQLx_400x400.jpg",
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Frame iconURL={iconURL} isStart={false}>
      <ResultLayout
        name={data.name}
        likeMusic={data.likeMusic}
        isLoading={isLoading}
        xId={data.xId}
        onClickBackButton={() => navigate("/")}
        image={data.image}
      />
    </Frame>
  );
};
