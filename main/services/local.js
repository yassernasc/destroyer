const Walk = require('@root/walk')
const path = require('path')
const musicMetadata = require('music-metadata')
const { nanoid } = require('@reduxjs/toolkit')

const musicFormats = ['flac', 'm4a', 'mp3', 'mp4', 'aac']
const imageFormats = ['jpg', 'png']
const matchFormat = (formats, fileName) =>
  formats.some(format => fileName.endsWith(`.${format}`))
const isMusic = fileName => matchFormat(musicFormats, fileName)
const isImage = fileName => matchFormat(imageFormats, fileName)

class LocalDisk {
  #window = null
  #library = []
  #tempImages = []

  constructor(window) {
    this.#window = window
  }

  async search(fileList) {
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
          this.#addTrack(getTrackInfo(metadata))
        }

        if (isImage(dirent.name)) {
          this.#tempImages.push(pathname)
        }
      }
    }

    const findCover = album => {
      const albumFolder = path.dirname(album.tracks[0].path)
      return this.#tempImages.find(cover => path.dirname(cover) === albumFolder)
    }

    for (const path of fileList) {
      await Walk.walk(path, walkFunc)
    }

    this.#library.forEach(album => (album.cover = findCover(album)))
    return this.#library
  }

  #addTrack(trackInfo) {
    const getTrack = trackInfo => ({
      duration: trackInfo.duration,
      path: trackInfo.path,
      title: trackInfo.title,
      trackNumber: trackInfo.trackNumber,
    })

    const track = getTrack(trackInfo)
    const createAlbum = () => {
      this.#window.webContents.send(
        'new-album-found',
        `SCANNING: ${trackInfo.artist} - ${trackInfo.album}`
      )
      return {
        id: nanoid(),
        title: trackInfo.album,
        artist: trackInfo.artist,
        tracks: [track],
        cover: null,
      }
    }

    const targetAlbum = this.#library.find(
      album =>
        album.title === trackInfo.album && album.artist === trackInfo.artist
    )
    targetAlbum
      ? targetAlbum.tracks.push(track)
      : this.#library.push(createAlbum())
  }
}

module.exports = LocalDisk
