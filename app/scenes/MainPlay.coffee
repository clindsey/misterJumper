require 'config'

require 'views/Hero'
require 'models/Hero'
require 'views/Platform'
require 'models/Platform'
require 'views/Background'
require 'models/Background'
require 'views/ScoreCounter'
require 'models/ScoreCounter'
require 'views/ContinueMessage'

config = moduleLibrary.get 'config'

moduleLibrary.define 'MainPlay.Scene', gamecore.Pooled.extend 'MainPlayScene',
    create: (seed, sessionRandom) ->
      mainPlayScene = @_super()

      mainPlayScene.el = new createjs.Container

      mainPlayScene.startScene()

      EventBus.addEventListener '!hero:fall', mainPlayScene.onHeroFall, mainPlayScene
      EventBus.addEventListener '!game:restartRequest', mainPlayScene.onRestartRequest, mainPlayScene

      mainPlayScene
  ,
    onHeroFall: ->
      createjs.Ticker.setPaused true

      @continueMessageView = (moduleLibrary.get 'ContinueMessage.View').create 320, 240, 'Press to restart'
      @el.addChild @continueMessageView.el

    onRestartRequest: ->
      @cleanupScene()
      @startScene()

    startScene: ->
      backgroundModel = (moduleLibrary.get 'Background.Model').create 2, 1
      backgroundView = (moduleLibrary.get 'Background.View').create backgroundModel
      @el.addChild backgroundView.el
      @backgroundLayer = backgroundView

      platformModel = (moduleLibrary.get 'Platform.Model').create 3, 10
      platformView = (moduleLibrary.get 'Platform.View').create platformModel
      @el.addChild platformView.el
      @platformLayer = platformView

      scoreCounterModel = (moduleLibrary.get 'ScoreCounter.Model').create()
      scoreCounterView = (moduleLibrary.get 'ScoreCounter.View').create scoreCounterModel, 600, 20
      @el.addChild scoreCounterView.el
      @scoreCounterView = scoreCounterView

      heroModel = (moduleLibrary.get 'Hero.Model').create()
      heroView = (moduleLibrary.get 'Hero.View').create heroModel, @platformLayer, scoreCounterModel
      @el.addChild heroView.el
      @heroView = heroView

      createjs.Ticker.setPaused false

    cleanupScene: ->
      @continueMessageView.dispose()

      @backgroundLayer.model.dispose()
      @backgroundLayer.dispose()

      @platformLayer.model.dispose()
      @platformLayer.dispose()

      @heroView.model.dispose()
      @heroView.dispose()

      @scoreCounterView.model.dispose()
      @scoreCounterView.dispose()

    dispose: ->
      @cleanupScene()

      delete this['el']
      delete this['backgroundLayer']
      delete this['platformLayer']
      delete this['heroView']
      delete this['continueMessageView']
      delete this['scoreCounterView']

      EventBus.removeEventListener '!hero:fall', @onHeroFall, this
      EventBus.removeEventListener '!game:restartRequest', @onRestartRequest, this

      @release()
