import { useEffect, useRef } from 'react'

import { useIsLastfmConnected, useLastfmKey } from '.'
import {
  usePlayerStatus,
  usePlayerTime,
  usePlayingAlbum,
  usePlayingTrack,
} from '..'
import { floor } from '../../utils/seconds'
import { playerStatus } from '../../reducers/player'

const getTimestampInSeconds = () => floor(Date.now() / 1000)
const firstTimestamp = getTimestampInSeconds()

export const useScrobbler = () => {
  const timestamp = useRef(firstTimestamp)

  const track = usePlayingTrack()
  const status = usePlayerStatus()
  const album = usePlayingAlbum()
  const time = usePlayerTime()

  const lastfmConnected = useIsLastfmConnected()
  const key = useLastfmKey()

  const updateTimestamp = () => (timestamp.current = getTimestampInSeconds())

  useEffect(() => {
    if (lastfmConnected && status === playerStatus.playing) {
      const trackStartedNow = time === 1
      if (trackStartedNow) {
        window.lastfm.nowPlaying({
          album: album.title,
          artist: album.artist,
          duration: floor(track.duration),
          key,
          track: track.title,
          trackNumber: track.trackNumber,
        })

        updateTimestamp()
      }

      const trackIsEndind = time === floor(track.duration) - 1
      if (trackIsEndind) {
        window.lastfm.scrobble({
          album: album.title,
          artist: album.artist,
          duration: floor(track.duration),
          key,
          timestamp: timestamp.current,
          track: track.title,
          trackNumber: track.trackNumber,
        })
      }
    }
  }, [lastfmConnected, status, track, album, time])
}
