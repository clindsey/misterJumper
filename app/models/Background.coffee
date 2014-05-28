moduleLibrary.define 'Background.Model', gamecore.Pooled.extend 'BackgroundModel',
    create: (tileCount, velocity) ->
      backgroundModel = @_super()

      backgroundModel.tileCount = tileCount
      backgroundModel.velocity = velocity

      backgroundModel
  ,
    dispose: ->
      @release()
