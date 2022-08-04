const { TouchBar } = require('electron')
const { TouchBarLabel, TouchBarSpacer } = TouchBar

const artist = new TouchBarLabel({ textColor: '#5c43e8' })
const track = new TouchBarLabel({ textColor: '#555555' })
const time = new TouchBarLabel({ textColor: '#5c43e8' })

const createTouchBar = () => {
  return new TouchBar([
    artist,
    new TouchBarSpacer({ size: 'small' }),
    track,
    new TouchBarSpacer({ size: 'small' }),
    time,
  ])
}

module.exports = createTouchBar
