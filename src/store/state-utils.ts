import { Song } from "@/models/Song.model";
import { Storage } from "../utils/Storage";
export const FAV_TRACKS_LOCAL_STORAGE_KEY = "USER-FAV-TRACKS-VUE";
export const RECENT_TRACKS_LOCAL_STORAGE_KEY = "USER-RECENT-TRACKS-VUE";

//UTILS
export async function getLocalStorageTracks() {
  let favTracks: Song[] = [];
  let recentTracks: Song[] = [];
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
  return {
    favTracks,
    recentTracks
  };
}
export function setLocalStorageRecentTracks(tracks: Song[]) {
  Storage.setObject({
    key: RECENT_TRACKS_LOCAL_STORAGE_KEY,
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
