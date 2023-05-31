import { useSelector } from 'react-redux'

import { useAlbums } from './useAlbums'

export const selectShowcaseAlbumId = state => state.showcase.albumId
export const useShowcaseAlbum = () => {
  const albums = useAlbums()
  const albumId = useSelector(selectShowcaseAlbumId)

  if (albumId === null) {
    return null
  }

  return albums[albumId]
}
