import { useSelector } from 'react-redux'

export const selectAlbums = state => state.library.albums
export const useAlbums = () => useSelector(selectAlbums)
