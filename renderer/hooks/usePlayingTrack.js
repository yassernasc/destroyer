import { usePlayingTrackId } from './usePlayingTrackId'
import { useTracks } from './useTracks'

export const usePlayingTrack = () => {
  const playingTrackId = usePlayingTrackId()
  const tracks = useTracks()

  return tracks[playingTrackId]
}
