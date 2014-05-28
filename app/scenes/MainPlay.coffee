require 'views/Hero'
require 'models/Hero'
require 'views/Platform'
require 'models/Platform'
require 'views/Background'
require 'models/Background'

moduleLibrary.define 'MainPlay.Scene', gamecore.Pooled.extend 'MainPlayScene',
    create: (seed, sessionRandom) ->
      mainPlayScene = @_super()

      mainPlayScene.el = new createjs.Container

      backgroundModel = (moduleLibrary.get 'Background.Model').create 2, 1
      backgroundView = (moduleLibrary.get 'Background.View').create backgroundModel
      mainPlayScene.el.addChild backgroundView.el
      mainPlayScene.backgroundLayer = backgroundView

      platformModel = (moduleLibrary.get 'Platform.Model').create 3, 10
      platformView = (moduleLibrary.get 'Platform.View').create platformModel
      mainPlayScene.el.addChild platformView.el
      mainPlayScene.platformLayer = platformView

      heroModel = (moduleLibrary.get 'Hero.Model').create()
      heroView = (moduleLibrary.get 'Hero.View').create heroModel, mainPlayScene.platformLayer
      mainPlayScene.el.addChild heroView.el
      mainPlayScene.heroView = heroView

      mainPlayScene
  ,
    dispose: ->
      @release()
