import { createSlice } from '@reduxjs/toolkit'
import tinycolor from 'tinycolor2'

const initialState = {
  colors: {
    base: '#212121',
    main: {
      base: '#5C43E8',
      opaque: 'rgba(92, 67, 232, .8)',
      opaquest: 'rgba(92, 67, 232, 0.666)',
    },
    text: 'white',
  },
  font: 'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
}

const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    updateColor(state, action) {
      const [red, green, blue] = action.payload

      state.colors.main = {
        base: tinycolor({ b: blue, g: green, r: red }).toHexString(),
        opaque: `rgba(${red}, ${green}, ${blue}, .8)`,
        opaquest: `rgba(${red}, ${green}, ${blue}, 0.666)`,
      }
    },
  },
})

export const defaultColor = [92, 67, 232]
export const { updateColor } = themeSlice.actions
export default themeSlice.reducer
