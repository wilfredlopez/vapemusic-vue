import { deepCopy } from "@wilfredlopez/react-utils";
import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { GetterReturn } from "./getters";
import {
  filterUniqueIds,
  filterUniqueSongs,
  getSongIds,
  setLocalStorageFaveTracks
} from "./state-utils";
import { Song } from "@/models/Song.model";
import { User } from "@/models/User.model";

export function isFavTrack(state: State, track: Song): boolean {
  return !!state.user.favTracks.find(t => t.id === track.id);
}

export function getTrack(state: State, id: string) {
  return state.music.tracks.find(t => t.id === id);
}
export function getTrackIndex(state: State, id: string) {
  return state.music.tracks.findIndex(t => t.id === id);
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  getters: GetterReturn;
} & Omit<ActionContext<State, State>, "commit" | "getters">;

// eslint-disable-next-line
interface ActionResolve<P extends any> {
  (context: AugmentedActionContext, payload: P): void;
}
interface ActionResolveNoPayload<P = never> {
  (context: AugmentedActionContext, payload?: P): void;
}

export interface Actions {
  [ActionTypes.ADD_SONGS_ACTION](
    { commit, getters }: AugmentedActionContext,
    payload: Song[]
  ): void;
  [ActionTypes.ADD_SONGS_IF_NOT_ACTION]: ActionResolve<Song[]>;
  [ActionTypes.SET_PLAYER_OPEN_ACTION]: ActionResolve<boolean>;
  [ActionTypes.PAUSE_ACTION]: ActionResolve<boolean>;
  [ActionTypes.TOGGLE_PLAYING_ACTION]: ActionResolveNoPayload;
  [ActionTypes.PLAY_ACTION]: ActionResolve<Song>;
  [ActionTypes.SEEK_ACTION]: ActionResolve<number>;
  [ActionTypes.NEXT_ACTION]: ActionResolveNoPayload;
  [ActionTypes.PREV_ACTION]: ActionResolveNoPayload;
  [ActionTypes.FAV_ACTION]: ActionResolve<Song>;
  [ActionTypes.LOGGED_IN_ACTION]: ActionResolve<User>;
  [ActionTypes.LOGOUT_ACTION]: ActionResolveNoPayload;
  [ActionTypes.PERCENT_PLAYED_ACTION]: ActionResolve<number>;
  [ActionTypes.AUDIO_TIME_ACTION]: ActionResolve<string>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.TOGGLE_PLAYING_ACTION]({ commit }) {
    commit(MutationTypes.TOGGLE_PLAYING);
  },
  [ActionTypes.ADD_SONGS_ACTION]({ commit, state }, songs) {
    const oldTracks = deepCopy(state.music.tracks);
    const newTracks = songs.map(s => s.id);
    const hotTracks = songs
      .filter(s => s.promoted && s.promoted === true)
      .map(s => s.id);

    const uniqueHot = deepCopy([...hotTracks, ...state.music.hotTracks]);
    const uniqueNew = deepCopy([...newTracks, ...state.music.newTracks]);
    const uniqueTracks = filterUniqueSongs([...songs, ...oldTracks]);
    const music = {
      tracks: uniqueTracks,
      newTracks: uniqueNew,
      hotTracks: uniqueHot
    };
    commit(MutationTypes.ADD_SONGS, music);
  },
  [ActionTypes.SET_PLAYER_OPEN_ACTION]({ commit }, payload) {
    commit(MutationTypes.SET_PLAYER_OPEN, payload);
  },
  [ActionTypes.ADD_SONGS_IF_NOT_ACTION]({ commit, state }, songs) {
    const uniqueTracks = filterUniqueSongs([...state.music.tracks, ...songs]);
    const songsIds = getSongIds(songs);
    const uniqueNew = filterUniqueIds([...state.music.newTracks, ...songsIds]);
    const hotTracks = songs
      .filter(s => s.promoted && s.promoted === true)
      .map(s => s.id);

    const uniqueHot = filterUniqueIds([...hotTracks, ...state.music.hotTracks]);
    const music = {
      tracks: uniqueTracks,
      newTracks: uniqueNew,
      hotTracks: uniqueHot
    };
    commit(MutationTypes.ADD_SONGS, music);
  },
  [ActionTypes.AUDIO_TIME_ACTION]({ commit }, payload) {
    commit(MutationTypes.AUDIO_TIME, payload);
  },
  [ActionTypes.FAV_ACTION]({ commit, getters, state }, track) {
    const ct = getters.currentTrack;
    const isFav = isFavTrack(state, track);
    const newFavs = getters.favTracks.filter(t => t.id !== track.id);
    const favs = !isFav ? [ct, ...newFavs] : newFavs;
    setLocalStorageFaveTracks(favs);

    commit(MutationTypes.FAV, favs);
  },
  [ActionTypes.LOGGED_IN_ACTION]({ commit }, user) {
    commit(MutationTypes.LOGGED_IN, user);
  },
  [ActionTypes.LOGOUT_ACTION]({ commit }) {
    commit(MutationTypes.LOGOUT);
  },
  [ActionTypes.NEXT_ACTION]({ commit, getters }) {
    const playing = getters.playingState;
    const index = (playing.index + 1) & getters.tracks.length;
    commit(MutationTypes.NEXT, { index });
  },
  [ActionTypes.PAUSE_ACTION]({ commit }, payload) {
    //Done !
    commit(MutationTypes.PAUSE, payload);
  },
  [ActionTypes.PERCENT_PLAYED_ACTION]({ commit }, payload) {
    commit(MutationTypes.PERCENT_PLAYED, payload);
  },
  [ActionTypes.PLAY_ACTION]({ commit, getters, state }, track) {
    const ct = getters.currentTrack;
    if (track && track.id !== ct.id) {
      const newRecentTracks = getters.recentTracks.filter(
        t => t.id !== track.id
      );
      //if track comes from search it might not exist.
      const index = getTrackIndex(state, track.id);

      commit(MutationTypes.PLAY_NEW, { index, newRecentTracks, track });
    } else {
      commit(MutationTypes.SET_PLAYING);
    }
  },
  [ActionTypes.PERCENT_PLAYED_ACTION]({ commit }, payload) {
    commit(MutationTypes.PERCENT_PLAYED, payload);
  },
  [ActionTypes.PREV_ACTION]({ commit }) {
    commit(MutationTypes.PREV);
  },
  [ActionTypes.SEEK_ACTION]({ commit }, time) {
    commit(MutationTypes.SEEK, time);
  },
  [ActionTypes.SET_PLAYER_OPEN_ACTION]({ commit }, payload) {
    // Done!
    commit(MutationTypes.SET_PLAYER_OPEN, payload);
  }
};
