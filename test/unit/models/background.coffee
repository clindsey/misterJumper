require 'models/Background'

BackgroundModel = moduleLibrary.get 'Background.Model'

describe 'Model Background', ->
  beforeEach ->
    @backgroundModel = BackgroundModel.create()

  afterEach ->
    @backgroundModel.dispose()
