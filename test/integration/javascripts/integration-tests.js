window.require.register('test/integration/initialize', function(require, module) {
var runner, test, tests, _i, _len;

tests = ['test/integration/router'];

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

window.require.register('test/integration/models/background', function(require, module) {
var BackgroundModel;

require('models/Background');

BackgroundModel = moduleLibrary.get('Background.Model');

describe('Model Background', function() {
  return beforeEach(function() {
    return this.backgroundModel = new BackgroundModel;
  });
});

});

window.require.register('test/integration/models/hero', function(require, module) {
var HeroModel;

require('models/Hero');

HeroModel = moduleLibrary.get('Hero.Model');

describe('Model Hero', function() {
  return beforeEach(function() {
    return this.heroModel = new HeroModel;
  });
});

});

window.require.register('test/integration/models/platform', function(require, module) {
var PlatformModel;

require('models/Platform');

PlatformModel = moduleLibrary.get('Platform.Model');

describe('Model Platform', function() {
  return beforeEach(function() {
    return this.platformModel = new PlatformModel;
  });
});

});

window.require.register('test/integration/models/scoreCounter', function(require, module) {
var ScoreCounterModel;

require('models/ScoreCounter');

ScoreCounterModel = moduleLibrary.get('ScoreCounter.Model');

describe('Model ScoreCounter', function() {
  return beforeEach(function() {
    return this.scoreCounterModel = new ScoreCounterModel;
  });
});

});

window.require.register('test/integration/router', function(require, module) {
var Router;

require('Router');

Router = moduleLibrary.get('Router');

describe('Router', function() {
  beforeEach(function() {
    return this.router = new Router;
  });
  return it('works', function() {
    return expect(true).to.equal(true);
  });
});

});

window.require.register('test/integration/scenes/mainPlay', function(require, module) {
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

window.require.register('test/integration/views/background', function(require, module) {
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

window.require.register('test/integration/views/canvasAdapter', function(require, module) {
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

window.require.register('test/integration/views/continueMessage', function(require, module) {
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

window.require.register('test/integration/views/hero', function(require, module) {
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

window.require.register('test/integration/views/platform', function(require, module) {
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

window.require.register('test/integration/views/scoreCounter', function(require, module) {
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

window.require.register('test/integration/views/stage', function(require, module) {
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
