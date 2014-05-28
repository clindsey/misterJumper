require 'scenes/MainPlay'

MainPlayScene = moduleLibrary.get 'MainPlay.Scene'

describe 'Scene MainPlay', ->
  beforeEach ->
    @mainPlayScene = MainPlayScene.create()

  afterEach ->
    @mainPlayScene.dispose()
