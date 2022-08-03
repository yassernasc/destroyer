import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const selectPlayerStatus = state => state.player.status
const selectPlayerTime = state => state.player.secondsPlayed
const selectPlayerTrack = createSelector(
  state => state.player.albumId,
  state => state.player.trackNumber,
  (albumId, trackNumber) => ({  albumId, trackNumber })
)

export const usePlayerStatus = () => useSelector(selectPlayerStatus)
export const usePlayerTime = () => useSelector(selectPlayerTime)
export const usePlayerTrack = () => useSelector(selectPlayerTrack)