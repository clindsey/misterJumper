config =
  seed: +new Date #1400453311040
  sessionRandom: 1401308838616 #+new Date #1400453311040

  fps: 50

  spriteSheetSource: 'images/misterJumper.png'

config.canvasAdapterOptions =
  width: 640
  height: 480
  canvasContainerId: 'game-container'

moduleLibrary.define 'config', config
