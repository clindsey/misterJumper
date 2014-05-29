window.require.register("views/Platform", function(require, module) {var utils;

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
