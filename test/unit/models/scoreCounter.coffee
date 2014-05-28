require 'models/ScoreCounter'

ScoreCounterModel = moduleLibrary.get 'ScoreCounter.Model'

describe 'Model ScoreCounter', ->
  beforeEach ->
    @scoreCounterModel = ScoreCounterModel.create()

  afterEach ->
    @scoreCounterModel.dispose()
