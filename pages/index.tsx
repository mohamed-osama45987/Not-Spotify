import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div classname="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
