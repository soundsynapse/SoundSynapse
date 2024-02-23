import styled from "styled-components";
import { MdCancel } from "react-icons/md";

type MusicCardProps = {
  id: string;
  onClickCancel?: () => void;
};

export const MusicCard = ({ id, onClickCancel }: MusicCardProps) => {
  return (
    <Wrapper>
      {onClickCancel && (
        <IconWrapper onClick={onClickCancel}>
          <MdCancel size={35} />
        </IconWrapper>
      )}
      <iframe
        title={"test"}
        src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
        width="300"
        height="200"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  padding: 10px;
  height: 150px;
  width: 300px;
  position: relative;
`;
const IconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  left: 295px;
  top: -10px;
`;
