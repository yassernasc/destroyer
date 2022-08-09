import { usePlayingAlbum } from './usePlayingAlbum'
import { useShowcaseAlbum } from './useShowcaseAlbum'

export const useIsShowcasePlaying = () => {
  const showcaseAlbum = useShowcaseAlbum()
  const playingAlbum = usePlayingAlbum()

  return showcaseAlbum?.id === playingAlbum?.id
}
