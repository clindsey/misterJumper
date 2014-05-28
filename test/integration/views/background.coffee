require 'views/Background'

BackgroundView = moduleLibrary.get 'Background.View'

describe 'View Background', ->
  beforeEach ->
    @backgroundView = BackgroundView.create()

  afterEach ->
    @backgroundView.dispose()
