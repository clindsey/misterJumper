moduleLibrary.define 'ScoreCounter.View', gamecore.Pooled.extend 'ScoreCounterView',
    create: (scoreCounterModel, x, y) ->
      scoreCounterView = @_super()

      scoreCounterView.model = scoreCounterModel

      scoreCounterView.el = new createjs.Text scoreCounterView.model.score, '20px Arial', '#333'
      @lastScore = ~~(scoreCounterView.model.score / 10)

      width = scoreCounterView.el.getMeasuredWidth()
      height = scoreCounterView.el.getMeasuredHeight()

      scoreCounterView.el.cache 0, 0, width, height

      scoreCounterView.el.x = x - width / 2
      scoreCounterView.el.y = y - height / 2

      _.bindAll scoreCounterView, 'onTick'
      createjs.Ticker.addEventListener 'tick', scoreCounterView.onTick

      scoreCounterView
  ,
    onTick: ->
      return if createjs.Ticker.getPaused()

      return if @lastScore is @model.score

      @el.text = ~~(@model.score / 10)

      @lastScore = ~~(@model.score / 10)

      width = @el.getMeasuredWidth()
      height = @el.getMeasuredHeight()

      @el.cache 0, 0, width, height

    dispose: ->
      @el.uncache()

      @el.getStage().removeChild @el

      delete this['el']

      @release()
