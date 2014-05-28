require 'utils'

utils = moduleLibrary.get 'utils'

moduleLibrary.define 'Hero.View', gamecore.Pooled.extend 'HeroView',
    create: (heroModel, platformLayer, scoreCounterModel) ->
      heroView = @_super()

      heroView.model = heroModel
      heroView.platformLayer = platformLayer
      heroView.spriteSheet = new createjs.SpriteSheet @spriteSheetOptions
      heroView.scoreCounterModel = scoreCounterModel

      heroView.el = new createjs.Sprite heroView.spriteSheet, 'run'
      heroView.el.snapToPixel = true
      heroView.el.x = 128
      heroView.el.y = 240

      heroView.verticalVelocity = 0
      heroView.jumping = false
      heroView.airborne = true
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
      if createjs.Ticker.getPaused()
        EventBus.dispatch '!game:restartRequest'
      else
        @startJump()

    onMouseUp: (_target, mouseEvent) ->
      @endJump()

    onKeyDown: (_target, keyboardEvent) ->
      if keyboardEvent.keyCode is 32
        if createjs.Ticker.getPaused()
          EventBus.dispatch '!game:restartRequest'
        else
          @startJump()

    onKeyUp: (_target, keyboardEvent) ->
      if keyboardEvent.keyCode is 32
        @endJump()

    startJump: ->
      if @airborne
        return

      unless @jumping or @airborne
        @verticalVelocity -= 8.5
      @jumping = true
      @airborne = true
      @needsPlatformCollision = true

      @endJump()

    endJump: ->
      @jumping = false

    onTick: ->
      if createjs.Ticker.getPaused()
        if @el.y < 480
          @verticalVelocity += 0.45
          @el.y += @verticalVelocity

        return

      animationIndex = 0
      if @airborne
        if @verticalVelocity >= 0
          animationIndex = 1
        else
          animationIndex = 2
      animation = ['run', 'jump', 'fall'][animationIndex]
      @el.gotoAndPlay animation unless @el.currentAnimation is animation

      @el.y += @verticalVelocity

      platforms = @platformLayer.el.children

      collisionFound = false

      for platform in platforms
        if @el.x + 64 >= platform.x and @el.x <= platform.x + 576 and @el.y >= platform.y - 64
          collisionFound = true
          continue unless @needsPlatformCollision

          diffY = ~~(@el.y - (platform.y - 64))
          diffX = ~~((@el.x + 64) - platform.x)

          if diffY > diffX
            EventBus.dispatch '!hero:fall', this
          else
            @verticalVelocity = 0
            @el.y = platform.y - 64
            @airborne = false
            @needsPlatformCollision = false

      unless collisionFound
        @needsPlatformCollision = true
        @verticalVelocity += 0.45
        @airborne = true

      @scoreCounterModel.score += 1

    dispose: ->
      @el.getStage().removeChild @el

      delete this['spriteSheet']
      delete this['el']
      delete this['platformLayer']
      delete this['model']

      EventBus.removeEventListener '!key:down', @onKeyDown, this
      EventBus.removeEventListener '!key:up', @onKeyUp, this

      EventBus.removeEventListener '!mouse:down', @onMouseDown, this
      EventBus.removeEventListener '!mouse:up', @onMouseUp, this

      createjs.Ticker.removeEventListener 'tick', @onTick

      @release()
