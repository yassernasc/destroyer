import { useAlbumAtShowcase } from './useAlbumAtShowcase'
import { usePlayingAlbum } from './usePlayingAlbum'

export const useIsShowcasePlaying = () => {
  const showcaseAlbum = useAlbumAtShowcase()
  const playingAlbum = usePlayingAlbum()

  return showcaseAlbum?.id === playingAlbum?.id
}
