import { useTheme } from '@emotion/react'

export const useCursors = () => {
  const theme = useTheme()

  // remove the # from the hex color string
  const color = theme.colors.main.base.slice(1)
  const size = '65px'

  const close = `data:image/svg+xml;utf8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="${size}" height="${size}" fill="%23${color}" fill-opacity="0.82" viewBox="0 0 122.878 122.88" enable-background="new 0 0 122.878 122.88" xml:space="preserve"><g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"></path></g></svg>`
  const play = `data:image/svg+xml;utf8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="${size}" height="${size}" fill="%23${color}" fill-opacity="0.82" viewBox="0 0 92.2 122.88" style="enable-background:new 0 0 92.2 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><polygon class="st0" points="92.2,60.97 0,122.88 0,0 92.2,60.97"></polygon></g></svg>`

  return { close, play }
}
