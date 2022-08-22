import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { signIn, signOut, updateScrobblingToogle } from '../../reducers/lastfm'
import { useLastfmKey, useScrobbler } from '.'
import { toast } from '../../reducers/notification'

export const useLastfm = () => {
  const dispatch = useDispatch()
  const key = useLastfmKey()
  useScrobbler()

  useEffect(() => {
    window.lastfm.connectedStart(key !== null)

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
