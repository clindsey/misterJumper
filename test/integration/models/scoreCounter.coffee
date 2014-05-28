require 'models/ScoreCounter'

ScoreCounterModel = moduleLibrary.get 'ScoreCounter.Model'

describe 'Model ScoreCounter', ->
  beforeEach ->
    @scoreCounterModel = new ScoreCounterModel
