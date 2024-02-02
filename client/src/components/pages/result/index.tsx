import { useEffect, useState } from "react";
import { ResultLayout } from "./layout";

export const Result = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ResultLayout
      name={"ユーザーA"}
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
    />
  );
};
