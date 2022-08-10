import { usePlayingAlbum, usePlayingTrack, useRemainingTime } from '.'

export const useTouchBar = () => {
  const album = usePlayingAlbum()
  const track = usePlayingTrack()
  const remainingTime = useRemainingTime()

  if (track) {
    window.touchBar.updateMetadata({
      artist: album.artist,
      time: remainingTime,
      track: track.title,
    })
  } else {
    window.touchBar.updateMetadata({ artist: '', time: '', track: '' })
  }
}
