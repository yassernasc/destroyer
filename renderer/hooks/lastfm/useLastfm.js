import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { signIn, signOut, updateScrobblingToogle } from '../../reducers/lastfm'
import { toast } from '../../reducers/notification'
import { useScrobbler } from '.'

export const useLastfm = () => {
  const dispatch = useDispatch()
  useScrobbler()

  useEffect(() => {
    window.lastfm.connected((event, { key, name }) => {
      dispatch(signIn(key))
      dispatch(toast(`Last.fm: Connected to ${name} Account`))
    })

    window.lastfm.disconnected(() => {
      dispatch(toast('Last.fm: Disconnected'))
      dispatch(signOut())
    })

    window.lastfm.onScrobblingToogleUpdate((event, status) =>
      dispatch(updateScrobblingToogle({ scrobble: status }))
    )
  }, [])
}
