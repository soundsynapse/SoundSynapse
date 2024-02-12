import { Pagination as PaginationMUI } from "@mui/material";
import styled from "styled-components";

type PaginationProps = {
  onClick: (page: number) => void;
  page: number;
  activePage: number;
};

export const Pagination = ({ onClick, page, activePage }: PaginationProps) => {
  return (
    <StyledPagination
      style={{ fontSize: "24px", color: "white" }}
      count={page}
      onChange={(e, page) => onClick(page)}
      page={activePage}
    />
  );
};

const StyledPagination = styled(PaginationMUI)({
  "& .MuiPaginationItem-page, & .MuiPaginationItem-ellipsis": {
    color: "white", // 数字と「...」の色を白にする
    fontSize: "24px", // フォントサイズを24pxにする
  },
  "& .MuiSvgIcon-root": {
    fontSize: "24px", // アイコンのサイズを24pxにする
    color: "white",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: "white", // 選択されているページの背景色を青にする
    color: "#8002db", // 選択されているページの文字色を白にする
    fontSize: "24px",
  },
  "& .MuiPaginationItem-page:hover": {
    backgroundColor: "rgba(255,255,255,0.4)", // ホバー時の背景色を赤にする
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  "& .MuiPaginationItem-ellipsis:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiPaginationItem-page.Mui-selected:hover": {
    backgroundColor: "white",
  },
});
