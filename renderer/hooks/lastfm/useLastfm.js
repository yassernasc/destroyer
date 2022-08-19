import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { signIn, signOut, updateScrobblingToogle } from '../../reducers/lastfm'
import { useScrobbler } from '.'

export const useLastfm = () => {
  const dispatch = useDispatch()
  useScrobbler()

  useEffect(() => {
    window.lastfm.connected((event, payload) => dispatch(signIn(payload)))
    window.lastfm.disconnected(() => dispatch(signOut()))
    window.lastfm.onScrobblingToogleUpdate((event, status) => dispatch(updateScrobblingToogle({ scrobble: status })))
  }, [])
}
