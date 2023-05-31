import { isAfter, isBefore, parseISO } from 'date-fns'

export const CriteriaEnum = {
  alphabetically: 'alphabetically',
  newestFirst: 'newest-first',
  oldestFirst: 'oldest-first',
}

const artistAlphabetically = (a, b) => {
  if (a.artist < b.artist) {
    return -1
  }
  if (a.artist > b.artist) {
    return 1
  }
  return 0
}

const albumAlphabetically = (a, b) => {
  if (a.title < b.title) {
    return -1
  }
  if (a.title > b.title) {
    return 1
  }
  return 0
}

const albumNewestFirst = (a, b) => {
  const aDate = parseISO(a.releaseDate)
  const bDate = parseISO(b.releaseDate)

  if (isAfter(aDate, bDate)) {
    return -1
  }
  if (isBefore(aDate, bDate)) {
    return 1
  }
  return 0
}

const albumOldestFirst = (a, b) => {
  const aDate = parseISO(a.releaseDate)
  const bDate = parseISO(b.releaseDate)

  if (isBefore(aDate, bDate)) {
    return -1
  }
  if (isAfter(aDate, bDate)) {
    return 1
  }
  return 0
}

export const sortAlbums = (list, albumCriterion) => {
  const getAlbumCriterionFn = () => {
    if (albumCriterion === CriteriaEnum.alphabetically) {
      return albumAlphabetically
    } else if (albumCriterion === CriteriaEnum.newestFirst) {
      return albumNewestFirst
    } else {
      return albumOldestFirst
    }
  }
  const albumCriterionFn = getAlbumCriterionFn()

  return list.sort((a, b) => {
    const artistResult = artistAlphabetically(a, b)
    if (artistResult !== 0) {
      return artistResult
    }

    return albumCriterionFn(a, b)
  })
}

export const sortTracks = list => {
  return list.sort((a, b) => {
    if (a.disk < b.disk) {
      return -1
    }
    if (a.disk > b.disk) {
      return 1
    }
    if (a.trackNumber < b.trackNumber) {
      return -1
    }
    if (a.trackNumber > b.trackNumber) {
      return 1
    }

    return 0
  })
}
