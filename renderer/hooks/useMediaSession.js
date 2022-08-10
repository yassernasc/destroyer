import { useDispatch } from 'react-redux'

import { nextTrack, previousTrack, toggle } from '../reducers/player'
import { usePlayingAlbum, usePlayingTrack } from '.'

export const useMediaSession = onUpdateTime => {
  const album = usePlayingAlbum()
  const track = usePlayingTrack()
  const dispatch = useDispatch()

  if (track) {
    navigator.mediaSession.metadata = new MediaMetadata({
      album: album.title,
      artist: album.artist,
      title: track.title,
    })
  }

  navigator.mediaSession.setActionHandler('play', () => dispatch(toggle()))
  navigator.mediaSession.setActionHandler('pause', () => dispatch(toggle()))
  navigator.mediaSession.setActionHandler('previoustrack', () =>
    dispatch(previousTrack())
  )
  navigator.mediaSession.setActionHandler('nexttrack', () =>
    dispatch(nextTrack())
  )
  navigator.mediaSession.setActionHandler('seekto', event =>
    onUpdateTime(event.seekTime)
  )
}
