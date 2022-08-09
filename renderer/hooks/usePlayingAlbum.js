import { useAlbums } from './useAlbums'
import { usePlayingAlbumId } from './usePlayingAlbumId'

export const usePlayingAlbum = () => {
  const albums = useAlbums()
  const albumId = usePlayingAlbumId()

  return albums[albumId]
}
