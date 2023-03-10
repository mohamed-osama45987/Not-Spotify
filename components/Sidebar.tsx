import { useEffect, useState } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "@/atoms/playlistAtom";
import { useRecoilState } from "recoil";

function Sidebar() {
  const { data: session, status } = useSession();
  const [playlists, setPlayLists] = useState([]);
  const spotifyApi = useSpotify();
  const [playListId, setPlayListId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        //@ts-ignore
        setPlayLists(data?.body?.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className=" hidden md:inline-flex overflow-y-scroll scrollbar-hide h-screen  text-gray-500 p-8 text-xs lg:text-sm border-r border-gray-900 sm:max-w-[12rem] lg:max-w-[15rem]">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* playlists */}

        {
          //@ts-ignore
          playlists.map((playlist: { id; name }) => {
            return (
              <p
                onClick={() => {
                  setPlayListId(playlist.id);
                }}
                className="cursor-pointer hover:text-white"
                key={playlist.id}
              >
                {playlist.name}
              </p>
            );
          })
        }
      </div>
    </div>
  );
}

export default Sidebar;
