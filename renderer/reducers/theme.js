import { FastAverageColor } from 'fast-average-color'
import { createSlice } from '@reduxjs/toolkit'
import tinycolor from 'tinycolor2'

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

const getCalibratedColorFromCover = async cover => {
  const { hex } = await fac.getColorAsync(cover)
  const { r, g, b } = calibrate(hex)
  return [r, g, b]
}

const defaultColor = [92, 67, 232]
const createAccentTheme = colors => {
  const [r, g, b] = colors

  return {
    base: tinycolor({ b, g, r }).toHexString(), // convert to hex for svg usage
    opaque: `rgb(${r} ${g} ${b} / .8)`,
    opaquest: `rgb(${r} ${g} ${b} / 0.666)`,
  }
}

const initialState = {
  accent: createAccentTheme(defaultColor),
}

const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    resetAccent(state) {
      state.accent = initialState.accent
    },
    updateAccent(state, action) {
      state.accent = createAccentTheme(action.payload)
    },
  },
})

const updateAccentByAlbumCover = cover => async dispatch => {
  cover
    ? dispatch(updateAccent(await getCalibratedColorFromCover(cover)))
    : dispatch(resetAccent)
}

const { resetAccent, updateAccent } = themeSlice.actions
export { updateAccentByAlbumCover, resetAccent }
export default themeSlice.reducer
