import { usePlayingTrackId } from './usePlayingTrackId'
import { useTracks } from './useTracks'

export const usePlayingAlbumId = () => {
  const tracks = useTracks()
  const trackId = usePlayingTrackId()

  return tracks[trackId]?.albumId
}
