import { useSelector } from 'react-redux'

export const useAlbums = () => useSelector(state => state.library.albums)
