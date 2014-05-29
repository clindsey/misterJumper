window.require.register("config", function(require, module) {var config;

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
