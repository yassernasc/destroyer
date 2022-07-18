export const loadingReducer = (
  state = { message: '' },
  action
) => {
  switch (action.type) {
    case 'CONNECTED': {
      state = { ...state, message: '' }
      break
    }
    case 'SCANNING': {
      state = { ...state, message: action.message }
      break
    }
    case 'ESCAPE': {
      state = { ...state, message: '' }
      break
    }
  }
  return state
}
