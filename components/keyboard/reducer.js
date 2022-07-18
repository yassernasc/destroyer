export const filterReducer = (
  state = { title: '' },
  action
) => {
  switch (action.type) {
    case 'FILTER': {
      state = { title: action.title }
      break
    }
    case 'ESCAPE': {
      state = { title: '' }
      break
    }
  }
  return state
}
