'use client'

import { TPost } from '@/data/posts'
import { createContext, useContext, useMemo, useReducer, useRef, useState } from 'react'

interface PlayerState {
  playing: boolean
  muted: boolean
  duration: number
  currentTime: number
  episode: TPost | null
}

interface PublicPlayerActions {
  play: (episode?: TPost) => void
  pause: () => void
  toggle: (episode?: TPost) => void
  seekBy: (amount: number) => void
  seek: (time: number) => void
  playbackRate: (rate: number) => void
  toggleMute: () => void
  isPlaying: (episode?: TPost) => boolean
  hide: () => void
}

export type PlayerAPI = PlayerState & PublicPlayerActions

const enum ActionKind {
  SET_META = 'SET_META',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  TOGGLE_MUTE = 'TOGGLE_MUTE',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_DURATION = 'SET_DURATION',
  HIDE = 'HIDE',
}

type Action =
  | { type: ActionKind.SET_META; payload: TPost }
  | { type: ActionKind.PLAY }
  | { type: ActionKind.PAUSE }
  | { type: ActionKind.TOGGLE_MUTE }
  | { type: ActionKind.SET_CURRENT_TIME; payload: number }
  | { type: ActionKind.SET_DURATION; payload: number }
  | { type: ActionKind.HIDE }
const AudioPlayerContext = createContext<PlayerAPI | null>(null)

function audioReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case ActionKind.SET_META:
      return { ...state, episode: action.payload }
    case ActionKind.PLAY:
      return { ...state, playing: true }
    case ActionKind.PAUSE:
      return { ...state, playing: false }
    case ActionKind.TOGGLE_MUTE:
      return { ...state, muted: !state.muted }
    case ActionKind.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload }
    case ActionKind.SET_DURATION:
      return { ...state, duration: action.payload }
    case ActionKind.HIDE:
      return {
        muted: false,
        playing: false,
        duration: 0,
        currentTime: 0,
        episode: null,
      }
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  let [state, dispatch] = useReducer(audioReducer, {
    playing: false,
    muted: false,
    duration: 0,
    currentTime: 0,
    episode: null,
  })
  let playerRef = useRef<HTMLAudioElement>(null)
  const [audioKey, setAudioKey] = useState(0)
  let actions = useMemo<PublicPlayerActions>(() => {
    return {
      play(episode) {
        if (episode) {
          dispatch({ type: ActionKind.SET_META, payload: episode })

          if (
            // playerRef.current.currentSrc !== episode.audioUrl &&
            playerRef.current &&
            episode.handle !== state.episode?.handle
          ) {
            let playbackRate = playerRef.current.playbackRate
            playerRef.current.src = episode.audioUrl || ''
            playerRef.current.load()
            playerRef.current.pause()
            playerRef.current.playbackRate = playbackRate
            playerRef.current.currentTime = 0
          }
        }

        playerRef.current?.play()
      },
      pause() {
        playerRef.current?.pause()
      },
      toggle(episode) {
        this.isPlaying(episode) ? actions.pause() : actions.play(episode)
      },
      seekBy(amount) {
        if (playerRef.current) {
          playerRef.current.currentTime += amount
        }
      },
      seek(time) {
        if (playerRef.current) {
          playerRef.current.currentTime = time
        }
      },
      playbackRate(rate) {
        if (playerRef.current) {
          playerRef.current.playbackRate = rate
        }
      },
      toggleMute() {
        dispatch({ type: ActionKind.TOGGLE_MUTE })
      },
      isPlaying(episode) {
        return episode
          ? state.playing &&
              playerRef.current?.currentSrc === episode.audioUrl &&
              episode.handle === state.episode?.handle
          : state.playing
      },
      hide() {
        if (playerRef.current) {
          playerRef.current.pause()
          playerRef.current.currentTime = 0
        }

        // Làm mới phần tử audio bằng cách thay đổi key
        setAudioKey(() => Date.now())

        console.log('hide - currentSrc after clearing:', playerRef.current?.currentSrc)

        dispatch({ type: ActionKind.HIDE })
      },
    }
  }, [state.playing, state.episode?.handle])

  let api = useMemo<PlayerAPI>(() => ({ ...state, ...actions }), [state, actions])

  return (
    <>
      <AudioPlayerContext.Provider value={api}>{children}</AudioPlayerContext.Provider>
      <audio
        key={audioKey}
        ref={playerRef}
        onPlay={() => dispatch({ type: ActionKind.PLAY })}
        onPause={() => dispatch({ type: ActionKind.PAUSE })}
        onTimeUpdate={(event) => {
          dispatch({
            type: ActionKind.SET_CURRENT_TIME,
            payload: Math.floor(event.currentTarget.currentTime),
          })
        }}
        onDurationChange={(event) => {
          dispatch({
            type: ActionKind.SET_DURATION,
            payload: Math.floor(event.currentTarget.duration),
          })
        }}
        muted={state.muted}
      />
    </>
  )
}

export function useAudioPlayer(episode?: TPost) {
  let player = useContext(AudioPlayerContext)

  return useMemo<PlayerAPI>(
    () => ({
      ...player!,
      play() {
        player!.play(episode)
      },
      toggle() {
        player!.toggle(episode)
      },
      get playing() {
        return player!.isPlaying(episode)
      },
    }),
    [player, episode]
  )
}
