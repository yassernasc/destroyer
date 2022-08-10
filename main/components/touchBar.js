const { TouchBar } = require('electron')
const { TouchBarLabel, TouchBarSpacer } = TouchBar

const artist = new TouchBarLabel({ textColor: '#5c43e8' })
const track = new TouchBarLabel({ textColor: '#555555' })
const time = new TouchBarLabel({ textColor: '#5c43e8' })

const createTouchBar = () => {
  return new TouchBar({
    items: [
      artist,
      new TouchBarSpacer({ size: 'small' }),
      track,
      new TouchBarSpacer({ size: 'small' }),
      time,
    ],
  })
}

const updateMetadata = metadata => {
  if (metadata.artist !== artist.label) {
    artist.label = metadata.artist
  }
  if (metadata.track !== track.label) {
    track.label = metadata.track
  }
  if (metadata.time !== time.label) {
    time.label = metadata.time
  }
}

module.exports = { createTouchBar, updateMetadata }
