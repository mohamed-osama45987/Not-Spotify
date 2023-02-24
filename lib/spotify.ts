import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-modify-public",
  "playlist-read-private",
  "user-library-read",
  "user-library-modify",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-library-read",
  "user-read-private",
  "user-read-recently-played",
  "user-top-read",
  "user-follow-read",
  "user-modify-playback-state",
  "app-remote-control",
  "user-read-playback-state",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
