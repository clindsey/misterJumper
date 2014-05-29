( ->
  require 'views/CanvasAdapter'
  require 'views/Stage'
  require 'config'
  require 'utils'

  utils = moduleLibrary.get 'utils'
  config = moduleLibrary.get 'config'

  app =
    onLoad: ->
      utils.loadImages config.spriteSheetSource, app.onImagesLoad

      if config.canvasAdapterOptions.canvasContainerId
        window.addEventListener 'resize', app.resizeCanvas, false

    resizeCanvas: ->
      canvas = app.canvasAdapterView.canvasEl

      scaleX = window.innerWidth / canvas.width
      scaleY = window.innerHeight / canvas.height
      scaleToFit = Math.min scaleX, scaleY

      sizeX = canvas.width * scaleToFit
      sizeY = canvas.height * scaleToFit
      offsetX = (window.innerWidth - sizeX) / 2
      offsetY = (window.innerHeight - sizeY) / 2

      containerEl = app.canvasAdapterView.containerEl
      rule = "translate(#{offsetX}px, #{offsetY}px) scale(#{scaleToFit})"
      containerEl.style.transform = rule
      containerEl.style.webkitTransform = rule

    onImagesLoad: ->
      app.canvasAdapterView = (moduleLibrary.get 'CanvasAdapter.View').create config.canvasAdapterOptions

      app.stageView = (moduleLibrary.get 'Stage.View').create app.canvasAdapterView.canvasEl, 'scenes/MainPlay', 'MainPlay.Scene'

      if config.canvasAdapterOptions.canvasContainerId
        app.resizeCanvas()

      document.onkeydown = app.onKeyDown
      document.onkeyup = app.onKeyUp

    onKeyDown: (event) ->
      EventBus.dispatch '!key:down', this, event

    onKeyUp: (event) ->
      EventBus.dispatch '!key:up', this, event

    dispose: ->
      document.onkeydown = undefined
      window.removeEventListener 'resize', app.resizeCanvas
      @canvasAdapterView.dispose()
      @stageView.dispose()

  app.onLoad()
)()
