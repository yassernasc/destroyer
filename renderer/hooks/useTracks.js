import { useSelector } from 'react-redux'

export const useTracks = () => useSelector(state => state.library.tracks)
