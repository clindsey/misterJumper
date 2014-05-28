moduleLibrary.define 'Hero.Model', gamecore.Pooled.extend 'HeroModel',
    create: ->
      heroModel = @_super()

      heroModel
  ,
    dispose: ->
      @release()
