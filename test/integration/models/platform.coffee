require 'models/Platform'

PlatformModel = moduleLibrary.get 'Platform.Model'

describe 'Model Platform', ->
  beforeEach ->
    @platformModel = new PlatformModel
