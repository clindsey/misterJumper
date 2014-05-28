moduleLibrary.define 'Platform.Model', gamecore.Pooled.extend 'PlatformModel',
    create: (platformCount, velocity) ->
      platformModel = @_super()

      platformModel.platformCount = platformCount
      platformModel.velocity = velocity

      platformModel
  ,
    dispose: ->
      @release()
