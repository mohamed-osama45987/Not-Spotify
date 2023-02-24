//@ts-nocheck
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playListState } from "@/atoms/playlistAtom";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const randomColors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [color, setColor] = useState(null);

  const [playListId, setPlayListId] = useRecoilState(playlistIdState);

  const [playlist, setPlayList] = useRecoilState(playListState);

  useEffect(() => {
    setColor(shuffle(randomColors).pop());
  }, [playListId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playListId)
      .then((data) => {
        return setPlayList(data?.body);
      })
      .catch((err) => {
        console.log("Somthing went wrong", err);
      });
  }, [spotifyApi, playListId]);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className=" absolute top-5 right-8">
        <div
          onClick={signOut}
          className="flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-black "
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt="user-profile-pic"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt="PlaylistImage"
        />

        <div className="">
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl ">
            {playlist?.name}
          </h1>
        </div>
        <h1>go</h1>
      </section>

      <div className="">
        <Songs />
      </div>
    </div>
  );
}

export default Center;
