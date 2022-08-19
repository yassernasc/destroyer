import { useRef } from 'react'

import { useIsLastfmConnected, useLastfmKey } from '.'
import { usePlayerTime, usePlayingAlbum, usePlayingTrack } from '..'
import { formatSecondsTime } from '../../utils/seconds'

const getTimestampInSeconds = () => Math.floor(Date.now() / 1000)
const firstTimestamp = getTimestampInSeconds()

export const useScrobbler = () => {
  const timestamp = useRef(firstTimestamp)
  const track = usePlayingTrack()
  const album = usePlayingAlbum()
  const time = usePlayerTime()
  const lastfmConnected = useIsLastfmConnected()
  const key = useLastfmKey()

  const updateTimestamp = () => (timestamp.current = getTimestampInSeconds())

  if (lastfmConnected && track) {
    const isFirstTick = time === 0
    if (isFirstTick) {
      window.lastfm.nowPlaying({
        album: album.title,
        artist: album.artist,
        duration: Math.floor(track.duration),
        key,
        track: track.title,
        trackNumber: track.trackNumber,
      })

      updateTimestamp()
    }

    const isLastTick = time === formatSecondsTime(track.duration)
    if (isLastTick) {
      window.lastfm.scrobble({
        album: album.title,
        artist: album.artist,
        duration: Math.floor(track.duration),
        key,
        timestamp: timestamp.current,
        track: track.title,
        trackNumber: track.trackNumber,
      })
    }
  }
}
