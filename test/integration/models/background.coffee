require 'models/Background'

BackgroundModel = moduleLibrary.get 'Background.Model'

describe 'Model Background', ->
  beforeEach ->
    @backgroundModel = new BackgroundModel
