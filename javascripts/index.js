window.require.register("index", function(require, module) {(function() {
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
