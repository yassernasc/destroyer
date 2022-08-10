import keycode from 'keycode'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { playerStatus, toggle } from '../reducers/player'
import { useIsFilterActive, usePlayerStatus } from '.'

export const usePlayerToggle = () => {
  const isFilterActive = useIsFilterActive()
  const status = usePlayerStatus()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeydown = event => {
      if (
        status !== playerStatus.stopped &&
        !isFilterActive &&
        event.keyCode === keycode('space')
      ) {
        event.preventDefault()
        dispatch(toggle())
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [status, isFilterActive])
}
