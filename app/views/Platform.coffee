require 'utils'

utils = moduleLibrary.get 'utils'

moduleLibrary.define 'Platform.View', gamecore.Pooled.extend 'PlatformView',
    create: (platformModel) ->
      platformView = @_super()

      platformView.model = platformModel

      platformView.spriteSheet = new createjs.SpriteSheet @spriteSheetOptions

      platformView.el = new createjs.Container

      @addPlatformTiles platformView

      _.bindAll platformView, 'onTick'
      createjs.Ticker.addEventListener 'tick', platformView.onTick

      platformView

    spriteSheetOptions:
      images: [utils.tilesetImg]
      frames: [
        [0, 320, 576, 258]
      ]
      animations:
        tall:
          frames: [0]

    addPlatformTiles: (platformView) ->
      lastPlatform = undefined
      for tileIndex in [0..platformView.model.platformCount]
        if lastPlatform
          {x, y} = platformView.placePlatform lastPlatform
        else
          x = 0
          y = 410

        platformTile = new createjs.Sprite platformView.spriteSheet, 'tall'
        platformTile.snapToPixel = true
        platformTile.x = ~~ x
        platformTile.y = ~~ y
        platformView.el.addChild platformTile

        lastPlatform = platformTile

      platformView.lastPlatform = lastPlatform
  ,
    onTick: ->
      tileCount = @el.children.length

      for platformTile in @el.children
        platformTile.x -= @model.velocity

        if platformTile.x < 0 - 640
          {x, y} = @placePlatform @lastPlatform

          platformTile.x = ~~ x
          platformTile.y = ~~ y

          @lastPlatform = platformTile

    placePlatform: (lastPlatform) ->
      x = (lastPlatform.x + 576) + (utils.sessionRandom() * 200 - 100) + 120
      y = 380 + (utils.sessionRandom() * 100 - 50)

      {x, y}

    dispose: ->
      @release()
