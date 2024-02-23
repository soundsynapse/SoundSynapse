import { useContext, useEffect, useState } from "react";
import { ResultLayout } from "./layout";
import { useNavigate } from "react-router-dom";
import { Data } from "../../parts/searchResult";
import { UserContext } from "../../../App";

type DataType = {
  name: string;
  likeMusic: Data[];
  xId: string;
};

export const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userId, eventId } = useContext(UserContext);
  const [data, setData] = useState<DataType>({
    name: "",
    likeMusic: [],
    xId: "",
  });
  const navigate = useNavigate();

  const getResult = async () => {
    const res = await fetch(`https://soundsynapse.onrender.com/hogehoge`, {
      method: "GET",
      mode: "cors",
    });
    const result = await res.json();
    alert(
      `ユーザーid : ${userId}, イベントid: ${eventId}でマッチングAPIを叩く`
    );
    // setData(result)
    setData({
      name: "【公式】技育プロジェクト",
      likeMusic: [
        {
          id: "4LjIQmt1t6NjpM0tpttzjo",
          name: "勇者",
        },
        {
          id: "1hAloWiinXLPQUJxrJReb1",
          name: "アイドル",
        },
        {
          id: "1zd35Y44Blc1CwwVbW3Qnk",
          name: "群青",
        },
      ],
      xId: "geek_pjt",
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <ResultLayout
      name={data.name}
      likeMusic={data.likeMusic}
      isLoading={isLoading}
      xId={data.xId}
      onClickBackButton={() => navigate("/music-register")}
    />
  );
};
