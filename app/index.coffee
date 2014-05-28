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

    onImagesLoad: ->
      app.canvasAdapterView = (moduleLibrary.get 'CanvasAdapter.View').create config.canvasAdapterOptions

      app.stageView = (moduleLibrary.get 'Stage.View').create app.canvasAdapterView.canvasEl, 'scenes/MainPlay', 'MainPlay.Scene'

      document.onkeydown = app.onKeyDown
      document.onkeyup = app.onKeyUp

    onKeyDown: (event) ->
      EventBus.dispatch '!key:down', this, event

    onKeyUp: (event) ->
      EventBus.dispatch '!key:up', this, event

    dispose: ->
      document.onkeydown = undefined
      @canvasAdapterView.dispose()
      @stageView.dispose()

  app.onLoad()
)()
