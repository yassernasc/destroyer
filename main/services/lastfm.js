const { shell } = require('electron')
const fetch = require('electron-fetch').default
const { createHash } = require('node:crypto')
const EventEmitter = require('node:events')

module.exports = class {
  #API_KEY = 'c0dc7abafda7e0ffdfd75c7846918dd4'
  #SHARED_SECRET = 'f0f66744b7be261fe02de599c2df73c0'
  #_status = null

  constructor() {
    this.events = new EventEmitter()
    this.status = 'initial'

    this.events.on('token-authenticated', this.#getSessionToken)
    // this.events.on('update_status_from_store', status => (this.status = status))
  }

  get status() {
    return this.#_status
  }

  set status(newStatus) {
    this.events.emit('new-status', newStatus)
    this.#_status = newStatus
  }

  setInitialStatus(status) {
    this.events.emit('initial-status', status)
    this.#_status = status
  }

  startConnection = async () => {
    this.status = 'connecting'
    const url = new URL('http://www.last.fm/api/auth')
    url.search = new URLSearchParams({
      api_key: this.#API_KEY,
      cb: 'destroyer://lastfm-auth',
    })
    shell.openExternal(url.toString())
  }

  disconnect = () => (this.status = 'disconnected')

  updateScrobbleToogle = status =>
    this.events.emit('new-scrobble-status', status)

  #getSessionToken = async authToken => {
    const { session } = await this.#request({
      api_key: this.#API_KEY,
      method: 'auth.getSession',
      token: authToken,
    })
    this.#connect(session)
  }

  #connect = session => {
    const { key, name } = session
    this.events.emit('connected', { key, name })
    this.status = 'connected'
  }

  nowPlaying = metadata =>
    this.#request(
      {
        album: metadata.album,
        api_key: this.#API_KEY,
        artist: metadata.artist,
        duration: metadata.duration,
        method: 'track.updateNowPlaying',
        sk: metadata.key,
        track: metadata.track,
        trackNumber: metadata.trackNumber,
      },
      'POST'
    )

  scrobble = metadata =>
    this.#request(
      {
        album: metadata.album,
        api_key: this.#API_KEY,
        artist: metadata.artist,
        duration: metadata.duration,
        method: 'track.scrobble',
        sk: metadata.key,
        timestamp: metadata.timestamp,
        track: metadata.track,
        trackNumber: metadata.trackNumber,
      },
      'POST'
    )

  #request = (params, method = 'GET') => {
    const url = new URL('http://ws.audioscrobbler.com/2.0')
    const signature = this.#createSignature(params)

    url.search = new URLSearchParams({
      ...params,
      api_sig: signature,
      format: 'json',
    })

    return this.#fetch(url, method)
  }

  #createSignature = params => {
    const concatFn = (base, [key, value]) => base + key + value
    const paramsConcatenated = Object.entries(params).reduce(concatFn, '')
    const paramsWithSecret = paramsConcatenated + this.#SHARED_SECRET
    const hash = createHash('md5').update(paramsWithSecret).digest('hex')
    return hash
  }

  #fetch = (url, method = 'GET') =>
    fetch(url.toString(), { method }).then(res => res.json())
}
