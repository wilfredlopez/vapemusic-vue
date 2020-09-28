import { Song } from "@/models/Song.model";
import { User } from "@/models/User.model";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";
import {
  setLocalStorageAllTracks,
  setLocalStorageRecentTracks
} from "./state-utils";
import { getTrackIndex } from "./actions";

// eslint-disable-next-line
export interface MutationResolve<P extends any, S = State> {
  (state: State, payload: P): void;
}

export interface MutationResolveNever<P = never, S = State> {
  (state: S, payload?: P): void;
}

export type Mutations<S = State> = {
  [MutationTypes.ADD_SONGS]: MutationResolve<{
    tracks: Song[];
    newTracks: string[];
    hotTracks: string[];
  }>;
  [MutationTypes.SET_PLAYER_OPEN]: MutationResolve<boolean>;
  [MutationTypes.TOGGLE_PLAYING]: MutationResolveNever;
  [MutationTypes.PAUSE]: MutationResolveNever;
  [MutationTypes.SET_PLAYING]: MutationResolveNever;
  [MutationTypes.PLAY_NEW]: MutationResolve<{
    track: Song;
    newRecentTracks: Song[];
  }>;
  [MutationTypes.SEEK]: MutationResolve<number>;
  [MutationTypes.NEXT]: MutationResolve<{ index: number }>;
  [MutationTypes.PREV]: MutationResolveNever;
  [MutationTypes.FAV]: MutationResolve<Song[]>;
  [MutationTypes.LOGGED_IN]: MutationResolve<User>;
  [MutationTypes.LOGOUT]: MutationResolveNever;
  [MutationTypes.PERCENT_PLAYED]: MutationResolve<number>;
  [MutationTypes.AUDIO_TIME]: MutationResolve<string>;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_SONGS](state, music) {
    state.music.hotTracks = music.hotTracks;
    state.music.newTracks = music.newTracks;
    state.music.tracks = music.tracks;
    setLocalStorageAllTracks(music.tracks);
  },
  [MutationTypes.SET_PLAYER_OPEN](state, payload) {
    state.ui.playerOpen = payload;
  },
  [MutationTypes.TOGGLE_PLAYING](state) {
    state.playing.isPlaying = !state.playing.isPlaying;
  },
  [MutationTypes.PAUSE](state) {
    state.playing.isPlaying = false;
  },
  [MutationTypes.SET_PLAYING](state) {
    state.playing.isPlaying = true;
  },
  [MutationTypes.PLAY_NEW](state, payload) {
    const tracks = state.music.tracks;
    let index = getTrackIndex(state, payload.track.id);
    //adding track to end of the array of tracks if index=-1 and settings index to last.
    if (index === -1) {
      tracks.push(payload.track);
      index = tracks.length - 1;
    }
    setLocalStorageRecentTracks([payload.track, ...payload.newRecentTracks]);
    setLocalStorageAllTracks(tracks);
    state.music.tracks = tracks;
    state.ui.playerOpen = true;
    state.user.recentTracks = [payload.track, ...payload.newRecentTracks];
    state.playing.index = index;
    state.playing.progress = 0;
    state.playing.currentAudioTime = "0";
    state.playing.percentPlayed = 0;
    state.playing.isPlaying = true;
  },
  [MutationTypes.SEEK](state, time) {
    state.playing.progress = time;
  },
  [MutationTypes.NEXT](state, payload) {
    state.playing.index = payload.index;
    state.playing.progress = 0;
  },
  [MutationTypes.PREV](state) {
    if (state.playing.index === 0) {
      state.playing.index = state.music.tracks.length - 1;
    } else {
      state.playing.index = Math.max(0, state.playing.index - 1);
    }
    state.playing.progress = 0;
  },
  [MutationTypes.FAV](state, favs) {
    state.user.favTracks = favs;
  },
  [MutationTypes.LOGGED_IN](state, user) {
    state.auth.user = user;
  },
  [MutationTypes.LOGOUT](state) {
    state.playing.isPlaying = false;
    state.playing.currentAudioTime = "0";
    state.playing.index = 0;
    state.playing.percentPlayed = 0;
    state.playing.progress = 0;
    state.auth.user = null;
  },
  [MutationTypes.PERCENT_PLAYED](state, payload) {
    state.playing.percentPlayed = payload;
  },
  [MutationTypes.AUDIO_TIME](state, time) {
    state.playing.currentAudioTime = time;
  }
};
