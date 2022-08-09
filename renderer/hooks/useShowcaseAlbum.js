import { useSelector } from 'react-redux'

import { useAlbums } from './useAlbums'

export const useShowcaseAlbum = () => {
  const albums = useAlbums()
  const albumId = useSelector(state => state.showcase.albumId)

  if (albumId === null) {
    return null
  }

  return albums[albumId]
}
