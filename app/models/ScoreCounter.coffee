moduleLibrary.define 'ScoreCounter.Model', gamecore.Pooled.extend 'ScoreCounterModel',
    create: ->
      scoreCounterModel = @_super()

      scoreCounterModel.score = 0

      scoreCounterModel
  ,
    dispose: ->
      @release()
