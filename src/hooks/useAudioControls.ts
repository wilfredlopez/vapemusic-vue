import { AudioHTMLAttributes, ref, watch, computed, Ref } from "vue";
import { Omit } from "@/models/graphQlTypes";

interface TimeRangeType {
  start: number;
  end: number;
}
const parseTimeRanges = (ranges: TimeRanges) => {
  const result: TimeRangeType[] = [];

  for (let i = 0; i < ranges.length; i++) {
    result.push({
      start: ranges.start(i),
      end: ranges.end(i)
    });
  }

  return result;
};
function turnSecondsToMinutes(s: number) {
  return (
    (s - (s %= 60)) / 60 + (9 < Math.round(s) ? ":" : ":0") + Math.round(s)
  );
}

function turnSecondsToMinutesReverse(s: number, totalDuration: number) {
  return turnSecondsToMinutes(totalDuration - s);
}
export type HTMLMediaProps = Omit<AudioHTMLAttributes, "src">;

export interface HTMLMediaState {
  //eslint-disable-next-line
  buffered: Ref<any[]>;
  duration: Ref<number>;
  paused: Ref<boolean>;
  muted: Ref<boolean>;
  time: Ref<number>;
  percentPlayed: Ref<number>;
  volume: Ref<number>;
}

interface Props extends HTMLMediaProps {
  audioEl: Ref<HTMLAudioElement | null>;
  src: Ref<string>;
}

export default function useAudioControls({ audioEl, ...props }: Props) {
  const pausedState = ref(true);
  const muteState = ref(false);
  const durationState = ref(0);
  const percentPlayedState = ref(0);
  const volumeState = ref(1);
  const timeState = ref(0);
  const bufferState = ref([] as TimeRangeType[]);
  const currentAudioTimeRef = ref("0");
  const currentAudioTimeLeftRef = ref("0");
  // let lockPlay = false;

  function setPausedState(pause: boolean) {
    pausedState.value = pause;
  }

  function setMuteState(mute: boolean) {
    muteState.value = mute;
  }
  function setVolumeState(vol: number) {
    volumeState.value = vol;
  }

  function setDurationState(dur: number) {
    durationState.value = dur;
  }

  function setBufferedState(ranges: TimeRangeType[]) {
    bufferState.value = ranges;
  }

  function setTimeState(time: number) {
    timeState.value = time;
  }

  function setPercentPlayed(percent: number) {
    percentPlayedState.value = percent;
  }

  function getPercentPlayed(secs: number) {
    return secs * (100 / durationState.value);
  }

  const onPlay = () => setPausedState(false);
  const onPause = () => setPausedState(true);

  const onVolumeChange = () => {
    const el = audioEl.value;
    if (!el) {
      return;
    }
    setMuteState(el.muted);
    setVolumeState(el.volume);
  };
  const onDurationChange = () => {
    const el = audioEl.value;
    if (!el) {
      return;
    }
    const { duration, buffered } = el;
    setDurationState(duration);
    setBufferedState(parseTimeRanges(buffered));
  };
  const onTimeUpdate = () => {
    const el = audioEl.value;
    if (!el) {
      return;
    }
    setTimeState(el.currentTime);
    setPercentPlayed(getPercentPlayed(el.currentTime));
  };
  const onProgress = () => {
    const el = audioEl.value;
    if (!el) {
      return;
    }
    setBufferedState(parseTimeRanges(el.buffered));
  };

  //eslint-disable-next-line
  const wrapEvent = <T extends any = any>(
    userEvent?: (event: T) => void,
    proxyEvent?: (event: T) => void
  ) => {
    return (event: T) => {
      try {
        proxyEvent && proxyEvent(event);
      } finally {
        userEvent && userEvent(event);
      }
    };
  };

  const autoPlay = computed(() => {
    return props.autoplay;
  });

  const src = computed(() => {
    return props.src.value;
  });

  const controls = {
    play: () => {
      const eleme = audioEl.value;
      if (!eleme) {
        return;
      }
      eleme.play();
      // if (!lockPlay) {
      //   const promise = eleme.play();
      //   const isPromise = typeof promise === "object";

      //   if (isPromise) {
      //     lockPlay = true;
      //     const resetLock = () => {
      //       lockPlay = false;
      //     };
      //     promise.then(resetLock, resetLock);
      //   }

      //   return promise;
      // }
      // return undefined;
    },
    mute: () => {
      if (audioEl.value) {
        audioEl.value.muted = true;
      }
    },
    pause: () => {
      const el = audioEl.value;
      // if (el && !lockPlay) {
      //   return el.pause();
      // }
      if (el) {
        el.pause();
      }
    },
    seek: (time: number) => {
      function audioSeak(value: number) {
        const el = audioEl.value;
        if (el) {
          const seekto = durationState.value * (value / 100);
          el.currentTime = seekto;
        }
      }

      audioSeak(time);
    },
    unmute: () => {
      if (audioEl.value) {
        audioEl.value.muted = false;
      }
    },
    volume: (volume: number) => {
      const el = audioEl.value;
      if (!el) {
        return;
      }
      volume = Math.min(1, Math.max(0, volume));
      el.volume = volume;
      setVolumeState(volume);
    }
  };

  watch([autoPlay.value, src], () => {
    const el = audioEl.value;
    if (el && !el.paused) {
      controls.play();
    }
  });

  watch(audioEl, value => {
    if (value && value.duration) {
      setDurationState(value.duration);
    }
  });

  watch(timeState, () => {
    const totalPercent = turnSecondsToMinutes(timeState.value);
    currentAudioTimeRef.value = totalPercent;

    const totalLeft = turnSecondsToMinutesReverse(
      timeState.value,
      durationState.value
    );
    currentAudioTimeLeftRef.value = totalLeft;
  });

  const Listeners = {
    onPlay: wrapEvent(props.onPlay, onPlay),
    onPause: wrapEvent(props.onPause, onPause),
    onVolumeChange: wrapEvent(props.onVolumechange, onVolumeChange),
    onDurationChange: wrapEvent(props.onDurationchange, onDurationChange),
    onTimeUpdate: wrapEvent(props.onTimeupdate, onTimeUpdate),
    onProgress: wrapEvent(props.onProgress, onProgress)
  };

  watch(audioEl, (newValue, oldValue) => {
    if (newValue) {
      newValue.addEventListener("loadeddata", () => {
        if (!pausedState.value) {
          newValue.play();
        }
      });
      newValue.addEventListener("play", function(e) {
        return Listeners.onPlay(e);
      });
      newValue.addEventListener("pause", function(e) {
        return Listeners.onPause(e);
      });
      newValue.addEventListener("durationchange", function(e) {
        return Listeners.onDurationChange(e);
      });
      newValue.addEventListener("progress", function(e) {
        return Listeners.onProgress(e);
      });
      newValue.addEventListener("timeupdate", function(e) {
        return Listeners.onTimeUpdate(e);
      });
      newValue.addEventListener("volumechange", function(e) {
        return Listeners.onVolumeChange(e);
      });
      if (oldValue) {
        oldValue.removeEventListener("play", function(e) {
          return Listeners.onPlay(e);
        });
        oldValue.removeEventListener("pause", function(e) {
          return Listeners.onPause(e);
        });
        oldValue.removeEventListener("durationchange", function(e) {
          return Listeners.onDurationChange(e);
        });
        oldValue.removeEventListener("progress", function(e) {
          return Listeners.onProgress(e);
        });
        oldValue.removeEventListener("timeupdate", function(e) {
          return Listeners.onTimeUpdate(e);
        });
        oldValue.removeEventListener("volumechange", function(e) {
          return Listeners.onVolumeChange(e);
        });
      }
    }
  });

  const state: HTMLMediaState = {
    buffered: bufferState,
    time: timeState,
    percentPlayed: percentPlayedState,
    duration: durationState,
    muted: muteState,
    paused: pausedState,
    volume: volumeState
  };

  return {
    controls,
    state,
    audioTime: currentAudioTimeRef,
    audioTimeLeft: currentAudioTimeLeftRef,
    audio: audioEl.value,
    ref: audioEl
  };
}
