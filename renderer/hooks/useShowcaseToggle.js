import keycode from 'keycode'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { toggleShowcase } from '../reducers/showcase'
import { useAdminDisplay, usePlayingAlbumId, useIsFilterActive } from '.'

export const useShowcaseToggle = () => {
  const isAdminOpen = useAdminDisplay()
  const albumId = usePlayingAlbumId()
  const dispatch = useDispatch()
  const isFilterActive = useIsFilterActive()

  useEffect(() => {
    const handleKeydown = event => {
      const escapePressed = event.keyCode === keycode('esc')

      if (escapePressed && !isAdminOpen && !isFilterActive) {
        dispatch(toggleShowcase(albumId))
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isAdminOpen, albumId, isFilterActive])
}
