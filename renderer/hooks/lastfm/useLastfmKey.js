import { useSelector } from 'react-redux'

export const useLastfmKey = () => useSelector(state => state.lastfm.key)
