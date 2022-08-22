import keycode from 'keycode'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { close } from '../reducers/admin'
import { useAdminDisplay } from '.'

export const useCloseAdmin = () => {
  const display = useAdminDisplay()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeydown = event => {
      if (display && event.keyCode === keycode('esc')) {
        dispatch(close())
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [display])
}
