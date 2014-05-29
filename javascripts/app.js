window.require.register('config', function(require, module) {
var config;

config = {
  seed: +(new Date),
  sessionRandom: +(new Date),
  fps: 50,
  spriteSheetSource: 'images/misterJumper.png'
};

config.canvasAdapterOptions = {
  width: 640,
  height: 480,
  canvasContainerId: 'game-container'
};

moduleLibrary.define('config', config);

});

window.require.register('index', function(require, module) {

(function() {
  var app, config, utils;
  require('views/CanvasAdapter');
  require('views/Stage');
  require('config');
  require('utils');
  utils = moduleLibrary.get('utils');
  config = moduleLibrary.get('config');
  app = {
    onLoad: function() {
      utils.loadImages(config.spriteSheetSource, app.onImagesLoad);
      if (config.canvasAdapterOptions.canvasContainerId) {
        return window.addEventListener('resize', app.resizeCanvas, false);
      }
    },
    resizeCanvas: function() {
      var canvas, containerEl, offsetX, offsetY, rule, scaleToFit, scaleX, scaleY, sizeX, sizeY;
      canvas = app.canvasAdapterView.canvasEl;
      scaleX = window.innerWidth / canvas.width;
      scaleY = window.innerHeight / canvas.height;
      scaleToFit = Math.min(scaleX, scaleY);
      sizeX = canvas.width * scaleToFit;
      sizeY = canvas.height * scaleToFit;
      offsetX = (window.innerWidth - sizeX) / 2;
      offsetY = (window.innerHeight - sizeY) / 2;
      containerEl = app.canvasAdapterView.containerEl;
      rule = "translate(" + offsetX + "px, " + offsetY + "px) scale(" + scaleToFit + ")";
      containerEl.style.transform = rule;
      return containerEl.style.webkitTransform = rule;
    },
    onImagesLoad: function() {
      app.canvasAdapterView = (moduleLibrary.get('CanvasAdapter.View')).create(config.canvasAdapterOptions);
      app.stageView = (moduleLibrary.get('Stage.View')).create(app.canvasAdapterView.canvasEl, 'scenes/MainPlay', 'MainPlay.Scene');
      if (config.canvasAdapterOptions.canvasContainerId) {
        app.resizeCanvas();
      }
      document.onkeydown = app.onKeyDown;
      return document.onkeyup = app.onKeyUp;
    },
    onKeyDown: function(event) {
      return EventBus.dispatch('!key:down', this, event);
    },
    onKeyUp: function(event) {
      return EventBus.dispatch('!key:up', this, event);
    },
    dispose: function() {
      document.onkeydown = void 0;
      window.removeEventListener('resize', app.resizeCanvas);
      this.canvasAdapterView.dispose();
      return this.stageView.dispose();
    }
  };
  return app.onLoad();
})();

});

window.require.register('models/Background', function(require, module) {

moduleLibrary.define('Background.Model', gamecore.Pooled.extend('BackgroundModel', {
  create: function(tileCount, velocity) {
    var backgroundModel;
    backgroundModel = this._super();
    backgroundModel.tileCount = tileCount;
    backgroundModel.velocity = velocity;
    return backgroundModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));

});

window.require.register('models/Hero', function(require, module) {

moduleLibrary.define('Hero.Model', gamecore.Pooled.extend('HeroModel', {
  create: function() {
    var heroModel;
    heroModel = this._super();
    return heroModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));

});

window.require.register('models/Platform', function(require, module) {

moduleLibrary.define('Platform.Model', gamecore.Pooled.extend('PlatformModel', {
  create: function(platformCount, velocity) {
    var platformModel;
    platformModel = this._super();
    platformModel.platformCount = platformCount;
    platformModel.velocity = velocity;
    return platformModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));

});

window.require.register('models/ScoreCounter', function(require, module) {

moduleLibrary.define('ScoreCounter.Model', gamecore.Pooled.extend('ScoreCounterModel', {
  create: function() {
    var scoreCounterModel;
    scoreCounterModel = this._super();
    scoreCounterModel.score = 0;
    return scoreCounterModel;
  }
}, {
  dispose: function() {
    return this.release();
  }
}));

});

window.require.register('scenes/MainPlay', function(require, module) {
var config;

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

window.require.register('utils', function(require, module) {
var config;

require('config');

config = moduleLibrary.get('config');

moduleLibrary.define('utils', {
  clamp: function(index, size) {
    return (index + size) % size;
  },
  random: function(seed) {
    return new RNG(seed).uniform();
  },
  sessionRandom: function() {
    var randomVal;
    randomVal = new RNG(config.sessionRandom).uniform();
    config.sessionRandom += 1;
    return randomVal;
  },
  loadImages: function(spriteSheetSource, callback) {
    this.tilesetImg = new Image();
    this.tilesetImg.onload = callback;
    return this.tilesetImg.src = spriteSheetSource;
  }
});

});

window.require.register('views/Background', function(require, module) {
var utils;

require('utils');

utils = moduleLibrary.get('utils');

moduleLibrary.define('Background.View', gamecore.Pooled.extend('BackgroundView', {
  create: function(model) {
    var backgroundView;
    backgroundView = this._super();
    backgroundView.model = model;
    backgroundView.spriteSheet = new createjs.SpriteSheet(this.spriteSheetOptions);
    backgroundView.el = new createjs.Container;
    this.addBackgroundTiles(backgroundView);
    _.bindAll(backgroundView, 'onTick');
    createjs.Ticker.addEventListener('tick', backgroundView.onTick);
    return backgroundView;
  },
  spriteSheetOptions: {
    images: [utils.tilesetImg],
    frames: [[0, 704, 640, 480]],
    animations: {
      main: {
        frames: [0]
      }
    }
  },
  addBackgroundTiles: function(backgroundView) {
    var backgroundTile, tileIndex, _i, _ref, _results;
    _results = [];
    for (tileIndex = _i = 0, _ref = backgroundView.model.tileCount; 0 <= _ref ? _i <= _ref : _i >= _ref; tileIndex = 0 <= _ref ? ++_i : --_i) {
      backgroundTile = new createjs.Sprite(backgroundView.spriteSheet, 'main');
      backgroundTile.x = tileIndex * 640;
      _results.push(backgroundView.el.addChild(backgroundTile));
    }
    return _results;
  }
}, {
  onTick: function() {
    var backgroundTile, tileCount, _i, _len, _ref, _results;
    if (createjs.Ticker.getPaused()) {
      return;
    }
    tileCount = this.el.children.length;
    _ref = this.el.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      backgroundTile = _ref[_i];
      backgroundTile.x -= this.model.velocity;
      if (backgroundTile.x < 0 - 640) {
        _results.push(backgroundTile.x += tileCount * 640);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  dispose: function() {
    this.el.getStage().removeChild(this.el);
    delete this['model'];
    delete this['spriteSheet'];
    delete this['el'];
    createjs.Ticker.removeEventListener('tick', this.onTick);
    return this.release();
  }
}));

});

window.require.register('views/CanvasAdapter', function(require, module) {

moduleLibrary.define('CanvasAdapter.View', gamecore.Pooled.extend('CanvasAdapterView', {
  create: function(rawOptions) {
    var canvasAdapterView, containerEl, options;
    if (rawOptions == null) {
      rawOptions = {};
    }
    options = _.defaults(rawOptions, this.DEFAULT_OPTIONS);
    canvasAdapterView = this._super();
    canvasAdapterView.canvasEl = document.createElement('canvas');
    canvasAdapterView.canvasEl.width = options.width;
    canvasAdapterView.canvasEl.height = options.height;
    containerEl = document.body;
    if (options.canvasContainerId) {
      containerEl = document.getElementById(options.canvasContainerId);
    }
    containerEl.appendChild(canvasAdapterView.canvasEl);
    canvasAdapterView.containerEl = containerEl;
    return canvasAdapterView;
  },
  DEFAULT_OPTIONS: {
    width: 480,
    height: 320
  }
}, {
  dispose: function() {
    this.canvasEl.parentNode.removeChild(this.canvasEl);
    document.body.removeChild(this.canvasEl);
    return this.release();
  }
}));

});

window.require.register('views/ContinueMessage', function(require, module) {

moduleLibrary.define('ContinueMessage.View', gamecore.Pooled.extend('ContinueMessageView', {
  create: function(x, y, messageString) {
    var continueMessageView, height, width;
    continueMessageView = this._super();
    continueMessageView.el = new createjs.Text(messageString, '20px Arial', '#333');
    width = continueMessageView.el.getMeasuredWidth();
    height = continueMessageView.el.getMeasuredHeight();
    continueMessageView.el.x = x - width / 2;
    continueMessageView.el.y = y - height / 2;
    continueMessageView.el.cache(0, 0, width, height);
    return continueMessageView;
  }
}, {
  dispose: function() {
    this.el.uncache();
    this.el.getStage().removeChild(this.el);
    delete this['el'];
    return this.release();
  }
}));

});

window.require.register('views/Hero', function(require, module) {
var utils;

require('utils');

utils = moduleLibrary.get('utils');

moduleLibrary.define('Hero.View', gamecore.Pooled.extend('HeroView', {
  create: function(heroModel, platformLayer, scoreCounterModel) {
    var heroView;
    heroView = this._super();
    heroView.model = heroModel;
    heroView.platformLayer = platformLayer;
    heroView.spriteSheet = new createjs.SpriteSheet(this.spriteSheetOptions);
    heroView.scoreCounterModel = scoreCounterModel;
    heroView.el = new createjs.Sprite(heroView.spriteSheet, 'run');
    heroView.el.snapToPixel = true;
    heroView.el.x = 128;
    heroView.el.y = 240;
    heroView.verticalVelocity = 0;
    heroView.jumping = false;
    heroView.airborne = true;
    heroView.needsPlatformCollision = true;
    EventBus.addEventListener('!key:down', heroView.onKeyDown, heroView);
    EventBus.addEventListener('!key:up', heroView.onKeyUp, heroView);
    EventBus.addEventListener('!mouse:down', heroView.onMouseDown, heroView);
    EventBus.addEventListener('!mouse:up', heroView.onMouseUp, heroView);
    _.bindAll(heroView, 'onTick');
    createjs.Ticker.addEventListener('tick', heroView.onTick);
    return heroView;
  },
  spriteSheetOptions: {
    images: [utils.tilesetImg],
    frames: {
      width: 64,
      height: 64
    },
    animations: {
      run: {
        frames: [10, 11, 12, 13, 14, 15],
        speed: 0.3
      },
      jump: {
        frames: [16]
      },
      fall: {
        frames: [17]
      }
    }
  }
}, {
  onMouseDown: function(_target, mouseEvent) {
    if (createjs.Ticker.getPaused()) {
      return EventBus.dispatch('!game:restartRequest');
    } else {
      return this.startJump();
    }
  },
  onMouseUp: function(_target, mouseEvent) {
    return this.endJump();
  },
  onKeyDown: function(_target, keyboardEvent) {
    if (keyboardEvent.keyCode === 32) {
      if (createjs.Ticker.getPaused()) {
        return EventBus.dispatch('!game:restartRequest');
      } else {
        return this.startJump();
      }
    }
  },
  onKeyUp: function(_target, keyboardEvent) {
    if (keyboardEvent.keyCode === 32) {
      return this.endJump();
    }
  },
  startJump: function() {
    if (this.airborne) {
      return;
    }
    if (!(this.jumping || this.airborne)) {
      this.verticalVelocity -= 8.5;
    }
    this.jumping = true;
    this.airborne = true;
    this.needsPlatformCollision = true;
    return this.endJump();
  },
  endJump: function() {
    return this.jumping = false;
  },
  onTick: function() {
    var animation, animationIndex, collisionFound, diffX, diffY, platform, platforms, _i, _len;
    if (createjs.Ticker.getPaused()) {
      if (this.el.y < 480) {
        this.verticalVelocity += 0.45;
        this.el.y += this.verticalVelocity;
      }
      return;
    }
    animationIndex = 0;
    if (this.airborne) {
      if (this.verticalVelocity >= 0) {
        animationIndex = 1;
      } else {
        animationIndex = 2;
      }
    }
    animation = ['run', 'jump', 'fall'][animationIndex];
    if (this.el.currentAnimation !== animation) {
      this.el.gotoAndPlay(animation);
    }
    this.el.y += this.verticalVelocity;
    platforms = this.platformLayer.el.children;
    collisionFound = false;
    for (_i = 0, _len = platforms.length; _i < _len; _i++) {
      platform = platforms[_i];
      if (this.el.x + 64 >= platform.x && this.el.x <= platform.x + 576 && this.el.y >= platform.y - 64) {
        collisionFound = true;
        if (!this.needsPlatformCollision) {
          continue;
        }
        diffY = ~~(this.el.y - (platform.y - 64));
        diffX = ~~((this.el.x + 64) - platform.x);
        if (diffY > diffX) {
          EventBus.dispatch('!hero:fall', this);
        } else {
          this.verticalVelocity = 0;
          this.el.y = platform.y - 64;
          this.airborne = false;
          this.needsPlatformCollision = false;
        }
      }
    }
    if (!collisionFound) {
      this.needsPlatformCollision = true;
      this.verticalVelocity += 0.45;
      this.airborne = true;
    }
    return this.scoreCounterModel.score += 1;
  },
  dispose: function() {
    this.el.getStage().removeChild(this.el);
    delete this['spriteSheet'];
    delete this['el'];
    delete this['platformLayer'];
    delete this['model'];
    EventBus.removeEventListener('!key:down', this.onKeyDown, this);
    EventBus.removeEventListener('!key:up', this.onKeyUp, this);
    EventBus.removeEventListener('!mouse:down', this.onMouseDown, this);
    EventBus.removeEventListener('!mouse:up', this.onMouseUp, this);
    createjs.Ticker.removeEventListener('tick', this.onTick);
    return this.release();
  }
}));

});

window.require.register('views/Platform', function(require, module) {
var utils;

require('utils');

utils = moduleLibrary.get('utils');

moduleLibrary.define('Platform.View', gamecore.Pooled.extend('PlatformView', {
  create: function(platformModel) {
    var platformView;
    platformView = this._super();
    platformView.model = platformModel;
    platformView.lastPlatform = void 0;
    platformView.spriteSheet = new createjs.SpriteSheet(this.spriteSheetOptions);
    platformView.el = new createjs.Container;
    this.addPlatformTiles(platformView);
    _.bindAll(platformView, 'onTick');
    createjs.Ticker.addEventListener('tick', platformView.onTick);
    return platformView;
  },
  spriteSheetOptions: {
    images: [utils.tilesetImg],
    frames: [[0, 320, 576, 258]],
    animations: {
      tall: {
        frames: [0]
      }
    }
  },
  addPlatformTiles: function(platformView) {
    var lastPlatform, platformTile, tileIndex, x, y, _i, _ref, _ref1;
    lastPlatform = void 0;
    for (tileIndex = _i = 0, _ref = platformView.model.platformCount; 0 <= _ref ? _i <= _ref : _i >= _ref; tileIndex = 0 <= _ref ? ++_i : --_i) {
      if (lastPlatform) {
        _ref1 = platformView.placePlatform(lastPlatform), x = _ref1.x, y = _ref1.y;
      } else {
        x = 0;
        y = 410;
      }
      platformTile = new createjs.Sprite(platformView.spriteSheet, 'tall');
      platformTile.snapToPixel = true;
      platformTile.x = ~~x;
      platformTile.y = ~~y;
      platformView.el.addChild(platformTile);
      lastPlatform = platformTile;
    }
    return platformView.lastPlatform = lastPlatform;
  }
}, {
  onTick: function() {
    var platformTile, tileCount, x, y, _i, _len, _ref, _ref1, _results;
    if (createjs.Ticker.getPaused()) {
      return;
    }
    tileCount = this.el.children.length;
    _ref = this.el.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      platformTile = _ref[_i];
      platformTile.x -= this.model.velocity;
      if (platformTile.x < 0 - 640) {
        _ref1 = this.placePlatform(this.lastPlatform), x = _ref1.x, y = _ref1.y;
        platformTile.x = ~~x;
        platformTile.y = ~~y;
        _results.push(this.lastPlatform = platformTile);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  placePlatform: function(lastPlatform) {
    var x, y;
    x = (lastPlatform.x + 576) + (utils.sessionRandom() * 40 - 20) + 140;
    y = 380 + (utils.sessionRandom() * 60 - 30);
    return {
      x: x,
      y: y
    };
  },
  dispose: function() {
    this.el.getStage().removeChild(this.el);
    delete this['model'];
    delete this['lastPlatform'];
    delete this['spriteSheet'];
    delete this['el'];
    createjs.Ticker.removeEventListener('tick', this.onTick);
    return this.release();
  }
}));

});

window.require.register('views/ScoreCounter', function(require, module) {

moduleLibrary.define('ScoreCounter.View', gamecore.Pooled.extend('ScoreCounterView', {
  create: function(scoreCounterModel, x, y) {
    var height, scoreCounterView, width;
    scoreCounterView = this._super();
    scoreCounterView.model = scoreCounterModel;
    scoreCounterView.el = new createjs.Text(scoreCounterView.model.score, '20px Arial', '#333');
    this.lastScore = ~~(scoreCounterView.model.score / 10);
    width = scoreCounterView.el.getMeasuredWidth();
    height = scoreCounterView.el.getMeasuredHeight();
    scoreCounterView.el.cache(0, 0, width, height);
    scoreCounterView.el.x = x - width / 2;
    scoreCounterView.el.y = y - height / 2;
    _.bindAll(scoreCounterView, 'onTick');
    createjs.Ticker.addEventListener('tick', scoreCounterView.onTick);
    return scoreCounterView;
  }
}, {
  onTick: function() {
    var height, width;
    if (createjs.Ticker.getPaused()) {
      return;
    }
    if (this.lastScore === this.model.score) {
      return;
    }
    this.el.text = ~~(this.model.score / 10);
    this.lastScore = ~~(this.model.score / 10);
    width = this.el.getMeasuredWidth();
    height = this.el.getMeasuredHeight();
    return this.el.cache(0, 0, width, height);
  },
  dispose: function() {
    this.el.uncache();
    this.el.getStage().removeChild(this.el);
    delete this['el'];
    return this.release();
  }
}));

});

window.require.register('views/Stage', function(require, module) {
var config;

require('config');

config = moduleLibrary.get('config');

moduleLibrary.define('Stage.View', gamecore.Pooled.extend('StageView', {
  create: function(canvasEl, sceneLocation, sceneName) {
    var stageView;
    stageView = this._super();
    stageView.el = new createjs.Stage(canvasEl);
    stageView.el.enableMouseOver(30);
    stageView.loadScene(sceneLocation, sceneName, config.seed, config.sessionRandom);
    createjs.Ticker.setFPS(config.fps);
    createjs.Ticker.useRAF = true;
    createjs.Touch.enable(stageView.el);
    _.bindAll(stageView, 'onTick');
    createjs.Ticker.addEventListener('tick', stageView.onTick);
    EventBus.addEventListener('!scene:load', stageView.onSceneLoad, stageView);
    stageView.el.addEventListener('stagemousedown', function(event) {
      return EventBus.dispatch('!mouse:down', this, event);
    });
    return stageView.el.addEventListener('stagemouseup', function(event) {
      return EventBus.dispatch('!mouse:up', this, event);
    });
  }
}, {
  onSceneLoad: function(event, sceneProperties) {
    return this.loadScene(sceneProperties.sceneLocation, sceneProperties.sceneName, sceneProperties.seed, sceneProperties.seed);
  },
  loadScene: function(sceneLocation, sceneName, seed, sessionRandom) {
    if (this.scene) {
      this.scene.dispose();
      this.el.removeChild(this.scene.el);
    }
    require(sceneLocation);
    this.scene = (moduleLibrary.get(sceneName)).create(seed, sessionRandom);
    return this.el.addChild(this.scene.el);
  },
  onTick: function(event) {
    return this.el.update();
  },
  dispose: function() {
    createjs.Ticker.removeEventListener('tick', this.onTick);
    EventBus.removeEventListener('!scene:load', this.onSceneLoad, this);
    createjs.Touch.disable(this.el);
    this.scene.dispose();
    return this.release();
  }
}));

});
