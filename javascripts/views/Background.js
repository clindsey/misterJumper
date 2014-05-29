window.require.register("views/Background", function(require, module) {var utils;

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
