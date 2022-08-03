import { store } from '../..'
import { sortTracks, sortAlbums } from '../utilities'
import { walk } from "@root/walk"
import { nanoid as id } from '@reduxjs/toolkit'
import { scanning } from '../loading/reducer.js'
import { connect } from '../library/reducer.js'
const path = require('path')
const musicMetadata = require('music-metadata')

const musicFormats = ['flac', 'm4a', 'mp3', 'mp4', 'aac']
const imageFormats = ['jpg', 'png']
const matchFormat = (formats, fileName) => formats.some(format => fileName.endsWith(`.${format}`))
const isMusic = fileName => matchFormat(musicFormats, fileName)
const isImage = fileName => matchFormat(imageFormats, fileName)

const addTrackToLibrary = (library, trackInfo) => {
  const getTrack = trackInfo => ({
    duration: trackInfo.duration,
    path: trackInfo.path,
    title: trackInfo.title,
    trackNumber: trackInfo.trackNumber,
  })
  
  const track = getTrack(trackInfo)
  const createAlbum = () => {
    store.dispatch(scanning(`SCANNING: ${trackInfo.artist} - ${trackInfo.album}`))
    return { id: id(), title: trackInfo.album, artist: trackInfo.artist, tracks: [track], cover: null }
  }
  const targetAlbum = library.find((album) => album.title === trackInfo.album && album.artist === trackInfo.artist)
  targetAlbum ? targetAlbum.tracks.push(track) : library.push(createAlbum())
}

const findCover = (album, covers) => {
  const albumFolder = path.dirname(album.tracks[0].path)
  return covers.find(cover => path.dirname(cover) === albumFolder)
}

export const searchLocalMusic = async (fileList) => {
  const newLibrary = []
  const tempImages = []

  localStorage.setItem('fileList', JSON.stringify(fileList))

  const walkFunc = async (err, pathname, dirent) => {
    const getTrackInfo = metadata => ({
      album: metadata.common.album,
      artist: metadata.common.artists[0],
      duration: metadata.format.duration,
      path: pathname,
      title: metadata.common.title,
      trackNumber: metadata.common.track.no,
    })

    if (err) throw err

    if (dirent.isDirectory() && dirent.name.startsWith('.')) {
      return false
    }

    if (dirent.isSymbolicLink()) {
      return false
    }

    if (dirent.isFile()) {
      if (isMusic(dirent.name)) {
        const metadata = await musicMetadata.parseFile(pathname)
        const trackInfo = getTrackInfo(metadata)
        addTrackToLibrary(newLibrary, trackInfo)
      }

      if (isImage(dirent.name)) {
        tempImages.push(pathname)
      }
    }
  }  

  for (const path of fileList) {
    await walk(path, walkFunc)
  }

  newLibrary.forEach(album => album.cover = findCover(album, tempImages))
  store.dispatch(connect(newLibrary))
}
