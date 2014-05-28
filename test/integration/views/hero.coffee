require 'views/Hero'

HeroView = moduleLibrary.get 'Hero.View'

describe 'View Hero', ->
  beforeEach ->
    @heroView = HeroView.create()

  afterEach ->
    @heroView.dispose()
