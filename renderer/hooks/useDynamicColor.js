import { FastAverageColor } from 'fast-average-color'
import tinycolor from 'tinycolor2'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { defaultColor, updateColor } from '../reducers/theme'
import { usePlayingAlbum } from './usePlayingAlbum'

const fac = new FastAverageColor()

// calibrate color contrast with white to range 6 ~ 6.5
// the default color's contrast score is 6.1
const calibrate = color => {
  const [min, max] = [6, 6.5]
  const score = tinycolor.readability(color, 'white')

  if (score < min) {
    return calibrate(tinycolor(color).darken(1).toString())
  }

  if (score > max) {
    return calibrate(tinycolor(color).lighten(1).toString())
  }

  return tinycolor(color).toRgb()
}

export const useDynamicColor = () => {
  const dispatch = useDispatch()
  const album = usePlayingAlbum()

  const getColorFromCover = async () => {
    const { hex } = await fac.getColorAsync(album.cover)
    const { r, g, b } = calibrate(hex)
    dispatch(updateColor([r, g, b]))
  }

  useEffect(() => {
    if (album?.cover) {
      getColorFromCover()
    } else {
      dispatch(updateColor(defaultColor))
    }
  }, [album])
}
