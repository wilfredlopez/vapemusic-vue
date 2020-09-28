import { Song } from "@/models/Song.model";
import { Storage } from "../utils/Storage";
import { State } from "./state";
export const ALL_TRACKS_LOCAL_STORAGE_KEY = "ALL-CACHED-TRACKS-VUE";
export const FAV_TRACKS_LOCAL_STORAGE_KEY = "USER-FAV-TRACKS-VUE";
export const RECENT_TRACKS_LOCAL_STORAGE_KEY = "USER-RECENT-TRACKS-VUE";

//UTILS
export async function getLocalStorageTracks() {
  let favTracks: Song[] = [];
  let recentTracks: Song[] = [];
  let cacheTracks: Song[] = [];
  const savedFavs = await Storage.getObject<Song[]>({
    key: FAV_TRACKS_LOCAL_STORAGE_KEY
  });

  const savedRecent = await Storage.getObject<Song[]>({
    key: RECENT_TRACKS_LOCAL_STORAGE_KEY
  });
  if (savedFavs && savedFavs.length > 0) {
    favTracks = savedFavs;
  }
  if (savedRecent && savedRecent.length > 0) {
    recentTracks = savedRecent;
  }

  const savedCachedTracks = await Storage.getObject<Song[]>({
    key: ALL_TRACKS_LOCAL_STORAGE_KEY
  });
  if (savedCachedTracks) {
    cacheTracks = savedCachedTracks;
  }
  return {
    favTracks,
    recentTracks,
    cacheTracks
  };
}
export function setLocalStorageRecentTracks(tracks: Song[]) {
  Storage.setObject({
    key: RECENT_TRACKS_LOCAL_STORAGE_KEY,
    value: JSON.stringify(tracks)
  });
}

export function setLocalStorageAllTracks(tracks: Song[]) {
  Storage.setObject({
    key: ALL_TRACKS_LOCAL_STORAGE_KEY,
    value: JSON.stringify(tracks)
  });
}

export function setLocalStorageFaveTracks(tracks: Song[]) {
  Storage.setObject({
    key: FAV_TRACKS_LOCAL_STORAGE_KEY,
    value: JSON.stringify(tracks)
  });
}
export function getSongIds(songs: Song[]) {
  return songs.map(song => song.id);
}

// eslint-disable-next-line
export function filterUnique<T extends any>(
  songs: T[],
  where: (every: T, current: T) => boolean
) {
  return songs.reduce((prev, curr) => {
    if (prev.findIndex(s => where(s, curr)) !== -1) {
      return [...prev];
    }
    return [...prev, curr];
  }, [] as T[]);
}

export function filterUniqueIds(songIds: string[]) {
  return filterUnique(songIds, (every, current) => every === current);
}

export function filterUniqueSongs(songs: Song[]) {
  return filterUnique(songs, (every, current) => every.id === current.id);
}

export function getMusic(state: State, songs: Song[]) {
  const uniqueTracks = filterUniqueSongs([...state.music.tracks, ...songs]);
  const songsIds = getSongIds(songs);
  const uniqueNew = filterUniqueIds([...state.music.newTracks, ...songsIds]);
  const hotTracks = songs
    .filter(s => s.promoted && s.promoted === true)
    .map(s => s.id);

  const uniqueHot = filterUniqueIds([...hotTracks, ...state.music.hotTracks]);
  return {
    tracks: uniqueTracks,
    newTracks: uniqueNew,
    hotTracks: uniqueHot
  };
}
