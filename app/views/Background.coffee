require 'utils'

utils = moduleLibrary.get 'utils'

moduleLibrary.define 'Background.View', gamecore.Pooled.extend 'BackgroundView',
    create: (model) ->
      backgroundView = @_super()

      backgroundView.model = model

      backgroundView.spriteSheet = new createjs.SpriteSheet @spriteSheetOptions

      backgroundView.el = new createjs.Container

      @addBackgroundTiles backgroundView

      _.bindAll backgroundView, 'onTick'
      createjs.Ticker.addEventListener 'tick', backgroundView.onTick

      backgroundView

    spriteSheetOptions:
      images: [utils.tilesetImg]
      frames: [
        [0, 704, 640, 480]
      ]
      animations:
        main:
          frames: [0]

    addBackgroundTiles: (backgroundView) ->
      for tileIndex in [0..backgroundView.model.tileCount]
        backgroundTile = new createjs.Sprite backgroundView.spriteSheet, 'main'
        backgroundTile.x = tileIndex * 640
        backgroundView.el.addChild backgroundTile
  ,
    onTick: ->
      tileCount = @el.children.length

      for backgroundTile in @el.children
        backgroundTile.x -= @model.velocity

        if backgroundTile.x < 0 - 640
          backgroundTile.x += tileCount * 640

    dispose: ->
      @release()
