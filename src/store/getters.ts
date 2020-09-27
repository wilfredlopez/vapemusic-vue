import { Song } from "@/models/Song.model";
import { GetterTree } from "vuex";
import { State, PlayingState } from "./state";

export type Getters = {
  isPlayerOpen(state: State): boolean;
  tracks(state: State): Song[];
  newTracks(state: State): Song[];
  hotTracks(state: State): Song[];
  favTracks(state: State): Song[];
  recentTracks(state: State): Song[];
  playingState(state: State): PlayingState;
  currentTrack(state: State): Song;
  user(state: State): typeof state.user;
};

// type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
//   ? A
//   : never;
export type GetterReturn = {
  [P in keyof Getters]: ReturnType<Getters[P]>;
};

export const getters: GetterTree<State, State> & Getters = {
  // Some state selectors
  isPlayerOpen(state: State) {
    return state.ui.playerOpen;
  },

  // Get all tracks in database
  tracks(state: State) {
    return state.music.tracks;
  },

  newTracks(state: State) {
    return state.music.tracks.filter(t =>
      state.music.newTracks.find(nt => nt === t.id)
    );
  },

  hotTracks(state: State) {
    return state.music.tracks.filter(t =>
      state.music.hotTracks.find(nt => nt === t.id)
    );
  },

  favTracks(state: State) {
    return state.user.favTracks;
  },

  recentTracks(state: State) {
    return state.user.recentTracks;
  },

  playingState(state: State) {
    return state.playing;
  },

  currentTrack(state: State) {
    return state.music.tracks[state.playing.index];
  },

  user(state: State) {
    return state.user;
  }
};
