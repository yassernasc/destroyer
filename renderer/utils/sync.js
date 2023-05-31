export const syncInitialStateWithMain = state => {
  const {
    library: { sortingCriteria },
  } = state

  window.menu.initialSorting(sortingCriteria)
}
