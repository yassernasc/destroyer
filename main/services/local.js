const Walk = require('@root/walk')
const path = require('path')
const musicMetadata = require('music-metadata')
const { normalize, schema } = require('normalizr')
const { nanoid } = require('@reduxjs/toolkit')

const id = () => nanoid(12)

const musicFormats = ['.flac', '.m4a', '.mp3', '.mp4', '.aac']
const imageFormats = ['.jpg', '.png', '.webp']
const matchFormat = (formats, fileName) =>
  formats.includes(path.extname(fileName))
const isMusic = fileName => matchFormat(musicFormats, fileName)
const isImage = fileName => matchFormat(imageFormats, fileName)

class LocalDisk {
  #window = null
  #library = []
  #tempImages = []

  constructor(window) {
    this.#window = window
  }

  async scan(paths) {
    const walkFunc = async (err, pathname, dirent) => {
      if (err) {
        throw err
      }

      if (dirent.isDirectory() && dirent.name.startsWith('.')) {
        return false
      }

      if (dirent.isSymbolicLink()) {
        return false
      }

      if (dirent.isFile()) {
        if (isMusic(dirent.name)) {
          try {
            const formatMetadata = metadata => ({
              album: metadata.common.album,
              artist: metadata.common.artists[0],
              disk: metadata.common.disk.no,
              duration: metadata.format.duration,
              path: pathname,
              releaseDate: metadata.common.originaldate,
              title: metadata.common.title,
              trackNumber: metadata.common.track.no,
            })

            const metadata = await musicMetadata.parseFile(pathname)

            this.#addTrack(formatMetadata(metadata))
          } catch (err) {
            return false
          }
        }

        if (isImage(dirent.name)) {
          // ignore resource fork files
          if (dirent.name.startsWith('._')) {
            return false
          }

          this.#tempImages.push(pathname)
        }
      }
    }

    for (const path of paths) {
      await Walk.walk(path, walkFunc)
    }

    return this.#refineLibrary()
  }

  #addTrack(metadata) {
    const createAlbum = () => {
      const { album, artist, releaseDate } = metadata
      this.#window.webContents.send('new-album-found', { album, artist })
      return { artist, cover: null, id: id(), releaseDate, title: album }
    }

    const createTrack = trackInfo => ({
      albumId: trackInfo.albumId,
      disk: trackInfo.disk,
      duration: trackInfo.duration,
      id: id(),
      path: trackInfo.path,
      title: trackInfo.title,
      trackNumber: trackInfo.trackNumber,
    })

    const targetAlbum = this.#library.find(
      album =>
        album.title === metadata.album && album.artist === metadata.artist
    )

    if (targetAlbum) {
      let track = createTrack({ ...metadata, albumId: targetAlbum.id })
      targetAlbum.tracks.push(track)
    } else {
      const album = createAlbum()
      let track = createTrack({ ...metadata, albumId: album.id })
      album.tracks = [track]

      this.#library.push(album)
    }
  }

  #findCovers() {
    const matchCoverByPath = album => {
      const albumFolder = path.dirname(album.tracks[0].path)
      return this.#tempImages.find(cover => path.dirname(cover) === albumFolder)
    }

    this.#library.forEach(album => (album.cover = matchCoverByPath(album)))
  }

  #getNormalizedLibrary() {
    const trackEntity = new schema.Entity('tracks')
    const albumEntity = new schema.Entity('albums', { tracks: [trackEntity] })
    const librarySchema = { albums: [albumEntity] }
    const normalizedLibrary = normalize(
      { albums: this.#library },
      librarySchema
    )
    return normalizedLibrary.entities
  }

  #refineLibrary() {
    this.#findCovers()
    return this.#getNormalizedLibrary()
  }
}

module.exports = LocalDisk
