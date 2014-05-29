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
