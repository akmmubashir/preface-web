import { type PlayerAPI } from '@/components/AudioProvider'
import { PauseIcon } from '@/components/audio-player/PauseIcon'
import { PlayIcon } from '@/components/audio-player/PlayIcon'

export function PlayButton({ player }: { player: PlayerAPI }) {
  let Icon = player.playing ? PauseIcon : PlayIcon

  return (
    <button
      type="button"
      className="group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 hover:bg-primary-900 focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:outline-none md:h-14 md:w-14"
      onClick={() => player.toggle()}
      aria-label={player.playing ? 'Pause' : 'Play'}
    >
      <div className="absolute -inset-3 md:hidden" />
      <Icon className="h-5 w-5 fill-white group-active:fill-white/80 md:h-7 md:w-7" />
    </button>
  )
}
