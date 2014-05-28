require 'config'

config = moduleLibrary.get 'config'

moduleLibrary.define 'Stage.View', gamecore.Pooled.extend 'StageView',
    create: (canvasEl, sceneLocation, sceneName) ->
      stageView = @_super()

      stageView.el = new createjs.Stage canvasEl

      stageView.el.enableMouseOver 30

      stageView.loadScene sceneLocation, sceneName, config.seed, config.sessionRandom

      createjs.Ticker.setFPS config.fps
      createjs.Ticker.useRAF = true
      createjs.Touch.enable stageView.el

      _.bindAll stageView, 'onTick'
      createjs.Ticker.addEventListener 'tick', stageView.onTick

      EventBus.addEventListener '!scene:load', stageView.onSceneLoad, stageView

      stageView.el.addEventListener 'stagemousedown', (event) ->
        EventBus.dispatch '!mouse:down', this, event

      stageView.el.addEventListener 'stagemouseup', (event) ->
        EventBus.dispatch '!mouse:up', this, event
  ,
    onSceneLoad: (event, sceneProperties) ->
      @loadScene sceneProperties.sceneLocation, sceneProperties.sceneName, sceneProperties.seed, sceneProperties.seed

    loadScene: (sceneLocation, sceneName, seed, sessionRandom) ->
      if @scene
        @scene.dispose()

        @el.removeChild @scene.el

      require sceneLocation

      @scene = (moduleLibrary.get sceneName).create seed, sessionRandom

      @el.addChild @scene.el

    onTick: (event) ->
      @el.update()

    dispose: ->
      createjs.Ticker.removeEventListener 'tick', @onTick
      EventBus.removeEventListener '!scene:load', @onSceneLoad, this
      createjs.Touch.disable @el

      @scene.dispose()

      @release()
