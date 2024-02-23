import { useEffect, useState } from "react";
import { ResultLayout } from "./layout";
import { useNavigate } from "react-router-dom";

export const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ResultLayout
      name={"【公式】技育プロジェクト"}
      likeMusic={[
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
      ]}
      isLoading={isLoading}
      onClickBackButton={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
