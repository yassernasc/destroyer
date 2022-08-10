import keycode from 'keycode'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { clearFilter } from '../reducers/library'
import { useIsFilterActive } from '.'

export const useCloseFilter = () => {
  const isFilterActive = useIsFilterActive()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeydown = event => {
      if (isFilterActive && event.keyCode === keycode('esc')) {
        dispatch(clearFilter())
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isFilterActive])
}
