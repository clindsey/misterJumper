window.require.register("scenes/MainPlay", function(require, module) {var config;

require('config');

require('views/Hero');

require('models/Hero');

require('views/Platform');

require('models/Platform');

require('views/Background');

require('models/Background');

require('views/ScoreCounter');

require('models/ScoreCounter');

require('views/ContinueMessage');

config = moduleLibrary.get('config');

moduleLibrary.define('MainPlay.Scene', gamecore.Pooled.extend('MainPlayScene', {
  create: function(seed, sessionRandom) {
    var mainPlayScene;
    mainPlayScene = this._super();
    mainPlayScene.el = new createjs.Container;
    mainPlayScene.startScene();
    EventBus.addEventListener('!hero:fall', mainPlayScene.onHeroFall, mainPlayScene);
    EventBus.addEventListener('!game:restartRequest', mainPlayScene.onRestartRequest, mainPlayScene);
    return mainPlayScene;
  }
}, {
  onHeroFall: function() {
    createjs.Ticker.setPaused(true);
    this.continueMessageView = (moduleLibrary.get('ContinueMessage.View')).create(320, 240, 'Press to restart');
    return this.el.addChild(this.continueMessageView.el);
  },
  onRestartRequest: function() {
    this.cleanupScene();
    return this.startScene();
  },
  startScene: function() {
    var backgroundModel, backgroundView, heroModel, heroView, platformModel, platformView, scoreCounterModel, scoreCounterView;
    backgroundModel = (moduleLibrary.get('Background.Model')).create(2, 1);
    backgroundView = (moduleLibrary.get('Background.View')).create(backgroundModel);
    this.el.addChild(backgroundView.el);
    this.backgroundLayer = backgroundView;
    platformModel = (moduleLibrary.get('Platform.Model')).create(3, 10);
    platformView = (moduleLibrary.get('Platform.View')).create(platformModel);
    this.el.addChild(platformView.el);
    this.platformLayer = platformView;
    scoreCounterModel = (moduleLibrary.get('ScoreCounter.Model')).create();
    scoreCounterView = (moduleLibrary.get('ScoreCounter.View')).create(scoreCounterModel, 600, 20);
    this.el.addChild(scoreCounterView.el);
    this.scoreCounterView = scoreCounterView;
    heroModel = (moduleLibrary.get('Hero.Model')).create();
    heroView = (moduleLibrary.get('Hero.View')).create(heroModel, this.platformLayer, scoreCounterModel);
    this.el.addChild(heroView.el);
    this.heroView = heroView;
    return createjs.Ticker.setPaused(false);
  },
  cleanupScene: function() {
    this.continueMessageView.dispose();
    this.backgroundLayer.model.dispose();
    this.backgroundLayer.dispose();
    this.platformLayer.model.dispose();
    this.platformLayer.dispose();
    this.heroView.model.dispose();
    this.heroView.dispose();
    this.scoreCounterView.model.dispose();
    return this.scoreCounterView.dispose();
  },
  dispose: function() {
    this.cleanupScene();
    delete this['el'];
    delete this['backgroundLayer'];
    delete this['platformLayer'];
    delete this['heroView'];
    delete this['continueMessageView'];
    delete this['scoreCounterView'];
    EventBus.removeEventListener('!hero:fall', this.onHeroFall, this);
    EventBus.removeEventListener('!game:restartRequest', this.onRestartRequest, this);
    return this.release();
  }
}));
});
