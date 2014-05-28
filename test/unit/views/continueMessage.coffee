require 'views/ContinueMessage'

ContinueMessageView = moduleLibrary.get 'ContinueMessage.View'

describe 'View ContinueMessage', ->
  beforeEach ->
    @continueMessageView = ContinueMessageView.create()

  afterEach ->
    @continueMessageView.dispose()
