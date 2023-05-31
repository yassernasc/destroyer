import { useSelector } from 'react-redux'

export const selectTracks = state => state.library.tracks
export const useTracks = () => useSelector(selectTracks)
