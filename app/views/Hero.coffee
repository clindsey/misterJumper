require 'utils'

utils = moduleLibrary.get 'utils'

moduleLibrary.define 'Hero.View', gamecore.Pooled.extend 'HeroView',
    create: (heroModel, platformLayer, stage) ->
      heroView = @_super()

      heroView.model = heroModel
      heroView.platformLayer = platformLayer

      heroView.spriteSheet = new createjs.SpriteSheet @spriteSheetOptions

      heroView.el = new createjs.Sprite heroView.spriteSheet, 'run'
      heroView.el.snapToPixel = true
      heroView.el.x = 128
      heroView.el.y = 240

      heroView.verticalVelocity = 0
      heroView.jumping = false
      heroView.needsPlatformCollision = true

      EventBus.addEventListener '!key:down', heroView.onKeyDown, heroView
      EventBus.addEventListener '!key:up', heroView.onKeyUp, heroView

      EventBus.addEventListener '!mouse:down', heroView.onMouseDown, heroView
      EventBus.addEventListener '!mouse:up', heroView.onMouseUp, heroView

      _.bindAll heroView, 'onTick'
      createjs.Ticker.addEventListener 'tick', heroView.onTick

      heroView

    spriteSheetOptions:
      images: [utils.tilesetImg]
      frames:
        width: 64
        height: 64
      animations:
        run:
          frames: [10,11,12,13,14,15]
          speed: 0.3
        jump:
          frames: [16]
        fall:
          frames: [17]
  ,
    onMouseDown: (_target, mouseEvent) ->
      @startJump()

    onMouseUp: (_target, mouseEvent) ->
      @endJump()

    onKeyDown: (_target, keyboardEvent) ->
      if keyboardEvent.keyCode is 32
        @startJump()

    onKeyUp: (_target, keyboardEvent) ->
      if keyboardEvent.keyCode is 32
        @endJump()

    startJump: ->
      unless @jumping
        @verticalVelocity -= 6.5
      @jumping = true
      @needsPlatformCollision = true

    endJump: ->
      @jumping = false

    onTick: ->
      if @jumping
        @verticalVelocity -= 1

      @el.y += @verticalVelocity

      platforms = @platformLayer.el.children

      for platform in platforms
        if @el.x + 64 >= platform.x and @el.x <= platform.x + 576 and @el.y >= platform.y - 64
          continue unless @needsPlatformCollision

          @verticalVelocity = 0
          @el.y = platform.y - 64
          @needsPlatformCollision = false
        else
          @needsPlatformCollision = true
          @verticalVelocity += 0.15

    dispose: ->
      @release()
