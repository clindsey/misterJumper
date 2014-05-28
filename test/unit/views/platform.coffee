require 'views/Platform'

PlatformView = moduleLibrary.get 'Platform.View'

describe 'View Platform', ->
  beforeEach ->
    @platformView = PlatformView.create()

  afterEach ->
    @platformView.dispose()
