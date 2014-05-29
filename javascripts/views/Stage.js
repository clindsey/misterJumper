window.require.register("views/Stage", function(require, module) {var config;

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
