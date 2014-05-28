require 'views/ScoreCounter'

ScoreCounterView = moduleLibrary.get 'ScoreCounter.View'

describe 'View ScoreCounter', ->
  beforeEach ->
    @scoreCounterView = ScoreCounterView.create()

  afterEach ->
    @scoreCounterView.dispose()
