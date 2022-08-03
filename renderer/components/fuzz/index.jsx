import { useEffect, useRef } from 'react'
// const paper = require('paper/dist/paper-full')

const Fuzz = () => {
  const canvasEl = useRef(null)
  const path = useRef(null)
  const context = useRef(null)
  const source = useRef(null)
  const analyser = useRef(null)
  const bufferLength = useRef(null)
  const dataArray = useRef(null)

  useEffect(() => {
    // paper.install(window)
    // paper.setup('oscilloscope')
    canvasEl.current.width = window.innerWidth
    canvasEl.current.height = window.innerHeight
    path.current = new Path()
    path.current.smooth()
    path.current.strokeColor = 'rgba(92, 67, 232, 1)'
    path.current.strokeWidth = 5

    context.current = new window.AudioContext()
    source.current = context.current.createMediaElementSource(
      document.getElementById('xxx')
    )
    analyser.current = context.current.createAnalyser()
    analyser.current.fftSize = 64
    bufferLength.current = analyser.current.frequencyBinCount
    dataArray.current = new Uint8Array(bufferLength.current)
    analyser.current.getByteTimeDomainData(dataArray.current)
    // Get a canvas defined with ID 'oscilloscope'
    source.current.connect(analyser.current)
    analyser.current.connect(context.current.destination)
    draw()
  }, [])

  const draw = () => {
    requestAnimationFrame(draw)
    if (window.throttle) return
    window.throttle = true
    setInterval(() => window.throttle = false, 250)
    path.current.removeSegments()
    analyser.current.getByteTimeDomainData(dataArray.current)
    path.current.add(new Point(0, canvasEl.current.height / 2))

    var sliceWidth = canvasEl.current.width * 1.0 / bufferLength.current
    var x = 0

    for (var i = 0; i < bufferLength.current; i++) {
      var v = dataArray.current[i] / 128.0
      var y = v * canvasEl.current.height / 2

      if (i !== 0) {
        path.current.add(new Point(x, y))
      }

      x += sliceWidth
    }

    window.view.draw()
  }

  return (
    <canvas
      ref={canvasEl}
      height="100%"
      width="100%"
      css={{
        opacity: 0.8,
        width: '100%',
        pointerEvents: 'none',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 4
      }}
    />
  )
}

export default Fuzz
