import { useDispatch } from 'react-redux'

import { admin } from '../reducers/admin'
import { useAlbums } from '.'
import { useEffect } from 'react'

export const useShowAdminOnEmptyLibrary = () => {
  const dispatch = useDispatch()
  const albums = useAlbums()

  useEffect(() => {
    const isLibraryEmpty = Object.keys(albums).length === 0
    if (isLibraryEmpty) {
      dispatch(admin())
    }
  }, [albums])
}
