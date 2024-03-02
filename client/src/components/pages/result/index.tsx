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
      `https://soundsynapse-316201ce96e2.herokuapp.com/music/matching/1/raisins_verte`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const result = await res.json();
    console.log(result[0]);
    setData({
      name: result[0][0],
      likeMusic: [
        {
          id: result[0][2],
          name: "勇者",
        },
        {
          id: result[0][3],
          name: "アイドル",
        },
        {
          id: result[0][4],
          name: "群青",
        },
      ],
      xId: result[0][5],
      image: result[0][1],
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
