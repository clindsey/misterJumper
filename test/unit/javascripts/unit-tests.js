window.require.register('test/unit/initialize', function(require, module) {
var runner, test, tests, _i, _len;

tests = ['test/unit/views/test'];

for (_i = 0, _len = tests.length; _i < _len; _i++) {
  test = tests[_i];
  require(test);
}

if (window.mochaPhantomJS) {
  mochaPhantomJS.run();
} else {
  runner = mocha.run();
  runner.on('end', function() {
    return new MochaCov;
  });
}

});

window.require.register('test/unit/models/background', function(require, module) {
var BackgroundModel;

require('models/Background');

BackgroundModel = moduleLibrary.get('Background.Model');

describe('Model Background', function() {
  beforeEach(function() {
    return this.backgroundModel = BackgroundModel.create();
  });
  return afterEach(function() {
    return this.backgroundModel.dispose();
  });
});

});

window.require.register('test/unit/models/hero', function(require, module) {
var HeroModel;

require('models/Hero');

HeroModel = moduleLibrary.get('Hero.Model');

describe('Model Hero', function() {
  beforeEach(function() {
    return this.heroModel = HeroModel.create();
  });
  return afterEach(function() {
    return this.heroModel.dispose();
  });
});

});

window.require.register('test/unit/models/platform', function(require, module) {
var PlatformModel;

require('models/Platform');

PlatformModel = moduleLibrary.get('Platform.Model');

describe('Model Platform', function() {
  beforeEach(function() {
    return this.platformModel = PlatformModel.create();
  });
  return afterEach(function() {
    return this.platformModel.dispose();
  });
});

});

window.require.register('test/unit/models/scoreCounter', function(require, module) {
var ScoreCounterModel;

require('models/ScoreCounter');

ScoreCounterModel = moduleLibrary.get('ScoreCounter.Model');

describe('Model ScoreCounter', function() {
  beforeEach(function() {
    return this.scoreCounterModel = ScoreCounterModel.create();
  });
  return afterEach(function() {
    return this.scoreCounterModel.dispose();
  });
});

});

window.require.register('test/unit/scenes/mainPlay', function(require, module) {
var MainPlayScene;

require('scenes/MainPlay');

MainPlayScene = moduleLibrary.get('MainPlay.Scene');

describe('Scene MainPlay', function() {
  beforeEach(function() {
    return this.mainPlayScene = MainPlayScene.create();
  });
  return afterEach(function() {
    return this.mainPlayScene.dispose();
  });
});

});

window.require.register('test/unit/views/background', function(require, module) {
var BackgroundView;

require('views/Background');

BackgroundView = moduleLibrary.get('Background.View');

describe('View Background', function() {
  beforeEach(function() {
    return this.backgroundView = BackgroundView.create();
  });
  return afterEach(function() {
    return this.backgroundView.dispose();
  });
});

});

window.require.register('test/unit/views/canvasAdapter', function(require, module) {
var CanvasAdapterView;

require('views/CanvasAdapter');

CanvasAdapterView = moduleLibrary.get('CanvasAdapter.View');

describe('View CanvasAdapter', function() {
  beforeEach(function() {
    return this.canvasAdapterView = CanvasAdapterView.create();
  });
  return afterEach(function() {
    return this.canvasAdapterView.dispose();
  });
});

});

window.require.register('test/unit/views/continueMessage', function(require, module) {
var ContinueMessageView;

require('views/ContinueMessage');

ContinueMessageView = moduleLibrary.get('ContinueMessage.View');

describe('View ContinueMessage', function() {
  beforeEach(function() {
    return this.continueMessageView = ContinueMessageView.create();
  });
  return afterEach(function() {
    return this.continueMessageView.dispose();
  });
});

});

window.require.register('test/unit/views/hero', function(require, module) {
var HeroView;

require('views/Hero');

HeroView = moduleLibrary.get('Hero.View');

describe('View Hero', function() {
  beforeEach(function() {
    return this.heroView = HeroView.create();
  });
  return afterEach(function() {
    return this.heroView.dispose();
  });
});

});

window.require.register('test/unit/views/platform', function(require, module) {
var PlatformView;

require('views/Platform');

PlatformView = moduleLibrary.get('Platform.View');

describe('View Platform', function() {
  beforeEach(function() {
    return this.platformView = PlatformView.create();
  });
  return afterEach(function() {
    return this.platformView.dispose();
  });
});

});

window.require.register('test/unit/views/scoreCounter', function(require, module) {
var ScoreCounterView;

require('views/ScoreCounter');

ScoreCounterView = moduleLibrary.get('ScoreCounter.View');

describe('View ScoreCounter', function() {
  beforeEach(function() {
    return this.scoreCounterView = ScoreCounterView.create();
  });
  return afterEach(function() {
    return this.scoreCounterView.dispose();
  });
});

});

window.require.register('test/unit/views/stage', function(require, module) {
var StageView;

require('views/Stage');

StageView = moduleLibrary.get('Stage.View');

describe('View Stage', function() {
  beforeEach(function() {
    return this.stageView = StageView.create();
  });
  return afterEach(function() {
    return this.stageView.dispose();
  });
});

});
