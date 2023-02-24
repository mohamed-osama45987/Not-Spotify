import { playListState } from "@/atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playListState);

  return (
    <div className="px-8 flex flex-col text-white space-y-1 pb-28">
      {/* @ts-ignore */}
      {playlist?.tracks.items.map((track, i) => {
        return (
          <div className="" key={track.track.id}>
            {/* @ts-ignore */}
            <Song order={i} track={track} />
          </div>
        );
      })}
    </div>
  );
}

export default Songs;
