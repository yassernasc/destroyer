import { useShowcaseAlbum } from './useShowcaseAlbum'
import { useTracks } from './useTracks'

export const useShowcaseTracks = () => {
  const album = useShowcaseAlbum()
  const tracks = useTracks()

  if (!album) {
    return []
  }

  return album.tracks.map(trackId => tracks[trackId])
}
