require 'models/Hero'

HeroModel = moduleLibrary.get 'Hero.Model'

describe 'Model Hero', ->
  beforeEach ->
    @heroModel = new HeroModel
