import styled from "styled-components";

type MusicCardProps = {
  id: string;
};

export const MusicCard = ({ id }: MusicCardProps) => {
  return (
    <Wrapper>
      <iframe
        title={'test'}
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
`;
