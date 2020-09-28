import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { GetterReturn } from "./getters";
import { getMusic, setLocalStorageFaveTracks } from "./state-utils";
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
    const music = getMusic(state, songs);
    commit(MutationTypes.ADD_SONGS, music);
  },
  [ActionTypes.SET_PLAYER_OPEN_ACTION]({ commit }, payload) {
    commit(MutationTypes.SET_PLAYER_OPEN, payload);
  },
  [ActionTypes.ADD_SONGS_IF_NOT_ACTION]({ commit, state }, songs) {
    commit(MutationTypes.ADD_SONGS, getMusic(state, songs));
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
    const index = (playing.index + 1) % getters.tracks.length;
    commit(MutationTypes.NEXT, { index });
  },
  [ActionTypes.PAUSE_ACTION]({ commit }, payload = false) {
    //Done !
    if (payload) {
      commit(MutationTypes.SET_PLAYING);
    } else {
      commit(MutationTypes.PAUSE);
    }
  },
  [ActionTypes.PERCENT_PLAYED_ACTION]({ commit }, payload) {
    commit(MutationTypes.PERCENT_PLAYED, payload);
  },
  [ActionTypes.PLAY_ACTION]({ commit, getters }, track) {
    const ct = getters.currentTrack;
    if (typeof track === "undefined") {
      //eslint-disable-next-line
      console.error(
        "ACTIONS>PLAY_ACTION expected track to be of type SONG but received undefined."
      );
    }
    if (track.id !== ct.id) {
      const newRecentTracks = getters.recentTracks.filter(
        t => t.id !== track.id
      );

      commit(MutationTypes.PLAY_NEW, { newRecentTracks, track });
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
