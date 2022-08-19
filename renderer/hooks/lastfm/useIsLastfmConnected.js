import { useSelector } from 'react-redux'

import { useLastfmKey } from '.'

const useLastfmScrobble = () => useSelector(state => state.lastfm.scrobble)

export const useIsLastfmConnected = () => {
  const key = useLastfmKey()
  const scrobble = useLastfmScrobble()

  return key !== null && scrobble
}
